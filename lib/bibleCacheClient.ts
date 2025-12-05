interface CachedChapter {
  data: any;
  timestamp: number;
}

const CACHE_EXPIRATION_DAYS = 30; // 30 days

const getCacheKey = (bibleId: string, chapterId: string) =>
  `bible-${bibleId}-${chapterId}`;

const setCache = (key: string, data: any) => {
  const now = new Date().getTime();
  const item: CachedChapter = {
    data,
    timestamp: now,
  };
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error("Error setting cache in localStorage:", error);
  }
};

const getCache = (key: string): any | null => {
  try {
    const itemString = localStorage.getItem(key);
    if (!itemString) {
      return null;
    }

    const item: CachedChapter = JSON.parse(itemString);
    const now = new Date().getTime();
    const expirationTime = item.timestamp + CACHE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

    if (now > expirationTime) {
      localStorage.removeItem(key);
      return null;
    }

    return item.data;
  } catch (error) {
    console.error("Error parsing or retrieving cache from localStorage:", error);
    localStorage.removeItem(key); // Clear corrupt data
    return null;
  }
};

export async function getBibleChapter({
  bibleId,
  chapterId,
}: {
  bibleId: string;
  chapterId: string;
}): Promise<any> {
  const key = getCacheKey(bibleId, chapterId);
  const cachedData = getCache(key);

  if (cachedData) {
    console.log("Loading from cache:", key);
    return cachedData;
  }

  console.log("Fetching from API:", key);
  try {
    const response = await fetch(
      `https://rest.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}`,
      {
        headers: {
          "api-key": process.env.NEXT_PUBLIC_BIBLE_API_KEY || "",
        },
      },
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API call failed with status: ${response.status}, body: ${errorBody}`);
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.json();
    setCache(key, result);
    return result;
  } catch (error) {
    console.error("Error fetching Bible chapter:", error); throw error;
  }
}
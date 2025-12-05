export interface BibleVersion {
  id: string;
  name: string;
  language: {
    name: string;
  };
}

export interface BibleBook {
  id: string;
  bibleId: string;
  name: string;
  abbreviation: string;
}

export interface BibleChapter {
  id: string;
  bibleId: string;
  bookId: string;
  number: string;
  reference: string;
}

const API_BASE_URL = "https://rest.api.bible/v1";
const API_KEY = process.env.NEXT_PUBLIC_BIBLE_API_KEY || "";

export async function getBibleVersions(): Promise<BibleVersion[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/bibles`, {
      headers: {
        "api-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Bible versions: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching Bible versions:", error);
    throw error;
  }
}

export async function getBibleChapters(bibleId: string, bookId: string): Promise<BibleChapter[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/bibles/${bibleId}/books/${bookId}/chapters`, {
      headers: {
        "api-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Bible chapters: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching Bible chapters for bibleId ${bibleId} and bookId ${bookId}:`, error);
    throw error;
  }
}

export async function getBibleBooks(bibleId: string): Promise<BibleBook[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/bibles/${bibleId}/books`, {
      headers: {
        "api-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Bible books: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching Bible books for bibleId ${bibleId}:`, error);
    throw error;
  }
}
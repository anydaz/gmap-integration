import { IAPIResponse } from "@/interface/shared";

export async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<IAPIResponse<T>> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: IAPIResponse<T> = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch API error:", error);
    throw error;
  }
}

export async function getData<T>(endpoint: string): Promise<T> {
  const url = `${process.env.STRAPI_BE_URL}${endpoint}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const responseData = await res.json();
  return responseData.data;
}

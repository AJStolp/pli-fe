export async function getData<T>(endpoint: string): Promise<T> {
  // Check if the endpoint is an absolute URL
  const isAbsoluteUrl = /^https?:\/\//i.test(endpoint);
  // Use the endpoint directly if it's an absolute URL, otherwise append it to the base URL
  const url = isAbsoluteUrl
    ? endpoint
    : `${process.env.NEXT_PUBLIC_STRAPI_BE_URL}${endpoint}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const responseData = await res.json();
  return responseData.data;
}

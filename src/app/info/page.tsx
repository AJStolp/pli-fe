import { AboutData } from "../interfaces/returned-data/about";
import { getData } from "../api/fetch";
import RenderRichText from "./render-rich-text";

export default async function Info() {
  const endpoint = "/api/about?populate=*";

  try {
    const data: AboutData = await getData(endpoint);

    const heading = data.attributes.title;

    const jsxContent = (
      <main className="max-w-screen-lg mx-auto mt-6 p-4 mb-28 md:mb-24">
        <h1 className="text-2xl">{heading}</h1>
        <RenderRichText data={data} />
        <a
          href={`mailto: ${data.attributes.email}`}
          className="text-primary hover:underline hover:text-accent py-6"
        >
          {data.attributes.email}
        </a>
      </main>
    );

    return jsxContent;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return <div>Error: {errorMessage}</div>;
  }
}

import { getData } from "../api/fetch";
import TabsComponent from "../components/tabs-vertical/tabs";
import { ServicesData } from "../interfaces/returned-data/services";

export default async function Services() {
  const endpoint = `${process.env.NEXT_PUBLIC_STRAPI_BE_UR}/api/service?populate=*`;

  try {
    const data: ServicesData = await getData(endpoint);

    const jsxContent = (
      <main className="max-w-screen-lg m-auto px-4 mb-28">
        <h1 className="text-4xl font-extrabold mt-8 lg:mt-20 mb-8">
          {data.attributes.heading}
        </h1>
        <p>{data.attributes.intro}</p>
        <div className="bg-gradient-to-r from-accent via-primary to-secondary h-2 my-10 rounded"></div>
        <h2 className="text-lg font-bold text-text mb-2">Services</h2>
        <TabsComponent data={data} />
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

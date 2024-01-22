import { getData } from "./api/fetch";
import CardComponent from "./components/card/card";
import HeroSection from "./components/hero/hero";
import { HomeData } from "./interfaces/returned-data/home";
import Image from "next/image";

export default async function Page() {
  const endpoint =
    "/api/home?populate[0]=hero&populate[1]=hero.image&populate[2]=threeColumnP.col1icon&populate[3]=threeColumnP.col2icon&populate[4]=threeColumnP.col3icon";

  try {
    const data: HomeData = await getData(endpoint);

    const icon1 = data.attributes.threeColumnP.col1icon.data.attributes.url;
    const icon2 = data.attributes.threeColumnP.col2icon.data.attributes.url;
    const icon3 = data.attributes.threeColumnP.col3icon.data.attributes.url;

    const jsxContent = (
      <main className="max-w-screen-lg m-auto px-4 ">
        <HeroSection data={data} />
        <div className="bg-gradient-to-r from-accent via-primary to-secondary h-2 my-10"></div>

        <h2 className="text-4xl font-bold dark:text-white py-6">
          {data.attributes.ServicesOverview}
        </h2>

        <p className="mb-3 text-texx dark:text-gray-400">
          {data.attributes.threeColumnP.topP}
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <section className="mb-3 text-text dark:text-gray-400">
            <div className="w-24 sm:w-16 mx-auto my-6">
              <img src={icon1} alt={""} className="mr-4 w-full rounded-full" />
            </div>
            <p>{data.attributes.threeColumnP.col1}</p>
          </section>
          <section className="mb-3 text-text dark:text-gray-400">
            <div className="w-24 sm:w-16 mx-auto my-6">
              <img src={icon2} alt={""} className="mr-4 w-full rounded-full" />
            </div>
            <p>{data.attributes.threeColumnP.col2}</p>
          </section>
          <section className="mb-3 text-text dark:text-gray-400">
            <div className="w-24 sm:w-16 mx-auto my-6">
              <img src={icon3} alt={""} className="mr-4 w-full rounded-full" />
            </div>
            <p>{data.attributes.threeColumnP.col3}</p>
          </section>
        </div>
        <p className="mb-3 text-text dark:text-gray-400">
          {data.attributes.threeColumnP.bottomP}
        </p>
      </main>
    );

    return jsxContent;
  } catch (error) {
    return <div>Error:</div>;
  }
}

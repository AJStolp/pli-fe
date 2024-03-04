import { getData } from "./api/fetch";
import HeroSection from "./components/hero/hero";
import { HomeData } from "./interfaces/returned-data/home";

export default async function Page() {
  const endpoint = `/api/home?populate[0]=hero&populate[1]=hero.image&populate[2]=threeColumnP.col1icon&populate[3]=threeColumnP.col2icon&populate[4]=threeColumnP.col3icon&populate[5]=threeColumnP.col1cta.linktext&populate[6]=threeColumnP.col1cta.linkpath&populate[7]=threeColumnP.col2cta.linktext&populate[8]=threeColumnP.col2cta.linkpath&populate[9]=threeColumnP.col3cta.linktext&populate[10]=threeColumnP.col3cta.linkpath`;

  try {
    const data: HomeData = await getData(endpoint);

    const icon1 = data.attributes.threeColumnP.col1icon.data.attributes.url;
    const icon2 = data.attributes.threeColumnP.col2icon.data.attributes.url;
    const icon3 = data.attributes.threeColumnP.col3icon.data.attributes.url;

    const jsxContent = (
      <main className="max-w-screen-lg m-auto px-4 mb-24">
        <HeroSection data={data} />
        <div className="bg-gradient-to-r from-accent via-primary to-secondary h-2 my-10 rounded"></div>

        <h2 className="text-4xl font-bold py-6">
          {data.attributes.ServicesOverview}
        </h2>

        <p className="mb-3 text-text">{data.attributes.threeColumnP.topP}</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <section className="mb-3 text-text">
            <div className="w-24 sm:w-16 mx-auto my-6">
              <img src={icon1} alt={""} className="mr-4 w-full rounded-full" />
            </div>
            <p>{data.attributes.threeColumnP.col1}</p>
            <a
              href={data.attributes.threeColumnP.col1cta.linkpath}
              className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 rounded-lg focus:ring-2 bg-primary my-4"
            >
              <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
                {data.attributes.threeColumnP.col1cta.linktext}
              </span>
            </a>
          </section>
          <section className="mb-3 text-text">
            <div className="w-24 sm:w-16 mx-auto my-6">
              <img src={icon2} alt={""} className="mr-4 w-full rounded-full" />
            </div>
            <p>{data.attributes.threeColumnP.col2}</p>
            <a
              href={data.attributes.threeColumnP.col2cta.linkpath}
              className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 rounded-lg focus:ring-2 bg-primary my-4"
            >
              <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
                {data.attributes.threeColumnP.col2cta.linktext}
              </span>
            </a>
          </section>
          <section className="mb-3 text-text">
            <div className="w-24 sm:w-16 mx-auto my-6">
              <img src={icon3} alt={""} className="mr-4 w-full rounded-full" />
            </div>
            <p>{data.attributes.threeColumnP.col3}</p>
            <a
              href={data.attributes.threeColumnP.col3cta.linkpath}
              className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 rounded-lg focus:ring-2 bg-primary my-4"
            >
              <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
                {data.attributes.threeColumnP.col3cta.linktext}
              </span>
            </a>
          </section>
        </div>
        <p className="mb-3 text-text pb-12">
          {data.attributes.threeColumnP.bottomP}
          <span className="ml-1 underline decoration-accent cursor-pointer">
            <a href="mailto:polarlightsimaging@gmail.com">
              {" "}
              {data.attributes.threeColumnP.bottomCta}
            </a>
          </span>
        </p>
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

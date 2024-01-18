import { Suspense } from "react";
import HeroSkeleton from "../skeleton/hero-skeleton";
import { HomeData } from "../../interfaces/returned-data/home";
import { getData } from "../../api/fetch";

export default async function HeroSection() {
  const endpoint = "/api/home?populate[0]=hero&populate[1]=hero.image";

  try {
    const data: HomeData = await getData(endpoint);
    return (
      <Suspense fallback={<HeroSkeleton />}>
        <div className="py-10">
          <section className="h-full py-12">
            <img
              className="object-cover w-full h-full"
              src={data.attributes.hero.image.data.attributes.url}
              // src="new-removed.png"
              alt={data.attributes.hero.image.data.attributes.alternativeText}
            />
          </section>
          <div className="">
            <div className="">
              <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none">
                {data.attributes.hero.heading}
              </h2>
              <p>{data.attributes.hero.content}</p>
              <div className="flex items-center pt-6">
                <a
                  href="/"
                  className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide transition duration-200 rounded shadow-md bg-primary hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                >
                  Get started
                </a>
                <a
                  href="/"
                  aria-label=""
                  className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide transition duration-200 rounded shadow-md bg-primary hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none bg-secondary"
                >
                  Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    );
  } catch (error) {
    return <div>Error:</div>;
  }
}

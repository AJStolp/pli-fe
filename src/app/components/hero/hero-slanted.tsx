import { Suspense } from "react";
import HeroSkeleton from "../skeleton/image-skeleton";
import { HomeData } from "../../interfaces/returned-data/home";
import { getData } from "../../api/fetch";

export default async function HeroSlanted() {
  const endpoint = "/api/home?populate[0]=hero&populate[1]=hero.image";

  try {
    const data: HomeData = await getData(endpoint);
    return (
      <Suspense fallback={<HeroSkeleton />}>
        <div className="relative flex flex-col py-16 lg:flex-col lg:pb-0 lg:mt-12">
          <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-6/12 lg:max-w-full lg:absolute xl:px-0">
            <svg
              className="text-background absolute left-0 hidden h-full transform -translate-x-1/2 lg:block"
              viewBox="0 0 100 100"
              fill="currentColor"
              preserveAspectRatio="none slice"
            >
              <path d="M50 0H100L50 100H0L50 0Z" />
            </svg>
            <img
              className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
              src={data.attributes.hero.image.data.attributes.url}
              // src="new-removed.png"
              alt={data.attributes.hero.image.data.attributes.alternativeText}
            />
          </div>
          <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
            <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
              <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight sm:text-4xl sm:leading-none">
                {data.attributes.hero.heading}
              </h2>
              <p>{data.attributes.hero.content}</p>
              <div className="flex items-center">
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
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    );
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return <div>Error: {errorMessage}</div>;
  }
}

import { Suspense } from "react";
import { getData } from "./api/fetch";
import HeroSection from "./components/hero";
import { HomeData } from "./interfaces/returned-data/home";
import HeroSkeleton from "./components/skeleton/hero-skeleton";

export default async function Page() {
  const endpoint = "/api/home?populate[0]=hero&populate[1]=hero.image";

  // Use a single data source and access it directly.
  try {
    const data: HomeData = await getData(endpoint);
    return (
      <main>
        <HeroSection />
      </main>
    );
  } catch (error) {
    return <div>Error:</div>;
  }
}

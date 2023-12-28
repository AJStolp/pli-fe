import HeroSection from "./components/hero/hero";

export default async function Page() {
  try {
    const jsxContent = <main>The countdown to takeoff has begun...</main>;

    return jsxContent;
  } catch (error) {
    return <div>Error:</div>;
  }
}

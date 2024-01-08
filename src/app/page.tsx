import HeroSection from "./components/hero/hero";

export default async function Page() {
  try {
    const jsxContent = (
      <main>
        <HeroSection />
      </main>
    );

    return jsxContent;
  } catch (error) {
    return <div>Error:</div>;
  }
}

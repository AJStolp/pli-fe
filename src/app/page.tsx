import HeroSection from "./components/hero/hero";

export default async function Page() {
  try {
    // Your main JSX code here
    const jsxContent = (
      <main>
        <HeroSection />
      </main>
    );

    return jsxContent; // Return the JSX content
  } catch (error) {
    return <div>Error:</div>;
  }
}

import CardComponent from "./components/card/card";
import HeroSection from "./components/hero/hero";

export default async function Page() {
  const endpoint =
    "api/home?populate[0]=hero&populate[1]=hero.image&populate[2]=threeColumnP";

  try {
    const jsxContent = (
      <main className="max-w-screen-lg m-auto px-4 ">
        <HeroSection />
        <div className="bg-gradient-to-r from-accent via-primary to-secondary h-2 my-10"></div>

        <h2 className="text-4xl font-bold dark:text-white py-6">
          Sneak Peak at our Services
        </h2>

        <div className="mb-3 text-texx dark:text-gray-400">
          Specializing in aerial photography, drone videography, and 3D
          Matterport tours.
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="mb-3 text-text dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z" />
            </svg>
            <span className="material-symbols-outlined">photo_camera</span>
            Elevate your projects with stunning aerial perspectives. Our drone
            photography captures every detail from above, providing unique
            angles and breathtaking views that make your content stand out.
          </div>
          <div className="mb-3 text-text dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 inline-block mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 12a8 8 0 11-16 0 8 8 0 0116 0zm0 0V12h2v-2h-2V8h-2v2h-2v2h2v2h2z"
              />
            </svg>
            Bring your vision to life with our professional drone video
            services. We create cinematic aerial videos that tell a compelling
            story and leave a lasting impression on your audience.
          </div>
          <div className="mb-3 text-text dark:text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 inline-block mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 4-4M14 6l4 4-4 4"
              />
            </svg>
            Step into the future of property viewing with our immersive 3D
            Matterport tours. Showcase real estate listings and spaces like
            never before, giving potential buyers a realistic virtual
            experience.
          </div>
        </div>
        <p className="mb-3 text-text dark:text-gray-400">
          At Polar Lights Imaging, we deliver exceptional service experiences
          with the precision and innovation of drone technology. Contact us
          today to take your projects to new heights!
        </p>
      </main>
    );

    return jsxContent;
  } catch (error) {
    return <div>Error:</div>;
  }
}

import { SocialMedia } from "../../interfaces/returned-data/socialmedia";
import { getData } from "../../api/fetch";
import { Footer, FooterCopyright } from "flowbite-react";

export default async function FooterComponent() {
  const currentYear = new Date().getFullYear();

  const endpoint = "/api/socialmedias?populate=*";

  try {
    const data: SocialMedia = await getData(endpoint);

    console.log(data, "data");

    const jsxContent = (
      <Footer container className="bg-background fixed bottom-0">
        <div className="w-full">
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright
              href="#"
              by="Polar Lights Imaging"
              year={currentYear}
            />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              {/* <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="#" icon={BsGithub} />
            <FooterIcon href="#" icon={BsDribbble} /> */}
            </div>
          </div>
        </div>
      </Footer>
    );

    return jsxContent;
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return <div>Error: {errorMessage}</div>;
  }

  // return (
  //   <Footer container className="bg-background fixed bottom-0">
  //     <div className="w-full">
  //       <div className="w-full sm:flex sm:items-center sm:justify-between">
  //         <FooterCopyright
  //           href="#"
  //           by="Polar Lights Imaging"
  //           year={currentYear}
  //         />
  //         <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
  //           {/* <FooterIcon href="#" icon={BsFacebook} />
  //           <FooterIcon href="#" icon={BsInstagram} />
  //           <FooterIcon href="#" icon={BsTwitter} />
  //           <FooterIcon href="#" icon={BsGithub} />
  //           <FooterIcon href="#" icon={BsDribbble} /> */}
  //         </div>
  //       </div>
  //     </div>
  //   </Footer>
  // );
}

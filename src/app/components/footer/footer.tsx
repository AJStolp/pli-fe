import { SocialMedia } from "../../interfaces/returned-data/socialmedia";
import { getData } from "../../api/fetch";
import { Footer, FooterCopyright, FooterIcon } from "flowbite-react";

export default async function FooterComponent() {
  const currentYear = new Date().getFullYear();

  const endpoint = `https://pli-be-production.up.railway.app/api/socialmedias?populate[iconsandlinks][populate][icon][populate]`;

  try {
    const data: SocialMedia[] = await getData(endpoint);

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
              {data.map((item) =>
                item.attributes.iconsandlinks.map((media) => (
                  <a
                    href={media.url}
                    key={media.id}
                    className="w-9 pointer"
                    target="_blank"
                  >
                    {media.icon.data.map((url) => (
                      <img
                        key={url.id}
                        src={url.attributes.url}
                        alt={""}
                        className="footer-social"
                      />
                    ))}
                  </a>
                ))
              )}
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
}

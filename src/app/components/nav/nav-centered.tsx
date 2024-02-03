import Link from "next/link";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { NavData } from "../../interfaces/returned-data/navigation";
import { getData } from "../../api/fetch";
import { Suspense } from "react";

export default async function NavigationCentered() {
  const endpoint = `${process.env.NEXT_PUBLIC_STRAPI_BE_URL}/api/navigations?populate=*`;

  try {
    const data: NavData[] = await getData(endpoint);

    const imageUrl = data
      .map((url) => url.attributes.logo.data.attributes.url)
      .join("");

    return (
      <Suspense fallback={"...Loading..."}>
        <Navbar fluid rounded className="bg-inherit lg:py-0">
          <NavbarBrand as={Link} href="/">
            <img src={imageUrl} className="mr-3 h-6 sm:h-9" alt="PLI" />
          </NavbarBrand>
          <div className="flex md:order-2">
            <a
              href="mailto:polarlightsimaging@gmail.com"
              className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white border border-transparent focus:ring-cyan-300 rounded-lg focus:ring-2 bg-primary mr-1"
            >
              <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-1">
                Contact Us
              </span>
            </a>
            <NavbarToggle />
          </div>
          <NavbarCollapse className="access-ul-li">
            {data.map((item) =>
              item.attributes.linktext.map((val) => (
                <NavbarLink
                  key={val.id}
                  href={val.linkpath}
                  className="text-lg text-text lg:p-6 xl:px-12 hover:text-primary hover:underline li"
                >
                  {val.linktext}
                </NavbarLink>
              ))
            )}
          </NavbarCollapse>
        </Navbar>
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

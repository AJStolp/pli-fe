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
  const endpoint = "/api/navigations?populate=*";

  try {
    const data: NavData[] = await getData(endpoint);

    const imageUrl = data
      .map((url) => url.attributes.logo.data.attributes.url)
      .join("");

    return (
      <Suspense fallback={"...Loading..."}>
        <Navbar fluid rounded className="bg-inherit">
          <NavbarBrand as={Link} href="/">
            <img src={imageUrl} className="mr-3 h-6 sm:h-9" alt="PLI" />
          </NavbarBrand>
          <div className="flex md:order-2">
            <a
              href="mailto:polarlightsimaging@gmail.com"
              className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 rounded-lg focus:ring-2 bg-primary"
            >
              <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
                Contact Us
              </span>
            </a>
            <NavbarToggle />
          </div>
          <NavbarCollapse>
            {data.map((item) =>
              item.attributes.linktext.map((val) => (
                <NavbarLink
                  key={val.id}
                  href={val.linkpath}
                  className="text-lg text-text lg:p-6 xl:px-12 dark:md:hover:bg-fuchsia-60 hover:underline"
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
    return <div>Error:</div>;
  }
}

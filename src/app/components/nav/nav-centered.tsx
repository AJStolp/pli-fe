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
            <Button className="bg-primary">Get started</Button>
            <NavbarToggle />
          </div>
          <NavbarCollapse>
            {data.map((item) =>
              item.attributes.linktext.map((val) => (
                <NavbarLink
                  key={val.id}
                  href={val.linkpath}
                  className="text-lg text-text"
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

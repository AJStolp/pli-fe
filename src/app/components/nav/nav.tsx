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

export default async function Navigation() {
  const endpoint = "/api/navigations?populate=*";

  try {
    const data: NavData[] = await getData(endpoint);

    const imageUrl = data
      .map((url) => url.attributes.logo.data.attributes.url)
      .join("");

    return (
      <Suspense fallback={"...Loading..."}>
        <Navbar fluid rounded className="bg-inherit p-6 border-b-accent">
          <NavbarBrand as={Link} href="/">
            <img src={imageUrl} className="mr-3 h-6 sm:h-9" alt="PLI" />
          </NavbarBrand>
          <NavbarToggle />
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
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return <div>Error: {errorMessage}</div>;
  }
}

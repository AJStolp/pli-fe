import Link from "next/link";
import {
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
    const data: NavData = await getData(endpoint);
    console.log(data.attributes, "Dataaa");

    return (
      <Suspense fallback={"...Loading..."}>
        <Navbar fluid rounded className="bg-inherit p-6">
          <NavbarBrand as={Link} href="https://flowbite-react.com">
            <img
              src="https://cdn.pixabay.com/photo/2021/10/17/13/41/polar-bear-6718362_1280.jpg"
              className="mr-3 h-6 sm:h-9"
              alt="PLI"
            />
          </NavbarBrand>
          <NavbarToggle />
          <NavbarCollapse>
            {data.attributes.linktext.map((val) => {
              return (
                <NavbarLink href="#" active className="text-xl">
                  {val.linktext}
                </NavbarLink>
              );
            })}
          </NavbarCollapse>
        </Navbar>
      </Suspense>
    );
  } catch (error) {
    return <div>Error:</div>;
  }
}

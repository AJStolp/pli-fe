import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

export default function Navigation() {
  return (
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
        <NavbarLink href="#" active className="text-xl">
          Home
        </NavbarLink>
        <NavbarLink as={Link} href="#" className="text-xl">
          About
        </NavbarLink>
        <NavbarLink href="#" className="text-xl">
          Services
        </NavbarLink>
        <NavbarLink href="#" className="text-xl">
          Map
        </NavbarLink>
        <NavbarLink href="#" className="text-xl">
          Contact
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

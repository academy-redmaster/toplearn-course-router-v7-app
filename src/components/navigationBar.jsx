import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "../assets/image/logo.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import CustomNavLink from "./customNavLink";

export default function NavigationBar() {
  const { userId } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Todo",
      href: "/todo",
    },
    {
      label: "contactus",
      href: "/contactus",
    },
    {
      label: "Admin",
      href: "/admin",
    },
    {
      label: "login",
      href: "/auth/login",
    },
  ];
  useEffect(() => {
    (async () => {
      if (!userId) {
        return;
      }
      try {
        const result = await axios.get(
          `http://localhost:8008/api/users/${userId}`
        );
        setUser(result.data);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      }
    })();
  }, [userId]);

  const logoutHandler = () => {
    sessionStorage.removeItem("authToken");
    localStorage.removeItem("authToken");
    toast.dark("token removed from session storage");
    navigate("/auth/login", { replace: true });
  };

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <img src={logo} className="h-10 w-10 object-contain" alt="" />
          <p className="font-bold text-inherit">Redmaster</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <img src={logo} className="h-10 w-10 object-contain" alt="" />
          <p className="font-bold text-inherit">Redmaster</p>
        </NavbarBrand>
        <NavbarItem>
          <CustomNavLink href="/" label="Home" isPreventScroll={true} />
        </NavbarItem>
        <NavbarItem>
          <CustomNavLink href="/todo" label="Todo" isPreventScroll={true} />
        </NavbarItem>
        <NavbarItem>
          <CustomNavLink
            href="/contactus"
            label="ContactUs"
            isPreventScroll={true}
          />
        </NavbarItem>
        <NavbarItem>
          <CustomNavLink href="/admin" label="Admin" isPreventScroll={true} />
        </NavbarItem>
      </NavbarContent>

      {user ? (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <span className="capitalize">
              {user.userName}-{user.email}
            </span>
          </NavbarItem>
          <NavbarItem>
            <Button color="danger" onClick={logoutHandler} variant="flat">
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link to="/auth/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="danger" to="/auth/signup" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              to={`${item.href}`}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

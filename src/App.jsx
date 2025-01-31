import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeSwitcher } from "./components/themeSwitcher";
import { Outlet, ScrollRestoration, useLocation, useMatches } from "react-router";
import NavigationBar from "./components/navigationBar";
import CopyRight from "./components/copyRight";
import { ToastContainer } from "react-toastify";

export default function App() {
  const location = useLocation();
  const matches = useMatches()
  const isAdminSubdomain = location.pathname.startsWith("/admin");
  const isAuthSubdomain = location.pathname.startsWith("/auth");
  return (
    <HeroUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {isAdminSubdomain || isAuthSubdomain ? null : <NavigationBar />}
        {/* {navigatioin.state === "loading" ? <CustomLoader /> : <Outlet />} */}
        <Outlet />
        <ToastContainer />
        <ScrollRestoration
          getKey={(location, mathces) => {
            const paths = ["/", "/todo"];
            return paths.includes(location.pathname)
              ? location.pathname
              : location.key;
          }}
        />
        {isAdminSubdomain || isAuthSubdomain ? null : <CopyRight />}
        <ThemeSwitcher />
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export async function loader() {
  const name = "toplearn";
  const address = "https://www.toplearn.com";
  return { name, address };
}

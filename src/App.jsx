import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeSwitcher } from "./components/themeSwitcher";
import { Outlet, ScrollRestoration, useLocation, useMatches } from "react-router";
import NavigationBar from "./components/navigationBar";
import CopyRight from "./components/copyRight";

export default function App() {
  const location = useLocation();
  const matches = useMatches()
  console.log("🚀 ~ App ~ matches:", matches)
  const isAdminSubdomain = location.pathname.startsWith("/admin");
  const isAuthSubdomain = location.pathname.startsWith("/auth");
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {isAdminSubdomain || isAuthSubdomain ? null : <NavigationBar />}
        {/* {navigatioin.state === "loading" ? <CustomLoader /> : <Outlet />} */}
        <Outlet />
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
    </NextUIProvider>
  );
}

export async function loader() {
  const name = "toplearn";
  const address = "https://www.toplearn.com";
  return { name, address };
}

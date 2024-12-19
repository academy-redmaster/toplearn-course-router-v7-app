import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeSwitcher } from "./components/themeSwitcher";
import { Outlet } from "react-router";
import NavigationBar from "./components/navigationBar";
import CopyRight from "./components/copyRight";

export default function App() {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <NavigationBar />
        <Outlet />
        <CopyRight/>
        <ThemeSwitcher />
      </NextThemesProvider>
    </NextUIProvider>
  );
}

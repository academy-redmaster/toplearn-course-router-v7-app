import { NextUIProvider } from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { ThemeSwitcher } from "./components/themeSwitcher";

export default function App() {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <h1>Hello world</h1>
        <ThemeSwitcher />
      </NextThemesProvider>
    </NextUIProvider>
  );
}

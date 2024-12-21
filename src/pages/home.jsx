import { useTheme } from "next-themes";
import routerLightImage from "../assets/image/react-routr-light.svg";
import routerDarkImage from "../assets/image/react-router-dark.svg";
import { Button } from "@nextui-org/button";
import { Link, useParams } from "react-router";

export default function HomePage() {
  const { lang } = useParams();
  const { theme } = useTheme();
  return (
    <div className="min-h-[80vh] max-w-7xl mx-auto w-full flex flex-col gap-y-12 items-center justify-center px-4 lg:p-0">
      <div className="flex flex-col items-center justify-between gap-y-6 *:text-center">
        <h1 className="font-semibold text-lg">
          {lang === "fa" ? (
            <bdo dir="rtl">
              به ورکشاپ جامع <bdi>React Router</bdi> در <bdi>TopLearn.com</bdi>
              خوش آمدید – سفر کامل یادگیری شما از همین‌جا آغاز می‌شود!
            </bdo>
          ) : (
            "Welcome to the Ultimate React Router Workshop – Your Complete Learning Journey Starts Here!"
          )}
        </h1>
      </div>
      {theme === "dark" ? (
        <img src={routerDarkImage} className="w-full px-8 lg:px-0" alt="" />
      ) : (
        <img src={routerLightImage} className="w-full px-8 lg:px-0" alt="" />
      )}

      <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-6  w-full">
        <Button
          as={Link}
          to="https://github.com/academy-redmaster/toplearn-course-router-v6-app"
          size="lg"
          color="primary"
          variant="shadow"
        >
          Access to Source Code
        </Button>
        <Button
          as={Link}
          to="https://reactrouter.com/en/6.28.0"
          size="lg"
          color="danger"
          variant="shadow"
        >
          React Router Reference
        </Button>
        <Button
          as={Link}
          to="http://localhost:8008/api-docs/"
          size="lg"
          color="warning"
          variant="shadow"
        >
          REST API Document
        </Button>
      </div>
    </div>
  );
}

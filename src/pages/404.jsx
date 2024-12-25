import { Button } from "@nextui-org/button";
import imageUrl from "../assets/image/404.svg";
import { useNavigate } from "react-router";
export default function NotFoundPage({ error }) {
  console.log("🚀 ~ NotFoundPage ~ error:", error);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col items-center justify-center gap-8">
      <img
        src={error.status === 404 ? imageUrl : null}
        className="w-1/3 object-contain"
        alt=""
      />
      <h1 className="text-4xl font-bold">
        {error.status}: {error.data}
      </h1>
      <p className="text-foreground">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button
        onClick={() => navigate("/", { replace: true, state: { name: "ali" } })}
        size="lg"
        color="danger"
        variant="shadow"
      >
        Go Back Home
      </Button>
    </div>
  );
}
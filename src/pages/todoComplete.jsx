import { useInRouterContext } from "react-router";

export default function TodoCompletePage() {
  const isInRoute = useInRouterContext()
  console.log("🚀 ~ TodoCompletePage ~ isInRoute:", isInRoute)
  return (
    <div>
      <h1>Todo Complete page </h1>
    </div>
  );
}

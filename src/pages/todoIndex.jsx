import { Chip } from "@nextui-org/chip";
import { useLoaderData, useNavigation, useRevalidator } from "react-router";
import TableTodo from "../components/tableTodo";
import { Button } from "@nextui-org/button";
import CustomLoader from "../components/customLoader";
import { useAuth } from "../hooks/useAuth";

const columns = [
  { name: "TITLE", uid: "title" },
  { name: "DUEDATE", uid: "dueDate" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];
export default function TodoIndexPage() {
  const navigation = useNavigation();
  const revalidator = useRevalidator();
  const todos = useLoaderData();
  const { userId } = useAuth()
  const handleRevalidate = () => {
    revalidator.revalidate();
  };
  return (
    <div className="space-y-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-secondary">
          Todo List: <span className="text-sm">{userId}</span>
        </h1>
        <div className="flex items-center justify-center gap-2">
          <Chip
            color="secondary"
            variant="bordered"
            radius="md"
            size="lg"
            className="!font-bold h-[40px]"
            startContent={<i className="ri-todo-line"></i>}
          >
            {todos.length}
          </Chip>
          <Button
            isIconOnly
            color="secondary"
            variant="bordered"
            onClick={handleRevalidate}
          >
            <i className="ri-restart-line"></i>
          </Button>
        </div>
      </div>
      {navigation.state === "loading" || revalidator.state === "loading" ? (
        <CustomLoader />
      ) : (
        <TableTodo columns={columns} todos={todos} />
      )}
    </div>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const queryString = url.search;
  const response = await fetch(
    `http://localhost:8008/api/todos${queryString}`
  );
  
  const data = await response.json();
  return data;
}

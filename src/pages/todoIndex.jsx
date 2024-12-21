import { Chip } from "@nextui-org/chip";
import { useLoaderData } from "react-router";
import TableTodo from "../components/tableTodo";

const columns = [
  { name: "TITLE", uid: "title" },
  { name: "DUEDATE", uid: "dueDate" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];
export default function TodoIndexPage() {
  const todos = useLoaderData();
  return (
    <div className="space-y-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-secondary">
          Todo List: <span className="text-sm">todoid</span>
        </h1>
        <Chip color="danger" variant="shadow" size="lg" className="text-xl">
          {todos.length}
        </Chip>
      </div>
      <TableTodo columns={columns} todos={todos} />
    </div>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const queryString = url.search;
  const response = await fetch(
    `http://localhost:8008/api/todos/${queryString}`
  );
  return response.json();
}

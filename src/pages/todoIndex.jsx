import { Chip } from "@heroui/chip";
import {
  Await,
  redirectDocument,
  useLoaderData,
  useNavigation,
  useRevalidator,
} from "react-router";
import TableTodo from "../components/tableTodo";
import { Button } from "@heroui/button";
import CustomLoader from "../components/customLoader";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";

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
  const { userId } = useAuth();
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
      {/* <React.Suspense fallback={<h1 className="text-7xl font-bold bg-black text-white p-20">loading...</h1>}>
        <Await resolve={todos} errorElement={<h1>error await ...</h1>}>
          <TableTodo columns={columns} />
        </Await>
      </React.Suspense> */}
    </div>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const queryString = url.search;
  const response = await fetch(`http://localhost:8008/api/todos${queryString}`);

  const data = await response.json();
  // return { todos: Promise.resolve(data) };
  return data;
}

export async function action({ request }) {
  const formData = await request.formData();
  const { _action, todoId, ...value } = Object.fromEntries(formData);

  switch (_action) {
    case "delete":
      try {
        const response = await axios.delete(
          `http://localhost:8008/api/todos/${todoId}`
        );
        if (response.status === 200 || response.status === 204) {
          toast.success(`the todo : ${todoId} delete`);
        }
      } catch (error) {
        toast.error(`~ error : ${error.message}`);
        throw new Response(`todoIndex action: ${error}`, { status: 404 });
      }
      break;
    case "archive":
      try {
        const check = await axios.get(
          `http://localhost:8008/api/todos/${todoId}`
        );
        console.log("🚀 ~ check:", check);
        if (check.data && check.data.isArchived !== undefined) {
          if (check.data.isArchived) {
            const response = await axios.patch(
              `http://localhost:8008/api/todos/${todoId}/unarchive`
            );
            if (response.status === 200 || response.status === 204) {
              toast.warning("task updated successfully UnArchived ");
            }
          } else {
            const response = await axios.patch(
              `http://localhost:8008/api/todos/${todoId}/archive`
            );
            if (response.status === 200 || response.status === 204) {
              toast.success("task updated successfully Archived ");
            }
          }
        } else {
          throw new Error("Invalid response from the server");
        }
      } catch (error) {
        console.log("🚀 ~ error:", error);
        toast.error(`~ error archive task : ${error.message}`);
      }
      break;
    case "complete":
      try {
        const check = await axios.get(
          `http://localhost:8008/api/todos/${todoId}`
        );
        if (check.data && check.data.isCompleted !== undefined) {
          if (check.data.isCompleted) {
            toast.info("the task is already completed, no change made.");
          } else {
            const response = await axios.patch(
              `http://localhost:8008/api/todos/${todoId}/complete`
            );
            if (response.status === 200 || response.status === 204) {
              toast.success("task updated successfully");
            }
          }
        } else {
          throw new Error("Invalid response from the server");
        }
        console.log("🚀 ~ check:", check);
      } catch (error) {
        toast.error(`~ error complete task: ${error.message}`);
      }
      break;
    default:
      return redirectDocument("/todo");
  }
}

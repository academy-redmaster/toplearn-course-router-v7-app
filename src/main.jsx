import { createRoot } from "react-dom/client";
import "./style/index.css";
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import App, { loader as appLoader } from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Route,
  RouterProvider,
  useRouteError,
} from "react-router";
import HomePage from "./pages/home.jsx";
import ContactUsPage, {
  loader as contactusLoader,
} from "./pages/contactUs.jsx";
import TodoLayoutPage from "./pages/todoLayout.jsx";
import TodoIndexPage, {
  loader as todoIndexLoader,
} from "./pages/todoIndex.jsx";
import TodoDetailsPage, {
  loader as todoDetailsLoader,
} from "./pages/todoDetails.jsx";
import TodoCompletePage from "./pages/todoComplete.jsx";
import AdminLayoutPage from "./pages/adminLayout.jsx";
import AdminPage from "./pages/admin.jsx";
import AdminTodoPage from "./pages/adminTodo.jsx";
import AdminTodoDetails, {
  loader as adminTodoDetailsLoader,
  AdminTodoDetailsErrorBoundary,
} from "./pages/adminTodoDetails.jsx";
import NotFoundPage from "./pages/404.jsx";
import LoginPage from "./pages/login.jsx";
import SignUpPage from "./pages/signUp.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<App />}
      loader={appLoader}
      id="root"
      errorElement={<ErrorBoundary />}
    >
      <Route
        path="/:lang?/"
        Component={HomePage}
        handle={{ title: "Home Page" }}
      />
      <Route
        path="todo"
        element={<TodoLayoutPage />}
        handle={{ crumb: () => <Link to="/todo">Todo</Link> }}
      >
        <Route index element={<TodoIndexPage />} loader={todoIndexLoader} />
        <Route
          path="create"
          element={"create page"}
          handle={{ crumb: () => <Link to="/todo/create">Todo Create</Link> }}
        />
        <Route
          path=":id"
          element={<TodoDetailsPage />}
          loader={todoDetailsLoader}
          handle={{
            title: (data) => data.title,
            crumb: (data) => data.title,
          }}
        />
        <Route
          path=":id/edit"
          element={"create page"}
          handle={{ crumb: () => "Todo Create" }}
        />
        <Route path=":id/complete" Component={TodoCompletePage} />
        <Route path=":id/archive" element={"archive page"} />
      </Route>
      <Route
        path="contactus"
        Component={ContactUsPage}
        loader={contactusLoader}
      />
      <Route path="auth/login" element={<LoginPage />} />
      <Route path="auth/signup" element={<SignUpPage />} />
      <Route
        path="admin"
        element={<AdminLayoutPage />}
        errorElement={<h1>error admin layout</h1>}
      >
        <Route path="/admin" element={<AdminPage />}>
          <Route path="/admin/" element={<AdminTodoPage />}>
            <Route
              index
              element={<AdminTodoDetails />}
              loader={adminTodoDetailsLoader}
              errorElement={<AdminTodoDetailsErrorBoundary />}
            />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

function ErrorBoundary() {
  const error = useRouteError();
  console.log("🚀 ~ ErrorBoundary ~ error:", error);
  return (
    <>
      <NotFoundPage error={error} />
    </>
  );
}

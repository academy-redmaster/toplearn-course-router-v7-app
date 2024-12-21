import { createRoot } from "react-dom/client";
import "./style/index.css";
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import HomePage from "./pages/home.jsx";
import ContactUsPage, {
  loader as contactusLoader,
} from "./pages/contactUs.jsx";
import TodoLayoutPage from "./pages/todoLayout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/:lang?/" Component={HomePage} />
      <Route path="todo" element={<TodoLayoutPage />}>
        <Route index element={"index page"} />
        <Route path="create" element={"create page"} />
        <Route path=":id" element={"details page"} />
        <Route path=":id/edit" element={"create page"} />
        <Route path=":id/complete" element={"complete page"} />
        <Route path=":id/archive" element={"archive page"} />
      </Route>
      <Route
        path="contactus"
        Component={ContactUsPage}
        loader={contactusLoader}
      />
      <Route path="auth/login" element={"login page"} />
      <Route path="auth/register" element={"regsiter  page"} />
      <Route path="admin/*" element={"admin page"} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

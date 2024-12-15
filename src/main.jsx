import { createRoot } from "react-dom/client";
import "./style/index.css";
import 'remixicon/fonts/remixicon.css'
import 'react-toastify/dist/ReactToastify.css';
import App from "./App.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

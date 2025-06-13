import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { ToastProvider } from "../constants/ToastProvider.jsx";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ToastProvider>
  </BrowserRouter>
);

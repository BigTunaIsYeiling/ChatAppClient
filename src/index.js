import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { Store } from "./Store";
import { Conversations } from "./Components/Conversations";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Settings } from "./Components/Settings";
import { ChattingRoom } from "./Components/ChattingRoom";
import { Register } from "./Components/Register";
import { SignUp } from "./Components/SignUp";
import { Login } from "./Components/Login";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Conversations />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "Chat/:ChatId/:ReceiverId",
        element: <ChattingRoom />,
      },
    ],
  },
  {
    path: "register",
    element: <Register />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        index: true,
        element: <SignUp />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>
);

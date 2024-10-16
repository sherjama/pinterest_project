import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Provider } from "react-redux";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./store/store.js";

// pages
import {
  ContactUsPage,
  ProfilePage,
  AboutPage,
  BlogPage,
  HomePage,
  LoginAndSignupPage,
  Error404Page,
  CreateUpdatePinPage,
  PostPage,
} from "./components/index.js";

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/auth/:what",
        element: <LoginAndSignupPage />,
      },
      {
        path: "/contact-us",
        element: <ContactUsPage />,
      },
      {
        path: "/profile/:userId",
        element: <ProfilePage />,
      },

      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/404",
        element: <Error404Page />,
      },
      {
        path: "/creation-pin/:state",
        element: <CreateUpdatePinPage />,
      },
      {
        path: "/pin/:postid",
        element: <PostPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

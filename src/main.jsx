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
  AuthLayout,
} from "./components/index.js";

// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/auth/:what",
        element: (
          <AuthLayout authentication={false}>
            <LoginAndSignupPage />
          </AuthLayout>
        ),
      },
      {
        path: "/contact-us",
        element: (
          <AuthLayout authentication>
            <ContactUsPage />
          </AuthLayout>
        ),
      },
      {
        path: "/profile/:userId",
        element: (
          <AuthLayout authentication>
            <ProfilePage />
          </AuthLayout>
        ),
      },

      {
        path: "/about",
        element: (
          <AuthLayout authentication>
            <AboutPage />
          </AuthLayout>
        ),
      },
      {
        path: "/home",
        element: (
          <AuthLayout authentication>
            <HomePage />
          </AuthLayout>
        ),
      },
      {
        path: "/blog",
        element: (
          <AuthLayout authentication>
            <BlogPage />
          </AuthLayout>
        ),
      },
      {
        path: "/404",
        element: <Error404Page />,
      },
      {
        path: "/creation-pin/:state",
        element: (
          <AuthLayout authentication>
            <CreateUpdatePinPage />
          </AuthLayout>
        ),
      },
      {
        path: "/pin/:postid",
        element: (
          <AuthLayout authentication>
            <PostPage />
          </AuthLayout>
        ),
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

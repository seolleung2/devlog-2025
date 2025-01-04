import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";

import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";

import BlogListPage from "./blog/BlogListPage";
import BlogPostPage from "./blog/BlogPostPage";

import DashboardPage from "./admin/DashboardPage";
import PostManagePage from "./admin/PostManagePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <BlogListPage /> },
      {
        path: "auth",
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },
      {
        path: "blog",
        children: [
          { index: true, element: <BlogListPage /> },
          { path: ":postId", element: <BlogPostPage /> },
        ],
      },
      {
        path: "admin",
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "posts", element: <PostManagePage /> },
        ],
      },
    ],
  },
]);

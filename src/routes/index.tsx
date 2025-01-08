import { createBrowserRouter, Outlet } from "react-router-dom";
import RootLayout from "@/components/layout/RootLayout";
import PrivateRoute from "@/components/features/PrivateRoute";

import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";

import BlogListPage from "./blog/BlogListPage";
import PostDetailPage from "./posts/PostDetailPage";

import DashboardPage from "./admin/DashboardPage";
import PostManagePage from "./admin/PostManagePage";
import HomePage from "./home/HomePage";
import WritePage from "./admin/WritePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "auth",
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },
      {
        path: "posts",
        children: [
          { index: true, element: <BlogListPage /> }, // 추후 작업시 변경
          { path: ":id", element: <PostDetailPage /> },
        ],
      },
      {
        path: "admin",
        element: (
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "posts", element: <PostManagePage /> },
          { path: "write", element: <WritePage /> },
        ],
      },
    ],
  },
]);

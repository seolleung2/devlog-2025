import { createBrowserRouter, Outlet } from "react-router-dom";
import RootLayout from "@/components/layout/RootLayout";
import PrivateRoute from "@/components/features/PrivateRoute";
import RequireUsername from "@/components/features/RequireUsername";

import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";

import PostsPage from "./posts/PostsPage";
import PostDetailPage from "./posts/PostDetailPage";

import DashboardPage from "./admin/DashboardPage";
import PostManagePage from "./admin/PostManagePage";
import HomePage from "./home/HomePage";
import WritePage from "./admin/WritePage";

import About from "./about/About";
import Guestbook from "./guestbook/Guestbook";
import ProfileSetupPage from "./profile/ProfileSetupPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireUsername>
        <RootLayout />
      </RequireUsername>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <About /> },
      { path: "guestbook", element: <Guestbook /> },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          {
            path: "setup",
            element: <ProfileSetupPage />,
          },
        ],
      },
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
          { index: true, element: <PostsPage /> },
          { path: ":id", element: <PostDetailPage /> },
        ],
      },
      {
        path: "admin",
        element: (
          <PrivateRoute requireAdmin>
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

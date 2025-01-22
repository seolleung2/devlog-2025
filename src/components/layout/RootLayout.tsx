import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./Footer";
import Header from "./Header";
import WriteButton from "../features/WriteButton";

export default function RootLayout() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <main className="w-full flex-1 px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
      <Footer toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <WriteButton />
      <Toaster />
    </div>
  );
}

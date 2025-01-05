import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="w-full flex-1 px-4 py-8 md:py-12">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

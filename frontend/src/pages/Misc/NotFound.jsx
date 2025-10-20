// src/pages/Misc/NotFound.jsx
import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function NotFound() {
  return (
    <div className="layout min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-gray-700">The page you are looking for does not exist.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

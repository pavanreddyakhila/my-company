// src/pages/Misc/Profile.jsx
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

export default function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) return <p className="p-6">Please login to view your profile.</p>;

  return (
    <div className="layout min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
          <div className="space-y-2">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

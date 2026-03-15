import React from "react";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";
function page() {
  return (
    <div className="h-screen">
      <Navigation />
      <Sidebar />
    </div>
  );
}

export default page;

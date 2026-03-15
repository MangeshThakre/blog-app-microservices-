"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { redirect } from "next/navigation";
function Navigation() {
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4 absolute top-0 left-0 z-10">
      <div
        className="text-lg font-bold cursor-pointer"
        onClick={() => redirect("/blogs")}
      >
        My Blog
      </div>
      <div>
        <Avatar className="cursor-pointer" onClick={() => redirect("/profile")}>
          <AvatarImage />
          <AvatarFallback>Cn</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Navigation;

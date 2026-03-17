"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { useAppContext } from "@/context/appContext";
import { Button } from "./ui/button";

function Navigation() {
  const { user, userLoading, isAuth } = useAppContext();
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4 absolute top-0 left-0 z-10">
      <div
        className="text-lg font-bold cursor-pointer"
        onClick={() => redirect("/blogs")}
      >
        My Blog
      </div>

      {userLoading ? (
        <Skeleton className="h-8 w-8 rounded-full" />
      ) : isAuth ? (
        <Avatar className="cursor-pointer" onClick={() => redirect("/profile")}>
          <AvatarImage />
          <AvatarFallback>Cn</AvatarFallback>
        </Avatar>
      ) : (
        <Button onClick={() => redirect("/login")}>Login</Button>
      )}
    </div>
  );
}

export default Navigation;

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";
import { redirect } from "next/navigation";

const Home = () => {
  return redirect("/blogs");
};

export default Home;

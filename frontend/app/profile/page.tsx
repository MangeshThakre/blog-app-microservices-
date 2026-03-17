"use client";
import React from "react";
import Navigation from "@/components/Navigation";
import { useAppContext } from "@/context/appContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function Profile() {
  const { user } = useAppContext();

  console.log(user);

  return (
    <div className="flex items-center justify-center h-screen">
      <Navigation />

      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center gap-4">
          {/* profile pic */}
          <Avatar className="w-24 h-24">
            <AvatarImage
              src={user?.image}
              alt="@shadcn"
              className="grayscale"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {/* profile pic end */}
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="m@example.com"
                  required
                  disabled
                  defaultValue={user?.name || ""}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  disabled
                  defaultValue={user?.email}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Edit
          </Button>
          <Button type="submit" className="w-full">
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Profile;

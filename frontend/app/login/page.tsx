"use client";
import React from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import { useAppContext } from "@/context/appContext";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import axios from "axios";

function page() {
  const { isAuth, user } = useAppContext();

  const handleGoogleLoginResponce = async (authResult: any) => {
    try {
      console.log(authResult);

      const response = await axios({
        method: "POST",
        url: "http://localhost:8081/api/v1/user/login",
        data: {
          code: authResult["code"]
        }
      });

      localStorage.setItem("Token", response.data.token);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginResponce,
    onError: handleGoogleLoginResponce,
    flow: "auth-code" // Use the authorization code flow to get a code that can be exchanged for tokens on the server. by default flow is "implicit" which returns access token directly to the client, but in our case we want to exchange the code for tokens on the server for better security.
  });

  if (isAuth && user) return redirect("/blogs");
  else
    return (
      <div className="h-screen flex items-center justify-center">
        <Navigation />
        <div>
          <Card size="sm" className="mx-auto w-full max-w-sm">
            <CardHeader>
              <CardTitle> Login</CardTitle>
              <CardDescription>login with your google account</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                The card component supports a size prop that can be set to
                &quot;sm&quot; for a more compact appearance.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={googleLogin}
              >
                google login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
}

export default page;

"use client";
import { supabase } from "@/app/utils/supabase";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthCallback = () => {
  const router = useRouter();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/listing");
        localStorage.setItem("sessionData", JSON.stringify(data.session));
      } else {
        console.log("No session found");
      }
    });
  }, []);

  return <div>Signing you in...</div>;
};

export default AuthCallback;

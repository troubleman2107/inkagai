"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import localFont from "next/font/local";

interface FormData {
  email: string;
}

const spaceMono = localFont({
  src: "../../../public/fonts/space-mono/SpaceMono-Regular.ttf",
});

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });
  const [url, setUrl] = useState<string>();

  const supabase = createClient();

  useEffect(() => {
    setUrl(window.location.host);
  }, []);

  return (
    <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
      <div className="mx-auto flex max-w-sm flex-col justify-between">
        <span
          className={`mb-4 text-center text-[25px] font-bold text-black dark:text-white`}
        >
          Login with Magic Link
        </span>
        <Auth
          supabaseClient={supabase}
          view="magic_link"
          redirectTo={`https://${url}/auth/callback`}
          showLinks={false}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "white",
                  brandAccent: "#E6E6E6",
                  brandButtonText: "black",
                  inputText: "gray",
                },
                fonts: {
                  bodyFontFamily: ``,
                  buttonFontFamily: ``,
                  inputFontFamily: ``,
                  labelFontFamily: ``,
                },
              },
            },
          }}
          providers={["google"]}
        />
      </div>
    </section>
  );
};

export default Login;

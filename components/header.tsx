"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { useUserStore } from "@/zustand/store";

const Header = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState<boolean>(true);
  const user = session?.user;

  const { email, plan, button_click, setUser } = useUserStore();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`plan, button_click`)
        .eq("id", user?.id)
        .single();
      if (data) {
        if (setUser) {
          setUser({
            id: user?.id,
            email: user?.email,
            plan: data.plan,
            button_click: data.button_click,
          });
        }
      }

      if (error && status !== 406) {
        throw error;
      }
    } catch (error) {
      console.log("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase, setUser]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <>
      {!loading && (
        <div className="shado w- flex items-center justify-between rounded-full border bg-[#fafafa] p-2 px-4 dark:border-zinc-800 dark:bg-[#111]">
          {`${email} | ${plan} | ${button_click}`} clicks
        </div>
      )}
      <div>
        <form action="/auth/signout" method="post">
          <Button
            size="icon"
            className="w-full px-5 py-0 font-bold"
            variant="brand"
            type="submit"
          >
            Logout
          </Button>
        </form>
      </div>
    </>
  );
};

export default Header;

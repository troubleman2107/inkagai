"use client";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import { addZeroNumber } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useUserStore } from "@/zustand/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  const [subscribeModal, setSubscribeModal] = useState<boolean>(false);
  const { id, button_click, setUser } = useUserStore();
  const supabase = createClientComponentClient();

  const decreaseNumber = async () => {
    if (button_click === 0) {
      setSubscribeModal(true);
    }

    if (button_click) {
      const { data, error } = await supabase
        .from("profiles")
        .update({ button_click: button_click - 1 })
        .eq("id", id)
        .select();

      if (error) throw error;

      if (setUser && data) {
        setUser({
          button_click: data[0]?.button_click,
        });

        if (data[0]?.button_click === 0) {
          setSubscribeModal(true);
        }
      }
    }
  };

  const closeSubscribeModal = () => {
    setSubscribeModal(false);
  };

  return (
    <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
      <div className="mx-auto flex max-w-sm flex-col justify-between">
        <span
          className={`-mt-14 mb-14 inline-block text-center text-[64px] font-bold text-black dark:text-white`}
        >
          {button_click ? addZeroNumber(button_click) : 0}
        </span>
        <Button
          size="xl"
          className="w-full font-bold"
          variant="brand"
          onClick={decreaseNumber}
        >
          Decrease
        </Button>
        <AlertDialog open={subscribeModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                You on have limited button in click !
              </AlertDialogTitle>
              <AlertDialogDescription>
                By subscribing, you&apos;ll unlock this feature and get more
                clicks !
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={closeSubscribeModal}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction>Subscrition</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
}

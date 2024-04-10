"use client";

import Image from "next/image";
import Wrapper from "@/components/wrapper";
import { Button } from "@/components/ui/button";

import robot from "@/public/images/robot.png";
import { useEffect, useState } from "react";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const NUMBER_OF_LIMIT = 5;

export default function Home() {
  const [count, setCount] = useState<number>(1);
  const [isIncrease, setIsIncrease] = useState<boolean>(true);
  const [subscribeModal, setSubscribeModal] = useState<boolean>(false);

  const increaseNumber = () => {
    if (isIncrease) {
      setCount(count + 1);
    } else {
      setSubscribeModal(true);
    }
  };

  const closeSubscribeModal = () => {
    setSubscribeModal(false);
  };

  useEffect(() => {
    if (count === NUMBER_OF_LIMIT) {
      setIsIncrease(false);
    }
  }, [count]);

  return (
    <section className="flex h-screen w-full flex-col justify-between p-9 lg:h-auto">
      <div className="mx-auto flex max-w-sm flex-col justify-between">
        <span
          className={`-mt-14 mb-14 inline-block text-center text-[64px] font-bold text-black dark:text-white`}
        >
          {addZeroNumber(count)}
        </span>
        <Button
          size="xl"
          className="w-full font-bold"
          variant="brand"
          onClick={increaseNumber}
        >
          Increase
        </Button>
        <AlertDialog open={subscribeModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                You have limited button in click !
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

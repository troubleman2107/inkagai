"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";

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
          className={`-mt-14 mb-14 inline-block text-center text-[30px] font-bold text-black dark:text-white`}
        >
          You want to clicks !
          <Link href={"/auth/login"}>
            <Button
              size="lg"
              className="w-full font-bold"
              variant="brand"
              onClick={increaseNumber}
            >
              Join us
            </Button>
          </Link>
        </span>
      </div>
    </section>
  );
}

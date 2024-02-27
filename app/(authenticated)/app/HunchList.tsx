"use client";

import { Loader2 } from "lucide-react";

import { useState, useEffect, ReactComponentElement, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import LoadingCard from "./LoadingCard";

export default function HunchList({
  initialHunches,
  getHunches,
}: {
  initialHunches: any;
  getHunches: any;
}) {
  const NUMBER_OF_HUNCHES_TO_FETCH = 5;

  const [offset, setOffset] = useState(NUMBER_OF_HUNCHES_TO_FETCH);
  const [hunches, setHunches] = useState(initialHunches);
  const [outOfHunches, setOutOfHunches] = useState(false);
  const { ref, inView } = useInView();

  const getMoreHunches = async () => {
    const moreHunches = await getHunches(offset, NUMBER_OF_HUNCHES_TO_FETCH);

    if (moreHunches.length == 0) {
      setOutOfHunches(true);
      return;
    }

    setHunches([...hunches, ...moreHunches]);
    setOffset(offset + NUMBER_OF_HUNCHES_TO_FETCH);
  };

  useEffect(() => {
    if (outOfHunches) return;
    if (inView) {
      getMoreHunches();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      {hunches.map((Hunch: ReactComponentElement<any>, index: number) => {
        return (
          <Suspense key={index} fallback={<LoadingCard />}>
            {Hunch}
          </Suspense>
        );
      })}
      <div ref={ref} className="pb-16 sm:pb-0">
        {outOfHunches ? (
          <p className="text-center text-muted-foreground text-md my-4">
            You&apos;re all out of hunches. Time to make some more!
          </p>
        ) : (
          <Loader2 className="my-2 w-8 h-8 mx-auto animate-spin" />
        )}
      </div>
    </>
  );
}

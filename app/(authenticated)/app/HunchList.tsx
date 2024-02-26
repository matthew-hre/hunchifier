"use client";

import { Loader2 } from "lucide-react";

import { useState, useEffect, ReactComponentElement } from "react";
import { useInView } from "react-intersection-observer";

export default function HunchList({
  initialHunches,
  getHunches,
}: {
  initialHunches: any;
  getHunches: any;
}) {
  const NUMBER_OF_HUNCHES_TO_FETCH = 10;

  const [offset, setOffset] = useState(NUMBER_OF_HUNCHES_TO_FETCH);
  const [hunches, setHunches] = useState(initialHunches);
  const [outOfHunches, setOutOfHunches] = useState(
    NUMBER_OF_HUNCHES_TO_FETCH > initialHunches.length
  );
  const { ref, inView } = useInView();

  const getMoreHunches = async () => {
    const moreHunches = await getHunches(offset, NUMBER_OF_HUNCHES_TO_FETCH);

    if (moreHunches.length < NUMBER_OF_HUNCHES_TO_FETCH) {
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
      {hunches.map((Hunch: ReactComponentElement<any>) => Hunch)}
      <div ref={ref}>
        {outOfHunches ? (
          <p className="text-center text-muted-foreground text-md my-4">
            You&apos;re all out of hunches. Time to make some more!
          </p>
        ) : (
          <Loader2 className="w-8 h-8 mx-auto animate-spin" />
        )}
      </div>
    </>
  );
}

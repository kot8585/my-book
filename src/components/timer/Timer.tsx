"use client";

import { FaPlayCircle, FaStopCircle, FaPauseCircle } from "react-icons/fa";
import SimpleButton from "../common/SimpleButton";
import { useRef, useState } from "react";
import { numberToTime } from "@/utils/format";

export default function Timer() {
  const [count, setCount] = useState(0);
  const timer = useRef<NodeJS.Timer>();
  const [isReading, setIsReading] = useState(false);

  const handlePlay = () => {
    setIsReading(true);
    console.log("timer.current : ", timer.current);

    timer.current = setInterval(() => {
      console.log("count 실행");
      setCount((prevCount) => prevCount + 1);
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(timer.current);
    setIsReading(false);
  };

  return (
    <section className="lg:w-1/2 flex flex-col items-center  justify-center gap-3 pt-14 lg:pt-0">
      <span className="text-4xl font-semibold">{numberToTime(count)}</span>
      <div className="flex">
        {isReading ? (
          <SimpleButton onClick={handleStop}>
            <FaPauseCircle className="w-11 h-11 text-gray-500" />
          </SimpleButton>
        ) : (
          <SimpleButton onClick={handlePlay}>
            <FaPlayCircle className="w-11 h-11 text-gray-500" />
          </SimpleButton>
        )}
        <SimpleButton>
          <FaStopCircle className="w-11 h-11 text-gray-500" />
        </SimpleButton>
      </div>
    </section>
  );
}

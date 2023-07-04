import { FaPlayCircle, FaStopCircle } from "react-icons/fa";
import SimpleButton from "../common/SimpleButton";

export default function Timer() {
  return (
    <section className="lg:w-1/2 flex flex-col items-center  justify-center gap-3 pt-14 lg:pt-0">
      <span className="text-4xl font-semibold">1:21:21</span>
      <div className="flex">
        <SimpleButton>
          <FaPlayCircle className="w-11 h-11 text-gray-500" />
        </SimpleButton>
        <SimpleButton>
          <FaStopCircle className="w-11 h-11 text-gray-500" />
        </SimpleButton>
      </div>
    </section>
  );
}

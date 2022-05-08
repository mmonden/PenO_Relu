import Tanden from "./Tanden";
import { useState } from "react";

type AnatomyProps = {
  setSkullSelect: Function;
  states: Object;
  skullSelect: boolean;
  skullLoaded: boolean;
};

const Anatomy = ({
  states,
  setSkullSelect,
  skullSelect,
  skullLoaded,
}: AnatomyProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center text-2xl">
        <img
          src="https://cdn-icons-png.flaticon.com/512/103/103386.png"
          className="h-6 w-8 px-1"
          alt="logo"
        />
        Anatomy Selector
      </div>

      <Tanden
        states={states}
        setSkullSelect={setSkullSelect}
        skullSelect={skullSelect}
        skullLoaded={skullLoaded}
      />
    </div>
  );
};

export default Anatomy;

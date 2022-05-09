import Tanden from "./Tanden";
import { useState } from "react";
import { IFile } from "../../types";

type AnatomyProps = {
  setSkullSelect: Function;
  states: Object;
  skullSelect: boolean;
  skullLoaded: boolean;
  file: IFile;
  selectedTooth: String;
};

const Anatomy = ({
  states,
  setSkullSelect,
  skullSelect,
  skullLoaded,
  file,
  selectedTooth,
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
        file={file}
        selectedTooth={selectedTooth}
      />
    </div>
  );
};

export default Anatomy;

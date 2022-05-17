import Back from "./Back";
import Anatomy from "./Anatomy";
import Display from "./Display";
import { useState } from "react";
import { IFile } from "../../types";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

type SidebarProps = {
  setSkullSelect: Function;
  states: Object;
  skullSelect: boolean;
  skullLoaded: boolean;
  file: IFile;
  selectedTooth: String;
  sideSwipe: boolean;
  setSideSwipe: Function;
};

const Sidebar = ({
  states,
  setSkullSelect,
  skullSelect,
  skullLoaded,
  file,
  selectedTooth,
  sideSwipe,
  setSideSwipe,
}: SidebarProps) => {
  const onSwipe = () => {
    setSideSwipe(!sideSwipe);
  };

  return (
    <div className="flex justify-end">
      {!sideSwipe ? (
        <div
          id="main sidebar"
          className="flex flex-row"
          style={{ height: "calc(100vh - 48px)" }}
        >
          <button onClick={() => onSwipe()}>
            <Back value={sideSwipe} />
          </button>
          <div className="flex flex-col divide-y-2 divide-gray-300 overflow-y-auto overflow-x-auto">
            <div className="h-full bg-gray-100 pb-2">
              <Anatomy
                states={states}
                setSkullSelect={setSkullSelect}
                skullSelect={skullSelect}
                skullLoaded={skullLoaded}
                file={file}
                selectedTooth={selectedTooth}
              />
            </div>
            <div className="bg-gray-100 h-full">
              <Display />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center"
          style={{ height: "calc(100vh - 48px)" }}
        >
          <button onClick={onSwipe}>
            <Back value={sideSwipe} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

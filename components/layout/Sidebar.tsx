import Back from "./Back";
import Anatomy from "./Anatomy";
import Display from "./Display";
import { useState } from "react";

const Sidebar = () => {
  const [swiped, setSwipe] = useState(false);

  const onSwipe = () => {
    setSwipe(!swiped);
  };

  return (
    <div className="min-w-screen min-h-screen flex justify-end">
      {!swiped ? (
        <div id="main sidebar" className="flex flex-row">
          <button onClick={onSwipe}>
            <Back value={swiped} />
          </button>
          <div className="h-screen divide-y-2 divide-gray-400 overflow-hidden">
            <div className="bg-gray-400"></div>

            <div className="h-1/2 bg-gray-100">
              <Anatomy />
            </div>
            <div className="bg-gray-100 h-1/2">
              <Display />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row">
          <button onClick={onSwipe}>
            <Back value={swiped} />
          </button>
          <div className="w-1/10 divide-y-2 divide-gray-400"></div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

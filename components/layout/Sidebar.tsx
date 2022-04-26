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
    <div className="flex items-center">
      {!swiped ? (
        <div id="main sidebar" className="flex flex-row" style={{height:"calc(100vh - 48px)"}}>
          <button onClick={onSwipe}>
            <Back value={swiped} />
          </button>
          <div className="flex flex-col divide-y-2 divide-gray-300" style={{width:"370px", overflow:"scroll"}}>
            <div className="h-full bg-gray-100 pb-2">
              <Anatomy />
            </div>
            <div className="bg-gray-100 h-full">
              <Display />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row" style={{height: "calc(100vh - 48px)"}}>
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

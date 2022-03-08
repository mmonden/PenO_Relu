import React, { Component } from "react";
import { ShareIcon } from "@heroicons/react/outline";

const ShareButton = () => {
  return (
    <div id="Button Container">
      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded flex items-center">
        <ShareIcon className="w-6 h-6" />
        Share
      </button>
    </div>
  );
};

export default ShareButton;

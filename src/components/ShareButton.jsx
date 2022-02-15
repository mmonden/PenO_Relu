import React, { Component } from "react";

const Button = ({ toggleFunction }) => {
  return (
    <div>
      <button
        onClick={toggleFunction}
        className="bg-blue-700 text-3xl fond-bold underline"
      >
        Share
      </button>
    </div>
  );
};
export default Button;

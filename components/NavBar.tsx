import React, { Component } from "react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="bg-gray-400 shadow-lg h-12 flex space-x-4">
      <Image
        src={require("./images/relu-logo-small.png")}
        alt="Logo"
        width={120}
        height={50}
      />
      <div className="h-12 w-20">
        <button
          className="h-12 w-20 hover:bg-gray-500 rounded"
          onClick={() => (document.location.href = "http://localhost:3000")}
        >
          Home
        </button>
      </div>
      <div className="absolute right-0 h-12 w-20">
        <button className="h-12 w-20 hover:bg-gray-500 rounded">Log out</button>
      </div>
    </div>
  );
};

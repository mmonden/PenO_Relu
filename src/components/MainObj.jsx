import React, { Component, useState } from "react";
import Button from "./ShareButton";

const MainObj = () => {
  const [popupVisible, setToggle] = useState(false);

  return (
    <div>
      <Button toggleFunction={() => setToggle(!popupVisible)}></Button>
      <p>{popupVisible ? "Zichtbaar" : "Onzichtbaar"}</p>
    </div>
  );
};
export default MainObj;

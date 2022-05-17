import Tanden_1x from "./Tanden_1x";
import Tanden_2x from "./Tanden_2x";
import Tanden_3x from "./Tanden_3x";
import Tanden_4x from "./Tanden_4x";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { controls, dictPositions } from "../stlviewer";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IFile } from "../../types";

const onWisdom = (teeth_id) => {
  if (dictPositions != undefined) {
    if (dictPositions[teeth_id] == undefined) {
      return false;
    }

    return true;
  }
};

const onSwipe = (teeth_id) => {
  if (dictPositions[teeth_id] == undefined) {
    alert("This tooth is not present");
    return;
  }

  var posx = dictPositions[teeth_id].x;
  var posy = dictPositions[teeth_id].y;
  var posz = dictPositions[teeth_id].z;

  const teethIDS = teeth_id.split("_");

  if (teethIDS[1] == "17") {
    controls.setLookAt(-49, -0.6, 10.44, posx, posy, posz, true);
  } else if (teethIDS[1] == "27") {
    controls.setLookAt(51, -0.6, 10.44, posx, posy, posz, true);
  } else if (Number(teethIDS[1]) > 28) {
    controls.setLookAt(2 * posx, 2 * posy, 0, posx, posy, posz, true);
  } else {
    controls.setLookAt(2 * posx, 2 * posy, 10.44, posx, posy, posz, true);
  }
};

const sideView = (side) => {
  console.log(side);
  if (side == "R") {
    controls.setLookAt(-129, -0.6, 10.44, 0, 0, 0, true);
  } else if (side == "L") {
    controls.setLookAt(131, -0.6, 10.44, 0, 0, 0, true);
  } else {
    controls.reset(true);
  }
};

type TandenProps = {
  setSkullSelect: Function;
  states: Object;
  skullSelect: boolean;
  skullLoaded: boolean;
  file: IFile;
  selectedTooth: String;
};

const Tanden = ({
  states,
  setSkullSelect,
  skullSelect,
  skullLoaded,
  file,
  selectedTooth,
}: TandenProps) => {
  const handleClick = () => {
    setSkullSelect(!skullSelect);
    // if (!skullSelect) {
    //   controls.setLookAt(0, -200, 50, 0, 100, 50, true);
    // } else {
    //   controls.setLookAt(0, -128, 0, 0, 0, 0, true);
    // }
  };
  return (
    <div className="justify-center items-center flex-col flex">
      <div className="flex flex-row justify-center items-center text-xs">
        <Tanden_1x
          states={states}
          onSwipe={onSwipe}
          file={file}
          selectedTooth={selectedTooth}
          onWisdom={onWisdom}
        />
        <Tanden_2x
          states={states}
          onSwipe={onSwipe}
          file={file}
          selectedTooth={selectedTooth}
          onWisdom={onWisdom}
        />
      </div>

      <div className="flex flex-row place-content-center text-xs">
        <Tanden_4x
          states={states}
          onSwipe={onSwipe}
          file={file}
          selectedTooth={selectedTooth}
          onWisdom={onWisdom}
        />
        <Tanden_3x
          states={states}
          onSwipe={onSwipe}
          file={file}
          selectedTooth={selectedTooth}
          onWisdom={onWisdom}
        />
      </div>

      <div className="flex flex-row">
        <button onClick={() => sideView("R")}>
          {" "}
          <h2>R</h2>{" "}
        </button>

        <div className="items-center place-content-center">
          <button onClick={() => sideView("C")}>
            <Image
              src={require("../textures/relugebit.png")}
              height={150}
              width={150}
              alt="logo"
            />
          </button>
        </div>
        <button onClick={() => sideView("L")}>
          {" "}
          <h2>L</h2>{" "}
        </button>
      </div>

      {!skullLoaded ? (
        <div className="space-x-2 flex flex-row items-center">
          <Spinner as="span" size="sm" role="status" animation="border" />
          <div>Loading skull</div>{" "}
        </div>
      ) : (
        <div className="space-x-2 flex flex-row items-center">
          <input
            type="checkbox"
            id="topping"
            name="topping"
            value="skullChecked"
            onClick={() => handleClick()}
          />
          <div>SHOW SKULL</div>{" "}
        </div>
      )}
    </div>
  );
};

export default Tanden;

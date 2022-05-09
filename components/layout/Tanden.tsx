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

type TandenProps = {
  setSkullSelect: Function;
  states: Object;
  skullSelect: boolean;
  skullLoaded: boolean;
  file: IFile;
};

const Tanden = ({
  states,
  setSkullSelect,
  skullSelect,
  skullLoaded,
  file,
}: TandenProps) => {
  // const handleClick = useCallback(() => {
  //   setSkullSelect(!skullSelect);
  // }, [setSkullSelect, skullSelect]);
  return (
    <div className="justify-center items-center flex-col flex">
      <div className="flex flex-row justify-center items-center text-xs">
        <Tanden_1x states={states} onSwipe={onSwipe} file={file} />
        <Tanden_2x states={states} onSwipe={onSwipe} file={file} />
      </div>

      <div className="flex flex-row place-content-center text-xs">
        <Tanden_4x states={states} onSwipe={onSwipe} file={file} />
        <Tanden_3x states={states} onSwipe={onSwipe} file={file} />
      </div>

      <div className="flex flex-row">
        <h2>R</h2>

        <div className="items-center place-content-center">
          <Image
            src={require("../textures/relugebit.png")}
            height={150}
            width={150}
            alt="logo"
          />
        </div>
        <h2>L</h2>
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
            onClick={() => setSkullSelect(!skullSelect)}
          />
          <div>SHOW SKULL</div>{" "}
        </div>
      )}
    </div>
  );
};

export default Tanden;

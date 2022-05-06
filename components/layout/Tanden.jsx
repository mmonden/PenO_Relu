import Tanden_1x from "./Tanden_1x";
import Tanden_2x from "./Tanden_2x";
import Tanden_3x from "./Tanden_3x";
import Tanden_4x from "./Tanden_4x";

import Image from "next/image";

import {controls, dictPositions} from "../../components/stlviewer";

import { SVG_STRING_PER_STRUCTURE } from "../textures/AnatomySvgData";
import {
	MANDIBLE,
	MAXILLA,
	AIRWAY,
	LEFT_NERVE,
	RIGHT_NERVE,
	SOFT_TISSUE,
	UPPER_IOS,
	LOWER_IOS,
	SKULL,
	LEFT_MAXILLARY_SINUS,
	RIGHT_MAXILLARY_SINUS
} from '../../util/structuresCBCT';

const onSwipe = (teeth_id) => {
	if (dictPositions[teeth_id] == undefined){
		alert("This tooth is not present");
		return;
	}

	var posx = dictPositions[teeth_id].x;
	var posy = dictPositions[teeth_id].y;
	var posz = dictPositions[teeth_id].z;

	const teethIDS = teeth_id.split("_");
	
	if (teethIDS[1] == "17")
	{
		controls.setLookAt(-49, -0.6, 10.44, posx, posy, posz, true);
	}
	else if (teethIDS[1] == "27")
	{
		controls.setLookAt(51, -0.6, 10.44, posx, posy, posz, true);
	}
	else if (Number(teethIDS[1]) > 28)
	{
		controls.setLookAt(2*posx, 2*posy, 0, posx, posy, posz, true);
	}
	else
	{
		controls.setLookAt(2*posx, 2*posy, 10.44, posx, posy, posz, true);
	};
  };

const Tanden = ( states ) => {
	const Swipe = (teeth_id) => {
		onSwipe(teeth_id);
	};

	return (
		<div className="justify-center items-center flex-col flex">
			<div className="flex flex-row justify-center items-center text-xs">
				<Tanden_1x states={states} onSwipe = {onSwipe}/>
				<Tanden_2x states={states} onSwipe = {onSwipe}/>
			</div>

			<div className="flex flex-row place-content-center text-xs">
				<Tanden_4x states={states} onSwipe = {onSwipe}/>
				<Tanden_3x states={states} onSwipe = {onSwipe}/>
			</div>

			<div className="flex flex-row">
				<button onClick = {() => Swipe("Tooth_17")}> <h2>R</h2> </button>

				<div className="items-center place-content-center">
					<Image src={require("../textures/relugebit.png")} height={150} width={150} />
				</div>
				<button onClick = {() => Swipe("Tooth_27")}> <h2>L</h2> </button>
			</div>

			<div className="flex place-content-center border rounded-full border-2 w-fit text-xs">
				<svg
					className="h-4 w-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
					/>
				</svg>

				<button>DENTAL CHARTING</button>
			</div>
		</div>
	);
};

export default Tanden;

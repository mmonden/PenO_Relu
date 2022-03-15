import Tanden_1x from "./Tanden_1x";
import Tanden_2x from "./Tanden_2x";
import Tanden_3x from "./Tanden_3x";
import Tanden_4x from "./Tanden_4x";

import Image from "next/image";

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

const Tanden = () => {
	return (
		<div className="justify-center items-center flex-col flex">
			<div className="flex flex-row justify-center items-center text-xs">
				<Tanden_1x />
				<Tanden_2x />
			</div>

			<div className="flex flex-row place-content-center text-xs">
				<Tanden_4x />
				<Tanden_3x />
			</div>

			<div className="flex flex-row">
				<h2>R</h2>

				<div className="items-center place-content-center">
					<Image src={require("../textures/relugebit.png")} height={150} width={150} />
				</div>
				<h2>L</h2>
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

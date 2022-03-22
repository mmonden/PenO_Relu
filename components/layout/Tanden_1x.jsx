import { SVG_STRING_PER_STRUCTURE } from "../textures/AnatomySvgData.js"

import {
	TOOTH_11,
	TOOTH_12,
	TOOTH_13,
	TOOTH_14,
	TOOTH_15,
	TOOTH_16,
	TOOTH_17,
	TOOTH_18,
} from '../../util/structuresCBCT';
  
import {
	CROWN_11,
	CROWN_12,
	CROWN_13,
	CROWN_14,
	CROWN_15,
	CROWN_16,
	CROWN_17,
	CROWN_18
} from '../../util/structuresIOS';


const Tanden = () => {
	return (
		<div className="pl-4 pt-2 pb-2">
			<button className="w-5">
				<div className="flex flex-col">
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_18].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_18].path[0]} />
					</svg>
					<p>18</p>
				</div>
			</button>

			<button className="w-5">
				<div className="flex flex-col">
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_17].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_17].path[0]} />
					</svg>
					<p>17</p>
				</div>
			</button>

			<button className="w-5">
				<div className="flex flex-col">
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_16].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_16].path[0]} />
					</svg>
					<p>16</p>
				</div>
			</button>

			<button className="w-5">
				<div className="flex flex-col">
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_15].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_15].path[0]} />
					</svg>
					<p>15</p>
				</div>
			</button>

			<button className="w-5">
				<div className="flex flex-col">
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_14].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_14].path[0]} />
					</svg>
					<p>14</p>
				</div>
			</button>

			<button className="w-5">
				<div className="flex flex-col">
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_13].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_13].path[0]} />
					</svg>
					<p>13</p>
				</div>
			</button>

			<button className="w-5">
				<div className="flex flex-col">
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_12].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_12].path[0]} />
					</svg>
					<p>12</p>
				</div>
			</button>

			<button className="w-5">
				<div className="flex flex-col">
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_11].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_11].path[0]} />
					</svg>
					<p>11</p>
				</div>
			</button>
		</div>
	);
};

export default Tanden;

import { SVG_STRING_PER_STRUCTURE } from "../textures/AnatomySvgData.js"

import {
	TOOTH_41,
	TOOTH_42,
	TOOTH_43,
	TOOTH_44,
	TOOTH_45,
	TOOTH_46,
	TOOTH_47,
	TOOTH_48
} from '../../util/structuresCBCT';
  
import {
	CROWN_41,
	CROWN_42,
	CROWN_43,
	CROWN_44,
	CROWN_45,
	CROWN_46,
	CROWN_47,
	CROWN_48
} from '../../util/structuresIOS';

const Tanden = () => {
	return (
		<div className="pl-4 pb-2 pt-2">
			<button className="w-5">
				<div className="flex flex-col">
					<p>48</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_48].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_48].path[0]} />
					</svg>
				</div>
			</button>

			<button className="w-5">
				<div className="flex flex-col">
					<p>47</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_47].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_47].path[0]} />
					</svg>
				</div>
			</button>

			<button className="w-5">
				<div className="flex flex-col">
					<p>46</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_46].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_46].path[0]} />
					</svg>
				</div>
			</button>

			<button className="w-5">
				<div className="flex flex-col">
					<p>45</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_45].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_45].path[0]} />
					</svg>
				</div>
			</button>

			<button className="w-5">
				<div className="flex flex-col">
					<p>44</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_44].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_44].path[0]} />
					</svg>
				</div>
			</button>

			<button className="w-5">
				<div className="flex flex-col">
					<p>43</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_43].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_43].path[0]} />
					</svg>
				</div>
			</button>

			<button className="w-5">
				<div className="flex flex-col">
					<p>42</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_42].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_42].path[0]} />
					</svg>
				</div>
			</button>

			<button className="w-5">
				<div className="flex flex-col">
					<p>41</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_41].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_41].path[0]} />
					</svg>
				</div>
			</button>
		</div>
	);
};

export default Tanden;

import { SVG_STRING_PER_STRUCTURE } from "../textures/AnatomySvgData.js"

import {
	TOOTH_31,
	TOOTH_32,
	TOOTH_33,
	TOOTH_34,
	TOOTH_35,
	TOOTH_36,
	TOOTH_37,
	TOOTH_38
} from '../../util/structuresCBCT';
import { IFile } from "../../types/index.js";

type TandenProps = {
	states: any;
	onSwipe: Function;
	file: IFile;
  };

const Tanden = ( {states, onSwipe, file} : TandenProps) => {
	const Swipe = (teeth_id) => {
		onSwipe(teeth_id);
	  };

	return (
		<div className="pr-4 pt-2 pb-2">
			<button className="w-5" onClick = {() => Swipe("Tooth_31")}>
				<div className="flex flex-col">
					<p>31</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_31].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_31].path[0]} />
					</svg>
				</div>
			</button>

			<button className="w-5" onClick = {() => Swipe("Tooth_32")}>
				<div className="flex flex-col">
					<p>32</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_32].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_32].path[0]} />
					</svg>
				</div>
			</button>

			<button className="w-5" onClick = {() => Swipe("Tooth_33")}>
				<div className="flex flex-col">
					<p>33</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_33].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_33].path[0]} />
					</svg>
				</div>
			</button>

			<button className="w-5" onClick = {() => Swipe("Tooth_34")}>
				<div className="flex flex-col">
					<p>34</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_34].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_34].path[0]} />
					</svg>
				</div>
			</button>

			<button className="w-5" onClick = {() => Swipe("Tooth_35")}>
				<div className="flex flex-col">
					<p>35</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_35].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_35].path[0]} />
					</svg>
				</div>
			</button>

			<button className="w-5" onClick = {() => Swipe("Tooth_36")}>
				<div className="flex flex-col">
					<p>36</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_36].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_36].path[0]} />
					</svg>
				</div>
			</button>

			<button className="w-5" onClick = {() => Swipe("Tooth_37")}>
				<div className="flex flex-col">
					<p>37</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_37].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_37].path[0]} />
					</svg>
				</div>
			</button>

			<button className="w-5" onClick = {() => Swipe("Tooth_38")}>
				<div className="flex flex-col">
					<p>38</p>
					<svg
						className="h-12 w-5"
						fill="none"
						viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_38].viewbox}
						stroke="currentColor"
					>
						<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_38].path[0]} />
					</svg>
				</div>
			</button>
		</div>
	);
};

export default Tanden;

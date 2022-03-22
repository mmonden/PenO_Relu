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
  
import {
	CROWN_31,
	CROWN_32,
	CROWN_33,
	CROWN_34,
	CROWN_35,
	CROWN_36,
	CROWN_37,
	CROWN_38
} from '../../util/structuresIOS';

const Tanden = () => {
	return (
		<div className="pr-4 pt-2 pb-2">
			<button className="w-5">
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

			<button className="w-5">
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

			<button className="w-5">
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

			<button className="w-5">
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

			<button className="w-5">
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

			<button className="w-5">
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

			<button className="w-5">
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

			<button className="w-5">
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

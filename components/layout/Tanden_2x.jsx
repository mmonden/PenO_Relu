import { SVG_STRING_PER_STRUCTURE } from "../textures/AnatomySvgData.js"

import {
	TOOTH_21,
	TOOTH_22,
	TOOTH_23,
	TOOTH_24,
	TOOTH_25,
	TOOTH_26,
	TOOTH_27,
	TOOTH_28
} from '../../util/structuresCBCT';
  
import {
	CROWN_21,
	CROWN_22,
	CROWN_23,
	CROWN_24,
	CROWN_25,
	CROWN_26,
	CROWN_27,
	CROWN_28
} from '../../util/structuresIOS';
  
const Tanden = () => {
  return (
	<div className="pr-4 pt-2 pb-2">
		<button className="w-5">
			<div className="flex flex-col">
				<svg
					className="h-12 w-5"
					fill="none"
					viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_21].viewbox}
					stroke="currentColor"
				>
					<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_21].path[0]} />
				</svg>
				<p>21</p>
			</div>
		</button>

		<button className="w-5">
			<div className="flex flex-col">
				<svg
					className="h-12 w-5"
					fill="none"
					viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_22].viewbox}
					stroke="currentColor"
				>
					<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_22].path[0]} />
				</svg>
				<p>22</p>
			</div>
		</button>

		<button className="w-5">
			<div className="flex flex-col">
				<svg
					className="h-12 w-5"
					fill="none"
					viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_23].viewbox}
					stroke="currentColor"
				>
					<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_23].path[0]} />
				</svg>
				<p>23</p>
			</div>
		</button>

		<button className="w-5">
			<div className="flex flex-col">
				<svg
					className="h-12 w-5"
					fill="none"
					viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_24].viewbox}
					stroke="currentColor"
				>
					<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_24].path[0]} />
				</svg>
				<p>24</p>
			</div>
		</button>

		<button className="w-5">
			<div className="flex flex-col">
				<svg
					className="h-12 w-5"
					fill="none"
					viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_25].viewbox}
					stroke="currentColor"
				>
					<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_25].path[0]} />
				</svg>
				<p>25</p>
			</div>
		</button>

		<button className="w-5">
			<div className="flex flex-col">
				<svg
					className="h-12 w-5"
					fill="none"
					viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_26].viewbox}
					stroke="currentColor"
				>
					<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_26].path[0]} />
				</svg>
				<p>26</p>
			</div>
		</button>

		<button className="w-5">
			<div className="flex flex-col">
				<svg
					className="h-12 w-5"
					fill="none"
					viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_27].viewbox}
					stroke="currentColor"
				>
					<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_27].path[0]} />
				</svg>
				<p>27</p>
			</div>
		</button>

		<button className="w-5">
			<div className="flex flex-col">
				<svg
					className="h-12 w-5"
					fill="none"
					viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_28].viewbox}
					stroke="currentColor"
				>
					<path className="h-10 w-4" d={SVG_STRING_PER_STRUCTURE[TOOTH_28].path[0]} />
				</svg>
				<p>28</p>
			</div>
		</button>
	</div>
  );
};

export default Tanden;

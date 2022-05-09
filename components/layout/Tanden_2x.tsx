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
		<button className="w-5" onClick = {() => Swipe("Tooth_21")}>
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

		<button className="w-5" onClick = {() => Swipe("Tooth_22")}>
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

		<button className="w-5" onClick = {() => Swipe("Tooth_23")}>
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

		<button className="w-5" onClick = {() => Swipe("Tooth_24")}>
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

		<button className="w-5" onClick = {() => Swipe("Tooth_25")}>
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

		<button className="w-5" onClick = {() => Swipe("Tooth_26")}>
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

		<button className="w-5" onClick = {() => Swipe("Tooth_27")}>
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

		<button className="w-5" onClick = {() => Swipe("Tooth_28")}>
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

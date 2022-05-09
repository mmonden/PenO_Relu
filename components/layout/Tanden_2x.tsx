import { SVG_STRING_PER_STRUCTURE } from "../textures/AnatomySvgData.js";

import {
  TOOTH_21,
  TOOTH_22,
  TOOTH_23,
  TOOTH_24,
  TOOTH_25,
  TOOTH_26,
  TOOTH_27,
  TOOTH_28,
} from "../../util/structuresCBCT";
import { IFile } from "../../types/index.js";

type TandenProps = {
  states: any;
  onSwipe: Function;
  file: IFile;
  selectedTooth: String;
};

const Tanden = ({ states, onSwipe, file, selectedTooth }: TandenProps) => {
  const Swipe = (teeth_id) => {
    onSwipe(teeth_id);
  };

  return (
    <div className="pr-4 pt-2 pb-2">
      <button className="w-5" onClick={() => Swipe("Tooth_21")}>
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_21].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_21" ? 2 : 1}
            color={selectedTooth == "Tooth_21" ? "red" : "black"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_21].path[0]}
            />
          </svg>
          <p>21</p>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_22")}>
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_22].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_22" ? 2 : 1}
            color={selectedTooth == "Tooth_22" ? "red" : "black"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_22].path[0]}
            />
          </svg>
          <p>22</p>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_23")}>
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_23].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_23" ? 2 : 1}
            color={selectedTooth == "Tooth_23" ? "red" : "black"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_23].path[0]}
            />
          </svg>
          <p>23</p>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_24")}>
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_24].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_24" ? 2 : 1}
            color={selectedTooth == "Tooth_24" ? "red" : "black"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_24].path[0]}
            />
          </svg>
          <p>24</p>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_25")}>
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_25].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_25" ? 2 : 1}
            color={selectedTooth == "Tooth_25" ? "red" : "black"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_25].path[0]}
            />
          </svg>
          <p>25</p>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_26")}>
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_26].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_26" ? 2 : 1}
            color={selectedTooth == "Tooth_26" ? "red" : "black"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_26].path[0]}
            />
          </svg>
          <p>26</p>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_27")}>
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_27].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_27" ? 2 : 1}
            color={selectedTooth == "Tooth_27" ? "red" : "black"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_27].path[0]}
            />
          </svg>
          <p>27</p>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_28")}>
        <div className="flex flex-col">
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_28].viewbox}
            stroke="currentColor"
            strokeWidth={selectedTooth == "Tooth_28" ? 2 : 1}
            color={selectedTooth == "Tooth_28" ? "red" : "black"}
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_28].path[0]}
            />
          </svg>
          <p>28</p>
        </div>
      </button>
    </div>
  );
};

export default Tanden;

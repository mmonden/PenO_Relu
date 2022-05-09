import { SVG_STRING_PER_STRUCTURE } from "../textures/AnatomySvgData.js";

import {
  TOOTH_41,
  TOOTH_42,
  TOOTH_43,
  TOOTH_44,
  TOOTH_45,
  TOOTH_46,
  TOOTH_47,
  TOOTH_48,
} from "../../util/structuresCBCT";
import { IFile } from "../../types/index.js";

type TandenProps = {
  states: any;
  onSwipe: Function;
  file: IFile;
};

const Tanden = ({ states, onSwipe, file }: TandenProps) => {
  const Swipe = (teeth_id) => {
    onSwipe(teeth_id);
  };
  return (
    <div className="pl-4 pb-2 pt-2">
      <button className="w-5" onClick={() => Swipe("Tooth_48")}>
        <div className="flex flex-col">
          <p>48</p>
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_48].viewbox}
            stroke="currentColor"
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_48].path[0]}
            />
          </svg>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_47")}>
        <div className="flex flex-col">
          <p>47</p>
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_47].viewbox}
            stroke="currentColor"
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_47].path[0]}
            />
          </svg>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_46")}>
        <div className="flex flex-col">
          <p>46</p>
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_46].viewbox}
            stroke="currentColor"
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_46].path[0]}
            />
          </svg>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_45")}>
        <div className="flex flex-col">
          <p>45</p>
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_45].viewbox}
            stroke="currentColor"
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_45].path[0]}
            />
          </svg>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_44")}>
        <div className="flex flex-col">
          <p>44</p>
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_44].viewbox}
            stroke="currentColor"
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_44].path[0]}
            />
          </svg>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_43")}>
        <div className="flex flex-col">
          <p>43</p>
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_43].viewbox}
            stroke="currentColor"
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_43].path[0]}
            />
          </svg>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_42")}>
        <div className="flex flex-col">
          <p>42</p>
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_42].viewbox}
            stroke="currentColor"
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_42].path[0]}
            />
          </svg>
        </div>
      </button>

      <button className="w-5" onClick={() => Swipe("Tooth_41")}>
        <div className="flex flex-col">
          <p>41</p>
          <svg
            className="h-12 w-5"
            fill="none"
            viewBox={SVG_STRING_PER_STRUCTURE[TOOTH_41].viewbox}
            stroke="currentColor"
          >
            <path
              className="h-10 w-4"
              d={SVG_STRING_PER_STRUCTURE[TOOTH_41].path[0]}
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default Tanden;

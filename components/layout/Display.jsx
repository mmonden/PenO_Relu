import DisplayButtons from "./DisplayButtons.jsx";

import Image from "next/image";

const Display = () => {
	return (
		<div className="flex flex-col">
			<div className="flex flex-row items-center text-2xl">
				<div className="px-1">
					<Image src={require("../textures/squares.png")} width={20} height={20}/>
				</div>

				Display
			</div>

			<DisplayButtons />
		</div>
	);
};

export default Display;

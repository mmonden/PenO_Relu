import DisplayButtons from "./DisplayButtons.jsx";

import Image from "next/image";

const Display = () => {
	return (
		<div className="flex flex-col">
			<div className="flex flex-row">
				<div className="pr-1">
					<Image src={require("../textures/squares.png")} height={17} width={17}  />
				</div>

				<h1>Display</h1>
			</div>

			<DisplayButtons />
		</div>
	);
};

export default Display;

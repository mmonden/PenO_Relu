import Image from "next/image";

const DisplayButtons = () => {
	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-row pb-3">
				<div className="pr-2">
					<button className="flex flex-row border rounded border-2 w-fit text-xs">
						<p>Full 3D View</p>
					</button>
				</div>

				<button className="flex flex-row border rounded border-2 w-fit text-xs">
					<p>Ortho Slices</p>
				</button>
			</div>

			<div className="flex flex-row">
				<div className="px-1">
					<button className="rounded w-fit text-xs">
						<Image className="w-fit" src={require("../textures/full.png")} alt="full"/>
					</button>
				</div>

				<div className="px-1">
					<button className="rounded w-fit text-xs">
						<Image className="w-fit" src={require("../textures/doorsnede_horizontaal.png")} alt="ds_hz"/>
					</button>
				</div>

				<div className="px-1">
					<button className="rounded w-fit text-xs">
						<Image className="w-fit" src={require("../textures/doorsnede_verticaal.png")} alt="ds_v1"/>
					</button>
				</div>

				<div className="px-1">
					<button className="rounded w-fit text-xs">
						<Image className="w-fit" src={require("../textures/doorsnede_verticaal_2.png")} alt="ds_v2"/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default DisplayButtons;

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
					<button className="border rounded border-2 w-fit text-xs">
						<img className="h-12 w-12" src="./textures/full.png"/>
					</button>
				</div>

				<div className="px-1">
					<button className="border rounded border-2 w-fit text-xs">
						<img className="h-12 w-12" src="./textures/doorsnede_horizontaal.png"/>
					</button>
				</div>

				<div className="px-1">
					<button className="border rounded border-2 w-fit text-xs">
						<img className="h-12 w-12" src="./textures/doorsnede_verticaal.png"/>
					</button>
				</div>

				<div className="px-1">
					<button className="border rounded border-2 w-fit text-xs">
						<img className="h-12 w-12" src="./textures/doorsnede_verticaal_2.png"/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default DisplayButtons;

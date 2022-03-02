import Tanden_1x from './Tanden_1x'
import Tanden_2x from './Tanden_2x'
import Tanden_3x from './Tanden_3x'
import Tanden_4x from './Tanden_4x'

const Tanden = () => 
{
	return (
		<div className="justify-center items-center flex-col flex">
			<div className="flex flex-row justify-center items-center text-xs">
				<Tanden_1x />
				<Tanden_2x />
			</div>

			<div className="flex flex-row place-content-center text-xs">
				<Tanden_4x />
				<Tanden_3x />
			</div>

			<div className="flex place-content-center">
				<h2>R</h2>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
					</svg>
				<h2>L</h2>
			</div>

			<div className="flex place-content-center border rounded-full border-2 w-fit text-xs">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
				</svg>

				<button>
					DENTAL CHARTING
				</button>
			</div>
		</div>
	);
}

export default Tanden;
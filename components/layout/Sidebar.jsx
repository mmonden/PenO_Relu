import Back from './Back'
import Anatomy from './Anatomy';
import Display from './Display';

const Sidebar = () =>
{
	return(
		<div className="min-w-screen min-h-screen flex justify-end">
			<div className="w-1/5 divide-y-2 divide-gray-400">
				<div className="bg-gray-400">
					<button> <Back /> </button>
				</div>

				<div className="h-1/2 bg-gray-100"> 
					<Anatomy />
				</div>

				<div className="bg-gray-100 min-h-screen">
					<Display />
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
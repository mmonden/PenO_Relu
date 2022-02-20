import styles from '../../styles/Home.module.css';
import Tanden from './Tanden.jsx'

/**grid from: https://css-tricks.com/snippets/css/complete-guide-grid/ */

function SidebarOption({ text }) 
{
	return (
		<div>
			<h1>{text}</h1>
		</div>
	);
}

const Sidebar = () =>
{
	return(
		<div id="sidebar" className={styles.Sidebar}>
			<main id="line" className={styles.Sidebar_Back}>
				<button>
					<img id="icon" src="https://w7.pngwing.com/pngs/748/184/png-transparent-computer-icons-arrow-arrow-angle-triangle-human-back-thumbnail.png" className={styles.BackIcon}/>
				</button>
			</main>

			<main id="anatomy" className={styles.Sidebar_Anatomy}>
				<SidebarOption text="Anatomy Selector"/>
				<Tanden />
			</main>

			<main id="line" className={styles.Sidebar_Line}/>

			<main id="display" className={styles.Sidebar_Display}>
				<SidebarOption text="Display"/>
			</main>
		</div>
	);
}

export default Sidebar;
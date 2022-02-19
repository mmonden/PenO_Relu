import styles from '../../styles/Home.module.css';

const Tanden = () => 
{
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<p className={styles.description}>
					Edit <code>src/tanden.jsx</code> and save to reload.
				</p>
				<a
					className={styles.card}
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</main>
		</div>
	);
}

export default Tanden;
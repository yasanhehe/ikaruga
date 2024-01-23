// Import ranking component if its done
import Ranking from '@components/home/ranking/Ranking';

const Home = () => {
	return (
		<div className="flex flex-col w-full pb-20">
			<span className="mt-10 font-bold md:ml-[280px] text-3xl">Ranking</span>
			<Ranking />
		</div>
	)
}

export default Home;

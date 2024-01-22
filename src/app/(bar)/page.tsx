// Import ranking component if its done
import Ranking from '@components/home/ranking/Ranking';

const Home = () => {
	return (
		<div className="flex flex-col pt-4 mx-4 md:ml-[280px] pb-0 min-h-screen">
			<span className="px-8 mt-10 font-bold text-3xl">Ranking</span>
            <Ranking />
		</div>
	)
}

export default Home;

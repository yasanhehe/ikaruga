import BookReview from "@components/read-share/book-review";
import reviewsData from "@data/review_test.json";

const ReadShare = () => {
	return (
		/*<div className="flex flex-col pt-4 sm:ml-[120px] md:ml-[250px] sm:border-r sm:border-zinc-700 pb-20 min-h-screen">*/
		<div className="flex flex-col pt-4 ml-4 sm:ml-[120px] md:ml-[280px] border-r pb-0 min-h-screen">
			<span className="px-8 mt-10 font-bold text-3xl">ReadShare</span>
			<div className="w-full">
				{reviewsData.map((review, index) => (
					<BookReview key={index} book={review} />
				))}
			</div>
		</div>
	)
}

export default ReadShare;

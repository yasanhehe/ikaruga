'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const CreatePostPage =  () => {
	const [title, setTitle] = React.useState('');
	const [author, setAuthor] = React.useState('');
	const [isbn, setIsbn] = React.useState('');
	const [essay, setEssay] = React.useState('');
	const [isConfirmed, setIsConfirmed] = React.useState(false);
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [titleLength, setTitleLength] = React.useState(0);
	const [essayLength, setEssayLength] = React.useState(0);
	const router = useRouter();
	const maxTitleLength = 50;
	const maxAuthorLength = 50;
	const maxIsbnLength = 13;
	const maxEssayLength = 1000;

	const handleOnSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		if (process.env.NEXT_PUBLIC_POSTGRES_ENABLE === "false") {
			console.warn('postgres is disabled....');
			router.push('/');
			return ;
		}
		if (isSubmitting) return;
		try {
			let ret = await fetch('/api', {
				method: "POST",
				body: JSON.stringify({
					title,
					author,
					isbn,
					essay,
				}),
			});
			console.warn(ret);
			router.push('/');
		} catch (err) {
			console.error(err);
			router.push('/');
		}
	};

	const handleOnChangeTitle = (
		ev: React.ChangeEvent<HTMLInputElement>
	) => {
		ev.preventDefault();
		setTitle(ev.target.value);
		setTitleLength(ev.target.value.length);
	};

	const handleOnChangeAuthor = (
		ev: React.ChangeEvent<HTMLInputElement>
	) => {
		ev.preventDefault();
		setAuthor(ev.target.value);
	}

	const handleOnChangeIsbn = (
		ev: React.ChangeEvent<HTMLInputElement>
	) => {
		ev.preventDefault();
		setIsbn(ev.target.value);
	};

	const handleOnChangeEssay = (
		ev: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		ev.preventDefault();
		//if (ev.target.value.length > maxEssayLength) return;
		setEssay(ev.target.value);
		setEssayLength(ev.target.value.length);
	};

	const handleConfirmationToggle = () => {
		setIsConfirmed(!isConfirmed);
	};

return (
	<div className="flex flex-col pt-4 ml-4 md:ml-[280px] pb-0 min-h-screen">
		<span className="px-8 mt-10 font-bold text-3xl">Shohyo</span>
		<form onSubmit={handleOnSubmit} className="px-8 py-6 w-full">
			<div className="mb-6">
				<label htmlFor="title" className="block text-2xl font-bold text-gray-700 mb-2">タイトル</label>
				<input
					type="text"
					id="title"
					value={title}
					maxLength={maxTitleLength}
					onChange={handleOnChangeTitle}
					className="w-full h-12 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border shadow"
				/>
			</div>
			<div className="mb-6">
				<label htmlFor="author" className="block text-2xl font-bold text-gray-700 mb-2">著者</label>
				<input
					type="text"
					id="author"
					value={author}
					maxLength={maxAuthorLength}
					onChange={handleOnChangeAuthor}
					className="w-full h-12 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border shadow"
				/>
			</div>
			<div className="mb-6">
				<label htmlFor="isbn" className="block text-2xl font-bold text-gray-700 mb-2">ISBN</label>
				<input
					type="text"
					id="isbn"
					value={isbn}
					maxLength={maxIsbnLength}
					onKeyPress={(e) => {if(e.key.match(/[^0-9]/)) e.preventDefault();}}
					onChange={handleOnChangeIsbn}
					className="w-full h-12 px-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border shadow"
				/>
			</div>
			<div className="mb-6">
				<label htmlFor="essay" className="block text-2xl font-bold text-gray-700 mb-2">書評</label>
				<textarea
					id="essay"
					value={essay}
					maxLength={maxEssayLength}
					onChange={handleOnChangeEssay}
					className="w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border shadow"
				/>
				<p className="text-sm text-gray-500">{essayLength}/{maxEssayLength}</p>
			</div>
			<div className="mb-6">
				<label className="flex items-center">
					<input
						type="checkbox"
						checked={isConfirmed}
						disabled={essayLength === 0 || titleLength === 0}
						onChange={handleConfirmationToggle}
						className="form-checkbox h-6 w-6 text-indigo-600 rounded-md border-gray-300 focus:ring-indigo-500"
					/>
					<span className="ml-2 text-xl text-gray-700">投稿を確認する</span>
				</label>
			</div>
			<button
				type="submit"
				disabled={!isConfirmed || isSubmitting}
				className={`w-full py-4 rounded-md text-white text-xl mb-20 ${isConfirmed || !isSubmitting ? 'bg-indigo-500 hover:bg-indigo-600 shadow' : 'bg-gray-300 cursor-not-allowed'}`}
			>
				{isConfirmed ? '投稿する' : '確認が必要です'}
			</button>
		</form>
	</div>
);


}

export default CreatePostPage;

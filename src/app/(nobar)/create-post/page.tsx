import React from 'react';
import { useRouter } from 'next/router';

const CreatePostPage =  () => {
	const [title, setTitle] = React.useState('');
	const [isbn, setIsbn] = React.useState('');
	const [essay, setEssay] = React.useState('');
	const [isConfirmed, setIsConfirmed] = React.useState(false);
	const router = useRouter();

	const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		// デフォルトのイベントを防ぐ。
		e.preventDefault();
		await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/createPost`, {
			//hogehoge
		});
		router.push('/');
	};

	const handleOnChangeTitle = (
		ev: React.ChangeEvent<HTMLInputElement>
	) => {
		setTitle(ev.target.value);
	};

	const handleOnChangeIsbn = (
		ev: React.ChangeEvent<HTMLInputElement>
	) => {
		setIsbn(ev.target.value);
	}

	const handleOnChangeEssay = (
		ev: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setEssay(ev.target.value);
	}

	const handleConfirmationToggle = () => {
		setIsConfirmed(!isConfirmed);
	}

	return (
		<div>
			<form onSubmit={handleOnSubmit}>
				<div>
					<label htmlFor="title">タイトル</label>
					<input
						type="text"
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="isbn">ISBN</label>
					<input
						type="text"
						id="isbn"
						value={isbn}
						onChange={(e) => setIsbn(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="essay">エッセイ</label>
					<textarea
						id="essay"
						value={essay}
						onChange={(e) => setEssay(e.target.value)}
					/>
				</div>
				<div>
					<label>
						<input
							type="checkbox"
							checked={isConfirmed}
							onChange={handleConfirmationToggle}
							/>
							投稿を確認する
					</label>
				</div>
				<button type="submit" disabled={!isConfirmed}>
					{isConfirmed ? '投稿する' : '確認が必要です'}
				</button>
			</form>
		</div>
	);
}

export default CreatePostPage;

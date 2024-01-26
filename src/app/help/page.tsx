'use client';

import React from 'react';
import { useState, useEffect } from "react";
import BookReview from "@components/read-share/book-review";
import review_test from "@data/review_test.json";
import Image from 'next/image';
import Help from "@components/help/help";

import './styles.scss';

// stylesheet作成のメモ
// frame
// 	title
// 	what is this project
// 	how to use
// 	what is Ikaruga
const HelpPage = () => {
	return (
		<div className="flex flex-col pt-4 ml-4 md:ml-[280px] pb-0 min-h-screen mb-20">
			<div className="flex flex-row">
				<div className="flex flex-row">
					<Image src="/ikaruga.svg" alt="Home" width="150" height="150" />
					<div className="flex flex-col">
						<span className="text-6xl mt-10 font-bold text-black">Help</span>
						<span className="text-xl mt-2 font-bold text-black">いかるがのつかいかた</span>
					</div>
				</div>
			</div>
			<span className="mx-10 text-2xl mt-10 font-bold text-black">いかるがってなに？</span>
			<span className="mx-11 text-xl mt-5 text-black">
				産技高専付属図書館は、幅広いジャンルの豊富な蔵書を誇るが、その利益を享受するのは一部の特殊階級に属する学生に限られる現状がある。
				<br />
				いかるがは、全学生の共有財産たる図書館を、知を独占する搾取階級から開放せしめると共に、
				同志学生諸君に図書館の利益を平等に享受する機会を与えんとする、特殊階級によるアプリケーションである。
			</span>
			<span className="mx-10 text-2xl mt-10 font-bold text-black">利用方法</span>

			<div className="px-4 md:px-8 justify-center w-full px-4">
				<Help help={{
					title: 'Ranking',
					description: '過去3ヶ月に借りられた本のジャンルでランキングを作成している。プルダウンをクリックすると、各ジャンルの最新10件が表示されるようになっている。ランキングの1位2位3位はそれぞれの数字を名前に持つ鳥の名前になっているそれぞれ、一紅鳥、二帯千鳥、三光鳥。',
					link: '/ranking'}} />

				<Help help={{
					title: 'ReadShare',
					description: '書評画面で投稿された書評を読むことができる画面である。上部の検索バーで本の題名で検索することが可能です。タイムライン形式となっており、したまでスクロールすることで次のページへ遷移可能。',
					link: '/read-share'}} />

				<Help help={{
					title: 'Shohyo',
					description: '書評を投稿することができる。',
					link: '/create-post'}} />

				<Help help={{
					title: 'Scan',
					description: '本のISBNの番号コードを読み取ると下のボックスにISBNが入力される。検索ボタンを押すことで学校の図書館で検索することができる。',
					link: '/scan'}} />
			</div>

			<span className="mx-10 text-2xl mt-10 font-bold text-black">いかるが?</span>
			<div className="flex flex-col">
				<div className="mx-11 mt-5">
				<Image src="/real_ikaruga.jpg" alt="斑鳩" width="300" height="300" />
				</div>
			</div>
		</div>
	)
}

export default HelpPage;

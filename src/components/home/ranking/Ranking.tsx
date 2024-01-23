"use client";

import React, { useState, useEffect } from 'react';
import '@styles/Ajax.css';
import rankingData from '@data/ranking.json';
import Image from 'next/image';

const images = ['/ikkocho2.svg', '/futaobichidori2.svg', '/sankocho2.svg'];
const details = ['一紅鳥: イッコウチョウ', '二帯千鳥: フタオビチドリ', '三光鳥: サンコウチョウ'];

interface Item {
  '資料情報': string;
  '請求記号': string;
  'url'     : string;
}

const Ranking: React.FC = () => {
  const [showData, setShowData] = useState<{ [key: string]: boolean }>({});
  const [parsedRankingData, setParsedRankingData] = useState<{ [key: string]: Item[] }>({});

  useEffect(() => {
    const initialShowData: { [key: string]: boolean } = {};
    const parsedData: { [key: string]: Item[] } = {};

    Object.keys(rankingData).forEach((genre: string) => {
      initialShowData[genre] = false;
      parsedData[genre] = JSON.parse(rankingData[genre as keyof typeof rankingData]);
    });

    setShowData(initialShowData);
    setParsedRankingData(parsedData);
  }, []);

  const handleToggleData = (genre: string) => {
    setShowData((prevShowData) => ({
      ...prevShowData,
      [genre]: !prevShowData[genre],
    }));
  };

return (
    //<div className="flex flex-col w-full">
	<div className="flex flex-col pt-4 ml-4 md:ml-[280px] pb-0 min-h-screen">
      {Object.entries(parsedRankingData).map(([genre, data]: [string, Item[]], index: number) => {

        return (
          <div key={index} className="my-4 w-full">
            <div className="flex items-center">
              <button
                onClick={() => handleToggleData(genre)}
                className="w-full md:w-3/4 lg:w-1/3 text-black font-semibold bg-white rounded-xl py-2 px-4 shadow mx-4"
                style={{ fontSize: index < 3 ? '150%' : '100%' }}
              >
                <span>
                  {index < 3 ? (
                    <div className="flex items-center">
                      <Image
                        src={images[index]}
                        title={details[index]}
                        alt={`Image for ${genre}`}
                        width={50}
                        height={50}
                        className="ml-2"
                        placeholder="empty"
                      />
                      <span className="ml-2 flex-grow text-center">{genre}</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="ml-2 text-lg ">&nbsp;&nbsp;&nbsp;{index + 1}</span>
                      <span className="ml-2 flex-grow text-center">{genre}</span>
                    </div>
                  )}
                </span>
              </button>
            </div>

            {showData[genre] && (
              <div className="mt-2 mx-4 rounded-md shadow-md p-4 w-full">
                <p>最新10件</p>
                {data.map((item: Item, idx: number) => (
                  <div key={idx} className="shadow-md mb-2 p-4">
                    <a href={item['url']} target="_blank" className="text-blue-500 font-semibold">
                      {item['資料情報']}
                    </a>
                    <p className="mt-1">請求記号: {item['請求記号']}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Ranking;

"use client";

import React, { useState, useEffect } from 'react';
import '@styles/Ajax.css';
import rankingData from '@data/ranking.json';
import Image from 'next/image';


const images = ['/image/tp-gold-ikaruga.png', '/image/tp-silver-ikaruga.png', '/image/tp-bronze-ikaruga.png'];

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
    <div className="p-4">
      {Object.entries(parsedRankingData).map(([genre, data]: [string, Item[]], index: number) => {

        return (
          <div key={index} className="mb-4">
            <div className="flex items-center">
              <button
                onClick={() => handleToggleData(genre)}
                className="bg-white text=black text-l font-semibold py-2 px-4 rounded shadow hover:bg-gray-100 focus:outline-none focus:shadow-outline border border-gray"
                style={{ width: '400px', fontSize: index < 3 ? '150%' : '100%' }}
              >
                <span>
                  {index < 3 ? (
                    <div className="flex items-center">
                      <Image
                        src={images[index]}
                        alt={`Image for ${genre}`}
                        width={30}
                        height={30}
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
              <div className="mt-2 border border-gray-200 p-4">
                <p>最新10件</p>
                {data.map((item: Item, idx: number) => (
                  <div key={idx} className="data-container mb-2">
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

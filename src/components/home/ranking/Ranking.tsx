"use client";

import React, { useState, useEffect } from 'react';
import '@styles/Ajax.css';
import rankingData from '@data/ranking.json';

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
    <div>
      <div>
        {Object.entries(parsedRankingData).map(([genre, data]: [string, Item[]], index: number) => (
          <div key={index}>
            <button onClick={() => handleToggleData(genre)}>
              {index + 1} {genre}
            </button>
            {showData[genre] && (
              <div>
                {data.map((item: Item, idx: number) => (
                  <div key={idx} className="data-container">
                  <a href={item['url']}  target="_blank">資料情報: {item['資料情報']}</a>
                    <p>請求記号: {item['請求記号']}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;

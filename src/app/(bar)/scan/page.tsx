"use client";
import { useState } from 'react'
import { Scanner } from '@components/Scanner'
const Scan = () => {
  const [codes, setCodes] = useState<string[]>([])
    const handleGoogleSearch = (code: string) => {
    const searchQuery = encodeURIComponent(code);
	const searchUrl = `https://opac.std.cloud.iliswave.jp/iwjs0020opc/ctlsrh.do?srhclm1=isbn&valclm1=${searchQuery}`
    window.location.href = searchUrl;
  };
  return (
    <div className="flex flex-col pt-4 ml-4 sm:ml-[120px] md:ml-[280px] pb-0 min-h-screen">
      <span className="px-8 mt-10 font-bold text-3xl">Scan</span>
      <div className="mt-8 mx-auto w-full max-w-md border border-gray-300 rounded-md overflow-hidden">
        <div style={{ width: '100%'}}> {/* カメラ画面のアスペクト比を保つ */}
          <Scanner
            onReadCode={(result) => setCodes((codes) => Array.from(new Set([...codes, result.getText()])))}
          />
        </div>
      </div>
      <textarea value={codes.join('\n')} className="mt-4 p-4 border border-gray-300 rounded" />
      <button
        onClick={() => handleGoogleSearch(codes.join())}
        disabled={codes.length === 0}
        className={`my-4 w-full py-4 rounded-md text-white text-xl ${codes.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        図書館のページに飛ぶ
      </button>
    </div>
  );


}

export default Scan;

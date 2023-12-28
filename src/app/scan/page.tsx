"use client";
import { useState } from 'react'
import { Scanner } from '../../components/Scanner'
const Scan = () => {
  const [codes, setCodes] = useState<string[]>([])
    const handleGoogleSearch = (code) => {
    const searchQuery = encodeURIComponent(code);
    const searchUrl = `https://lib.aiit.ac.jp/index.php?action=pages_view_main&active_action=v3search_view_main_init&block_id=296&tab_num=0&op_param=words%3D${searchQuery}%26srhRevTagFlg%3D#v3search_view_main_init`;
    window.location.href = searchUrl;
  };
	return (
		/*<div className="flex flex-col pt-4 sm:ml-[120px] md:ml-[250px] sm:border-r sm:border-zinc-700 pb-20 min-h-screen">*/
		<div className="flex flex-col pt-4 sm:ml-[120px] md:ml-[250px] sm:border-r pb-20 min-h-screen w-full">
			<span className="px-8 mt-10 font-bold text-3xl">Scan</span>
      <Scanner
        onReadCode={(result) => setCodes((codes) => Array.from(new Set([...codes, result.getText()])))}
         />
      <textarea value={codes.join('\n')} />
      <button onClick={() => handleGoogleSearch(codes.join())} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded w-[20%] ml-20">
      図書館のページに飛ぶ
      </button>
		</div>
	)
}

export default Scan;

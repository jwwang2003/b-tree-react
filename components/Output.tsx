import { Dispatch, SetStateAction } from "react";

interface OutputInterface {
  setMode: Dispatch<SetStateAction<number>>;
  toggleRefresh: () => void;
  mode: number;
  log: string[][];
}

export default function Output({ setMode, mode, toggleRefresh, log }: OutputInterface) {
  /**
   * mode - shows which mode is currently being display on screen
   * 0 = preorder
   * 1 = inorder
   * 2 = postorder
   * 3 = tree
   * 4 = result output
   */

  const handleDownloadTXT = () => {
    const enc = new TextEncoder();
    let str = "";
    for(const line of log[mode]) {
      str += line + '\n';
    }
    const encoded = enc.encode(str);
    const blob = new Blob([encoded.buffer], { type: "text/plain;charset=UTF-8" });
    const url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "output.TXT";
    a.click();
    // window.open(url, '_blank');
    // download(blob, "output.txt");
  }

  function download(blob: Blob, filename: string){
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }

  return (<>
    <div className="flex flex-row">
      <div className={`flex flex-row w-fit h-fit mb-4 border border-gray-200 rounded-lg overflow-hidden divide-x`}>
        <button
          onClick={() => setMode(0)}
          className={`hover:bg-gray-200 text-gray-800 py-2 px-4 transition-colors ${mode == 0 ? "bg-emerald-500 text-white hover:text-black" : "bg-white"}`}
        >
          Preorder
        </button>
        <button
          onClick={() => setMode(1)}
          className={`hover:bg-gray-200 text-gray-800 py-2 px-4 transition-colors  ${mode == 1 ? "bg-emerald-500 text-white hover:text-black" : "bg-white"}`}
        >
          Inorder
        </button>
        <button
          onClick={() => setMode(2)}
          className={` hover:bg-gray-200 text-gray-800 py-2 px-4 transition-colors  ${mode == 2 ? "bg-emerald-500 text-white hover:text-black" : "bg-white"}`}
        >
          Postorder
        </button>
        <button
          onClick={() => setMode(3)}
          className={`hover:bg-gray-200 text-gray-800 py-2 px-4 transition-colors  ${mode == 3 ? "bg-emerald-500 text-white hover:text-black" : "bg-white"}`}
        >
          Tree
        </button>
        <button
          onClick={() => setMode(4)}
          className={` hover:bg-gray-200 text-gray-800 py-2 px-4 transition-colors  ${mode == 4 ? "bg-emerald-500 text-white hover:text-black" : "bg-white"}`}
        >
          Results
        </button>
      </div>
      <div className={`flex flex-row w-fit h-fit mb-4 border border-gray-200 rounded-lg overflow-hidden divide-x ml-auto`}>
          <button
            onClick={handleDownloadTXT}
            className={`bg-white hover:bg-gray-200 text-gray-800 py-2 px-4`}
          >
            Save .TXT
          </button>
          <button
            onClick={toggleRefresh}
            className={`bg-white hover:bg-gray-200 text-gray-800 py-2 px-4`}
          >
            Refresh
          </button>
      </div>
    </div>
    <div style={{ overflow: 'scroll' }}>
      {
        log[mode].map(line =>
          <p style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }} >{line}</p>
        )
      }
    </div>
  </>)
}
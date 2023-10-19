"use client";

import { useState, useRef, useEffect } from "react";
import TreeSelect from "@/components/TreeSelect";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import TreeGraph from "@/components/TreeGraph";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import TextInput from "@/components/TextInput";
import BigButton from "@/components/BigButton";
import Divider from "@/compoennts/Divider";
import { BilingualDictionary } from "@/implementation/bilingualDictionary";
import { RedBlackTree, TranslateNode, TreeNode, TreeNodeInterface} from '../implementation/redBlackTree';

export default function Home() {
  const [current, setCurrent] = useState("");
  const [dictionary, setDictionary] = useState<BilingualDictionary>(new BilingualDictionary);

  const [test, setTest] = useState<TreeNodeInterface>({
    key: { word: 'test', translated: '测试' },
    children: [
      {
        key: { word: 'another test', translated: '另一个测试' },
        children: [],
        color: 0
      },
      {
        key: { word: 'another test', translated: '另一个测试' },
        children: [],
        color: 0
      }
    ],
    color: 0
  })

  const inputOpenFileRef = useRef<any>();

  useEffect(() => {
    setDictionary(new BilingualDictionary);
  }, [])

  const showOpenFileDlg = () => {
    inputOpenFileRef.current!.click();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    console.log(file);

    var reader = new FileReader();
    reader.onload = function(progressEvent) {
      // Entire file
      const text = this.result;

      // By lines
      var lines = text!.toString().split('\r\n');
      for (var line = 0; line < lines.length; line++) {
        let words = lines[line].split(' ');
        console.log(words[0], words[1]);
        dictionary!.addTranslation(words[0], words[1]);
      }

      console.log(dictionary!.search('crossword'));
    };

    reader.readAsText(file);
  };

  return (
    <>
      <main className="relative w-screen flex min-h-screen flex-col items-center justify-center p-24 space-y-4">
        {/* Main Component */}
        <Container title="Chinese - English Dictionary">
          <div className="flex w-full">
            <section className="p-2 w-full space-y-4">
              <input
                ref={inputOpenFileRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <BigButton
                onClick={showOpenFileDlg}
                placeHolder="Import"
                description="Import data from a text file"
              />
              <Divider />

              <div className="flex w-full flex-col items-center p-4 space-y-4">
                <TextInput placeHolder="English" />
                <TextInput placeHolder="Chinese" />
              </div>

              <div className="flex w-full justify-center">
                <div className="flex-row w-fit border border-gray-200 rounded-lg overflow-hidden divide-x">
                  <button className="bg-white hover:bg-gray-200 text-gray-800 py-2 px-4">
                    Add
                  </button>
                  <button className="bg-white hover:bg-gray-200 text-gray-800 py-2 px-4">
                    Delete
                  </button>
                </div>
              </div>
            </section>

            <section className="p-2 w-full">
              <div className="flex flex-col space-y-4">
                <TreeSelect currentState={current} setState={setCurrent} />

                <Divider />

                <TextInput placeHolder="Translate" />
                <BigButton placeHolder="Translate" />

                <Divider />

                <TextInput placeHolder="Search from" />
                <TextInput placeHolder="To" />
                <BigButton placeHolder="Search" />
              </div>
            </section>
          </div>
        </Container>

        {/* Search Results Output */}
        <Container title={"Output"}>{/* <textarea></textarea> */}</Container>

        {/* Tree Graph Component */}
        <Container fullWidth={true} extendedHeight={true}>
          <ParentSize>
            {({ width, height }) => <TreeGraph width={width} height={height} root={dictionary.enToCnTree.root} />}
          </ParentSize>
        </Container>
      </main>

      <Footer />
    </>
  );
}

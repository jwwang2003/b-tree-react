"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import TreeSelect from "@/components/TreeSelect";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import TextInput from "@/components/TextInput";
import BigButton from "@/components/BigButton";
import Divider from "@/compoennts/Divider";
import toast, { Toaster } from "react-hot-toast";
import { BilingualDictionary } from "@/implementation/bilingualDictionary";
import { BTreeBilingualDictionary } from "@/implementation/bTreeBilingualDictionary";
import Output from "@/components/Output";

export default function Home() {
  const [outputMode, setOutputMode] = useState(0);
  // const [dictChanged, setDictChanged] = useState<boolean[]>([]);
  const [outputLog, setOutputLog] = useState<string[][]>([[], [], [], [], []]);

  const [current, setCurrent] = useState("");
  const [translate, setTranslate] = useState("");
  const [dictionary, setDictionary] = useState<BilingualDictionary>(
    new BilingualDictionary()
  );
  const [bDictionary, setBDictionary] = useState(new BTreeBilingualDictionary());

  const inputExternalFileRef = useRef<any>();
  const inputExternalBatchFileRef = useRef<any>();
  const inputSerachRef = useRef<any>();
  const inputRangeSearchRef = useRef<any>();

  const [submitType, setSubmitType] = useState("");

  const helperSerach = (translate: string) => {
    const start = performance.now();
    let translated;
    if(current == "Red Black Tree") {
      translated = dictionary.search(translate);
    } else {
      translated = bDictionary.search(translate);
    }
    const end = performance.now();
    console.log(`Execution time: ${end - start} ms`);

    if (translated === undefined || translated === null) {
      toast.error("Word not found");
      return undefined;
    } else {
      
      let A, B;
      if(current == "Red Black Tree") {
        A = translated.key.word;
        B = translated.key.translated;
      } else {
        A = translated[0];
        B = translated[1];
      }

      toast.success("Word found");
      outputLog[4].push(A + " →  " + B);
      return translated;
    }
  }

  const handleSearch = (e: FormEvent<HTMLFormElement> | undefined) => {
    if (e != undefined) e.preventDefault();

    if (translate == "") {
      toast.error("Translate cannot be empty");
      return;
    }

    let translated = helperSerach(translate);

    if(translated) {
      let A, B;
      if(current == "Red Black Tree") {
        A = translated.key.word;
        B = translated.key.translated;
      } else {
        A = translated[0];
        B = translated[1];
      }
      setTranslate(A + " →  " + B);
    }
  };

  const handleRangeSearch = (e: FormEvent<HTMLFormElement> | undefined) => {
    if (e != undefined) e.preventDefault();
    else return;

    const target = e.target as typeof e.target & {
      start: { value: string };
      end: { value: string };
    };

    const startKey = target.start.value;
    const endKey = target.end.value;

    if (startKey == "" || endKey == "") {
      toast.error("One (or more) of the input(s) is empty");
      return;
    }

    console.log("-=-=-=-=-=-=-ENTERED RANGE SEARCH-=-=-=-=-=-=-");
    let result1, result2;

    if(current == "Red Black Tree") {
      result1 = dictionary.search(startKey);
      result2 = dictionary.search(endKey);
    } else {
      result1 = bDictionary.search(startKey);
      result2 = bDictionary.search(endKey);
    }

    // DEBUGGING
    // console.log(result1);
    // console.log(result2);

    // console.log(result1 == result2);
    // console.log(result1 === result2);

    if (!result1 || !result2) {
      toast.error(
        "One (or more) of the word(s) does not exist in the dictionary"
      );
      return;
    }
    let result: string[] = [];
    if(current == "Red Black Tree") {
      dictionary.enToCnTree.printInorder2(dictionary.enToCnTree.root, result1, result2, result, [false]);
    } else {
      console.log(bDictionary.enToCnTree.inorderPrint2(result1, result2));
      // bDictionary.enToCnTree.inorderPrint2(result1[0], result2[0], result, [false])!;
    }
    
    console.log(result);

    outputLog[4] = outputLog[4].concat(result);
    setOutputLog([...outputLog])

    toast.success("Found " + result.length + " words");
    console.log("-=-=-=-=-=-=-EXITED RANGE SEARCH-=-=-=-=-=-=-");
  };

  // -=-=-=-=-=-=-=-=-=-=- FILE I/O -=-=-=-=-=-=-=-=-=-=-

  const handleExternalFile = (
    event: ChangeEvent<HTMLInputElement> | undefined
  ) => {
    console.log("-=-=-=-=-=-=-ENTERED FILE INPUT METHOD-=-=-=-=-=-=-");
    if (event == undefined || event.target.files == undefined) {
      toast.error("File selection error");
      return;
    }

    const file = event.target.files[0];
    console.log(file);

    var reader = new FileReader();
    reader.onload = function (progressEvent) {
      // Entire file
      const text = this.result;

      // By lines
      let lines = text!.toString().split("\n");
      for (let line = 0; line < lines.length; line++) {
        let words = lines[line].trim().split(" ");
        console.log(words);

        if(current == "Red Black Tree") {
          dictionary!.addTranslation(words[0], words[1]);
        } else {
          bDictionary!.addTranslation(words[0], words[1]);
        }
      }

      toggleDictionaryChange();

      setDictionary(dictionary);
      toast.success("Imported " + lines.length + " words");
      console.log("-=-=-=-=-=-=-EXITED FILE INPUT METHOD-=-=-=-=-=-=-");
    };

    reader.readAsText(file);
  };

  const handleExternalBatchFile = (
    event: ChangeEvent<HTMLInputElement> | undefined
  ) => {
    console.log("-=-=-=-=-=-=-ENTERED BATCH METHOD-=-=-=-=-=-=-");
    if (event == undefined || event.target.files == undefined) {
      toast.error("Batch file selection error");
      return;
    }

    const file = event.target.files[0];
    console.log(file);

    var reader = new FileReader();
    reader.onload = function (progressEvent) {
      const text = this.result;

      let mode = 0;
      let ref = ["INSERTION MODE", "DELETION MODE", "SERACH MODE"];

      let counter = 0;
      let errCounter = 0;

      let lines = text!.toString().split("\n");

      for (let line = 0; line < lines.length; line++) {
        if (lines[line].trim() == "") continue;
        if (line == 0) {
          switch (lines[line].trim()) {
            case "INSERT":
              mode = 0;
              break;
            case "DELETE":
              mode = 1;
              break;
            case "SEARCH":
              mode = 2;
              break;
          }
          console.log(ref[mode]);
          console.log("Beginnging to process batch file...");
          continue;
        }

        let words = lines[line].trim().split(" ");
        console.log(words);
        const word = words[0] || words[1];
        console.log(word);

        switch (mode) {
          case 0:
            if(checkExist(words[0], words[1])) { console.log("ERROR " + words); errCounter++; break;}
            dictionary!.addTranslation(words[0], words[1]);
            counter++;
            break;
          case 1:
            const result = dictionary!.deleteTranslation(word);
            if (result) { counter++ } else { errCounter++; }
            break;
          case 2:
            if (helperSerach(word)) { counter++ } else { errCounter++; }
            break;
        }
      }

      toggleDictionaryChange();

      setDictionary(dictionary);
      toast.success("Batch processed " + (lines.length - 1) + " item(s)");
      toast("Successfully processed " + counter + " item(s)");
      if (errCounter) toast.error("Could not process " + errCounter + " item(s)");

      console.log("-=-=-=-=-=-=-EXITED BATCH METHOD-=-=-=-=-=-=-");
    };

    reader.readAsText(file);
  };

  // -=-=-=-=-=-=-=-=-=-=- END OF FILE I/O -=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-=-=-=-=- START OF ADD/DELETE -=-=-=-=-=-=-=-=-=-=-

  const checkExist = (english: string, chinese: string) => {
    const result1 = dictionary.search(english);
    const result2 = dictionary.search(chinese);

    if (result1 || result2) {
      return true;
    }
    return false;
  }

  const handleAddDelete = (e: FormEvent<HTMLFormElement> | undefined) => {
    if (e != undefined) e.preventDefault();
    else return;
    console.log(dictionary);
    const target = e.target as typeof e.target & {
      english: { value: string };
      chinese: { value: string };
      submitType: { value: string };
    };

    const english = target.english.value;
    const chinese = target.chinese.value;
    const type = target.submitType.value;

    if (type == "Insert") {
      if (english == "" || chinese == "") {
        toast.error("One (or more) of the inputs are blank");
        return;
      }

      if (checkExist(english, chinese)) {
        toast.error("Word exists");
        return;
      }

      if(current == "Red Black Tree") {
        dictionary!.addTranslation(english, chinese);
        setDictionary(dictionary);
      } else {
        bDictionary!.addTranslation(english, chinese);
        setBDictionary(bDictionary);
      }
      

      toast.success(
        "Translation for " + english + " → " + chinese + " inserted"
      );
      toggleDictionaryChange();
    } else if (type == "Delete") {
      if (!(english != "" || chinese != "")) {
        toast.error("At least one input must be filled");
        return;
      }

      const word = english || chinese;
      const result = dictionary!.deleteTranslation(word);

      if (result) {
        toast.success("Translation for " + word + " deleted");
        toggleDictionaryChange();
      } else {
        toast.error("Translation for " + word + " not found");
      }
    } else {
      toast.error("Unrecongized command " + type);
    }
  };

  //  -=-=-=-=-=-=-=-=-=-=- END OF ADD/DELETE -=-=-=-=-=-=-=-=-=-=-

  const toggleDictionaryChange = () => {
    // Update all output data
    handleLoadPreorder();
    handleLoadInorder();
    handleLoadPostorder();
    handleLoadTree();
    handleLoadResults();
    toast.success("Dictionary updated");
  };

  const handleLoadPreorder = () => {
    const mode = 0;
    let result: string[] = [];
    if(current == "Red Black Tree") {
      dictionary.enToCnTree.printPreorder(
        dictionary.enToCnTree.root,
        0,
        0,
        result
      );
    } else {
      result[0] = bDictionary.enToCnTree.preorderPrint();
    }
    
    outputLog[mode] = result;
    // Update output log
    setOutputLog([...outputLog]);
  }
  
  const handleLoadInorder = () => {
    const mode = 1;
    let result: string[] = [];
    if(current == "Red Black Tree") {
      dictionary.enToCnTree.printInorder(
        dictionary.enToCnTree.root,
        result
      );
    } else {
      result = bDictionary.enToCnTree.inorderPrint();
    }
   
    outputLog[mode] = result;
    // Update output log
    setOutputLog([...outputLog]);
  }

  const handleLoadPostorder = () => {
    const mode = 2;
    let result: string[] = [];
    if(current == "Red Black Tree") {
      dictionary.enToCnTree.printPostorder(
        dictionary.enToCnTree.root,
        result
      );
    } else {
      result = bDictionary.enToCnTree.postorderPrint();
    }
    
    outputLog[mode] = result;
    // Update output log
    setOutputLog([...outputLog]);
  }

  const handleLoadTree = () => {
    const mode = 3;
    let result: string[] = [];

    if(current == "Red Black Tree") {
      result = dictionary.enToCnTree.printTree();
    } else {
      result = [];
    }
    
    outputLog[mode] = result;
    // Update output log
    setOutputLog([...outputLog]);
  }

  const handleLoadResults = () => {
    // nothing here...
  }

  const handleTreeChange =  () => {
    setBDictionary(new BTreeBilingualDictionary());
    setDictionary(new BilingualDictionary());
  }

  return (
    <>
      <main className="relative w-screen flex min-h-screen flex-col items-center justify-center p-24 space-y-4">
        {/* Main Component */}
        <Container title="Chinese - English Dictionary">
          <div className="flex w-full">
            <section className="p-2 w-full space-y-4">
              <input
                ref={inputExternalFileRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleExternalFile}
              />
              <BigButton
                onClick={(e) => inputExternalFileRef.current!.click()}
                placeHolder="Import"
                description="Import data from a text file"
              />

              <input
                ref={inputExternalBatchFileRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleExternalBatchFile}
              />
              <BigButton
                onClick={(e) => inputExternalBatchFileRef.current!.click()}
                placeHolder="Batch"
                description="Batch manipulate data"
              />

              <Divider />

              <form
                onSubmit={handleAddDelete}
                className="flex w-full flex-col items-center p-4 space-y-4"
              >
                <TextInput placeHolder="English" name="english" />
                <TextInput placeHolder="Chinese" name="chinese" />
                <div className="flex w-full justify-center">
                  <div className="flex-row w-fit border border-gray-200 rounded-lg overflow-hidden divide-x">
                    <button
                      onClick={() => setSubmitType("Insert")}
                      className="bg-white hover:bg-gray-200 text-gray-800 py-2 px-4"
                    >
                      Insert
                    </button>
                    <button
                      onClick={() => setSubmitType("Delete")}
                      className="bg-white hover:bg-gray-200 text-gray-800 py-2 px-4"
                    >
                      Delete
                    </button>
                    <input
                      type="hidden"
                      name="submitType"
                      value={submitType}
                    ></input>
                  </div>
                </div>
              </form>
            </section>

            <section className="p-2 w-full">
              <div className="flex flex-col space-y-4">
                <TreeSelect onChange={handleTreeChange} currentState={current} setState={setCurrent} />

                <Divider />

                <form
                  onSubmit={handleSearch}
                  ref={inputSerachRef}
                  className="space-y-4"
                >
                  <TextInput
                    value={translate}
                    setValue={setTranslate}
                    placeHolder="Translate"
                  />
                  <BigButton
                    type="submit"
                    placeHolder="Translate"
                    onClick={() => inputSerachRef.current.requestSubmit()}
                  />
                </form>

                <Divider />

                <form
                  onSubmit={handleRangeSearch}
                  ref={inputRangeSearchRef}
                  className="space-y-4"
                >
                  <TextInput
                    placeHolder="Search from"
                    name="start"
                  />
                  <TextInput placeHolder="To" name="end" />
                  <BigButton
                    placeHolder="Search"
                    onClick={() => inputRangeSearchRef.current.requestSubmit()}
                  />
                </form>
              </div>
            </section>
          </div>
        </Container>

        {/* Search Results Output */}
        <Container title={"Output"}>{/* <textarea></textarea> */}</Container>

        {/* Tree Graph Component */}
        <Container fullWidth={true}>
          <Output
            setMode={setOutputMode}
            mode={outputMode}
            toggleRefresh={toggleDictionaryChange}
            log={outputLog}
          />

          {/* This graph UI library is way to laggy for big graphs, therefore only a text based method would be used */}
          {/* <ParentSize>
            {({ width, height }) => (
              <TreeGraph
                width={width}
                height={height}
                dictionary={dictionary}
              />
            )}
          </ParentSize> */}
        </Container>
      </main>

      <Footer />
      <div>
        <Toaster />
      </div>
    </>
  );
}

"use client";

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import TreeSelect from "@/components/TreeSelect";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
// import TreeGraph from "@/components/TreeGraph";
// import ParentSize from "@visx/responsive/lib/components/ParentSize";
import TextInput from "@/components/TextInput";
import BigButton from "@/components/BigButton";
import Divider from "@/compoennts/Divider";
import toast, { Toaster } from "react-hot-toast";
import { BilingualDictionary } from "@/implementation/bilingualDictionary";
import Output from "@/components/Output";

export default function Home() {
  const [outputMode, setOutputMode] = useState(0);
  const [dictChanged, setDictChanged] = useState<boolean[]>([]);
  const [outputLog, setOutputLog] = useState<string[][]>([[], [], [], [], []]);

  const [current, setCurrent] = useState("");
  const [translate, setTranslate] = useState("");
  const [dictionary, setDictionary] = useState<BilingualDictionary>(
    new BilingualDictionary()
  );

  const inputExternalFileRef = useRef<any>();
  const inputExternalBatchFileRef = useRef<any>();
  const inputSerachRef = useRef<any>();
  const inputRangeSearchRef = useRef<any>();

  const [submitType, setSubmitType] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement> | undefined) => {
    if (e != undefined) e.preventDefault();

    if (translate == "") {
      toast.error("Translate cannot be empty");
      return;
    }

    const start = performance.now();
    const translated = dictionary.search(translate);
    const end = performance.now();
    console.log(`Execution time: ${end - start} ms`);

    if (translated === undefined) {
      // Debugging purposes
      // console.log("NOT FOUND");
      // console.log(translated);

      toast.error("Word not found");
    } else {
      const A = translated.key.word;
      const B = translated.key.translated;

      toast.success("Word found");
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
    const result1 = dictionary.search(startKey);
    const result2 = dictionary.search(endKey);

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
    dictionary.enToCnTree.printInOrder2(dictionary.enToCnTree.root, result1, result2, result, [false]);
    console.log(result);
    outputLog[outputMode] = result;
    setOutputLog([...outputLog])
    toast.success("Found " + result.length + " words");
    console.log("-=-=-=-=-=-=-EXITED RANGE SEARCH-=-=-=-=-=-=-");
  };

  // -=-=-=-=-=-=-=-=-=-=- FILE I/O -=-=-=-=-=-=-=-=-=-=-

  const toggleDictionaryChange = () => {
    for (let i = 0; i < 5; ++i) {
      dictChanged[i] = true;
    }
    setDictChanged([...dictChanged]);
  };

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
        dictionary!.addTranslation(words[0], words[1]);
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

      let lines = text!.toString().split("\n");
      for (let line = 0; line < lines.length; line++) {
        if (lines[line] == "") continue;
        if (line == 0) {
          switch (lines[line]) {
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

        switch (mode) {
          case 0:
            break;
          case 1:
            break;
          case 2:
            break;
        }

        // dictionary!.addTranslation(words[0], words[1]);
      }

      toggleDictionaryChange();

      setDictionary(dictionary);
      toast.success("Batch processed " + lines.length + " items");

      console.log("-=-=-=-=-=-=-EXITED BATCH METHOD-=-=-=-=-=-=-");
    };

    reader.readAsText(file);
  };

  // -=-=-=-=-=-=-=-=-=-=- END OF FILE I/O -=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-=-=-=-=- START OF ADD/DELETE -=-=-=-=-=-=-=-=-=-=-

  const handleAddDelete = (e: FormEvent<HTMLFormElement> | undefined) => {
    if (e != undefined) e.preventDefault();
    else return;

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

      const result1 = dictionary.search(english);
      const result2 = dictionary.search(chinese);

      if (result1 || result2) {
        toast.error("Word exists");
        return;
      }

      dictionary!.addTranslation(english, chinese);
      setDictionary(dictionary);

      toast.success(
        "Translation for " + english + " → " + chinese + " inserted"
      );
      toggleDictionaryChange();
    } else if (type == "Delete") {
      if (!(english != "" || chinese != "")) {
        toast.error("At least one input must be filled");
        return;
      }

      const result = dictionary!.deleteTranslation(english);

      if (result) {
        toggleDictionaryChange();
        toast.success("Translation for " + english + " deleted");
      } else {
        toast.error("Translation for " + english + " not found");
      }
    } else {
      toast.error("Unrecongized command " + type);
    }
  };

  //  -=-=-=-=-=-=-=-=-=-=- END OF ADD/DELETE -=-=-=-=-=-=-=-=-=-=-

  const handlePrintPreorder = () => {
    const mode = 0;
    outputHelper(mode);
  };

  const handlePrintInOrder = () => {
    const mode = 1;
    outputHelper(mode);
  };

  const handlePrintPostOrder = () => {
    const mode = 2;
    outputHelper(mode);
  };

  const handlePrintTree = () => {
    const mode = 3;
    outputHelper(mode);
  };

  const handleShowResults = () => {
    const mode = 4;
    outputHelper(mode);
  };

  const outputHelper = (mode: number) => {
    let output: string = "";

    if (outputMode == mode && dictChanged[mode] == false) {
      // still the same page and the dictionary has not been mofidied, nothing needs to be done
      return;
    }

    if (dictChanged[mode] == true) {
      let result: string[] = [];

      switch (mode) {
        case 0:
          dictionary.enToCnTree.printPreOrder(
            dictionary.enToCnTree.root,
            result
          );
          break;
        case 1:
          dictionary.enToCnTree.printInOrder(
            dictionary.enToCnTree.root,
            result
          );
          break;
        case 2:
          dictionary.enToCnTree.printPostOrder(
            dictionary.enToCnTree.root,
            result
          );
          break;
        case 3:
          result = dictionary.enToCnTree.printTree();
          break;
        case 4:
          break;
        default:
          break;
      }

      switch (mode) {
        case 0:
          output += "Preorder";
          break;
        case 1:
          output += "Inorder";
          break;
        case 2:
          output += "Postorder";
          break;
        case 3:
          output += "Tree";
          break;
        case 4:
          break;
        default:
          break;
      }

      outputLog[mode] = result;
      setOutputLog([...outputLog]);
      dictChanged[mode] = false;
      setDictChanged([...dictChanged]);
      toast(output + " updated");
    }

    if (outputMode != mode) {
      setOutputMode(mode);

      switch (mode) {
        case 0:
          console.log("-=-=-=-=-=-=-PREORDER-=-=-=-=-=-=-");
          break;
        case 1:
          console.log("-=-=-=-=-=-=-INORDER-=-=-=-=-=-=-");
          break;
        case 2:
          console.log("-=-=-=-=-=-=-POSTORDER-=-=-=-=-=-=-");
          break;
        case 3:
          console.log("-=-=-=-=-=-=-TREE-=-=-=-=-=-=-");
          break;
        case 4:
          break;
        default:
          break;
      }

      let output = "";
      switch (mode) {
        case 0:
          output += "Preorder";
          break;
        case 1:
          output += "Inorder";
          break;
        case 2:
          output += "Postorder";
          break;
        case 3:
          output += "Tree";
          break;
        // case 4: output += 'Results'; break;
        case 4:
          return;
        default:
          break;
      }

      console.log(outputLog[mode]);

      toast.success(output + " console logged");
    }
  };

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
                <TreeSelect currentState={current} setState={setCurrent} />

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
            handlePrintInOrder={handlePrintInOrder}
            handlePrintPostOrder={handlePrintPostOrder}
            handlePrintPreOrder={handlePrintPreorder}
            handlePrintTree={handlePrintTree}
            handleShowResults={handleShowResults}
            mode={outputMode}
            log={outputLog}
            dictionaryChange={dictChanged}
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

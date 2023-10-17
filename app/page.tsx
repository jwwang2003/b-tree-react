"use client";

import { useState } from "react";
import TreeSelect from "@/components/TreeSelect";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import TreeGraph from "@/components/TreeGraph";
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import TextInput from "@/components/TextInput";
import BigButton from "@/components/BigButton";
import Divider from "@/compoennts/Divider";

export default function Home() {
  const [current, setCurrent] = useState("");

  return (
    <>
      <main className="relative w-screen flex min-h-screen flex-col items-center justify-center p-24 space-y-4">
        {/* Main Component */}
        <Container title="Chinese - English Dictionary">
          <div className="flex w-full">
            <section className="p-2 w-full space-y-4">
              <BigButton placeHolder="Import" description="Import data from a text file" />
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
                
                <TextInput placeHolder="Search from"/>
                <TextInput placeHolder="To" />
                <BigButton placeHolder="Search" />
              </div>
            </section>
          </div> 
        </Container>

        {/* Search Results Output */}
        <Container title={"Output"}>
          {/* <textarea></textarea> */}
        </Container>

        {/* Tree Graph Component */}
        <Container fullWidth={true} extendedHeight={true}>
          <ParentSize>{({ width, height }) => <TreeGraph width={width} height={height} />}</ParentSize>
        </Container>
      </main>


      <Footer />
    </>
  );
}
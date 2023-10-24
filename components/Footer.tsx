import { useState } from "react";
import LanguageSelect from "./LanguageSelect";

export default function Footer() {
  const [currentLang, setLang] = useState("EN");

  return (
    <div className="backdrop-blur-sm bg-white/30 fixed left-0 right-0 bottom-0 p-4 border border-t-1 border-zinc-100">
      <LanguageSelect currentLanguage={currentLang} />
    </div>
  );
}

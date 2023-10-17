import { useState } from "react";
import LanguageSelect from "./LanguageSelect";

export default function Footer() {
  const [currentLang, setLang] = useState("EN");

  return (
    <div className="fixed left-0 right-0 bottom-0 p-2">
      <LanguageSelect currentLanguage={currentLang} />
    </div>
  );
}

export default function LanguageSelect({ currentLanguage }: { currentLanguage: string }) {
  return (
    <div className="ml-auto w-fit">
      <label
        htmlFor="language"
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an Language
      </label>
      <select
        defaultValue={currentLanguage}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-ful p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="EN">
          English
        </option>
        <option value="CN">中文</option>
      </select>
    </div>
  );
}

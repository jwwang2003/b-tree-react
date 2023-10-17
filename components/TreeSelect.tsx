import { useEffect } from "react"
import { Dispatch, SetStateAction } from "react";

export default function TreeSelect({currentState, setState}: {currentState: string, setState: Dispatch<SetStateAction<string>> }) {
  // const [currentState, setState] = useState("")
  
  const onOptionChange = (e: React.ChangeEvent<any>) => {
    setState(e.target.value);
    console.log("Value changed " + e.target.value);
  }

  useEffect(() => {
    // set the default value
    setState("Red Black Tree");
  }, [setState])

  return (
    <>
      <div className="flex flex-row items-center space-x-4">
        <div>
          <input
            checked={currentState == "Red Black Tree"}
            onChange={onOptionChange}

            type="radio"
            name="sorting-type"
            id="radio-red-black-tree"
            value="Red Black Tree"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="radio-red-black-tree"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Red Black Tree
          </label>
        </div>
        
        <div>
          <input
            checked={currentState == "B Tree"}
            onChange={onOptionChange}

            type="radio"
            name="sorting-type"
            id="radio-b-tree"
            value="B Tree"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="radio-b-tree"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            B Tree
          </label>
        </div>
      </div>
    </>
  )
}
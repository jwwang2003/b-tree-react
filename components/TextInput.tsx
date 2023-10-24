import { Dispatch, SetStateAction } from "react";

export default function TextInput({
  placeHolder,
  value,
  setValue,
  type,
  name,
}: {
  placeHolder: string;
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
  type?: string;
  name?: string;
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeHolder}
      value={value}
      onChange={(e) => setValue && setValue(e.target.value)}
      className="p-1 w-full text-center dark:bg-slate-700 rounded-md"
    />
  );
}

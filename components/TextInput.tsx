export default function TextInput({ placeHolder }: { placeHolder: string }) {
  return (
    <input placeholder={placeHolder} className="p-1 w-full text-center dark:bg-slate-700 rounded-md" />
  )
}
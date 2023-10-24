export default function Container({
  children,
  col,
  title,
  fullWidth,
  extendedHeight,
}: {
  children: any;
  col?: boolean;
  title?: string;
  fullWidth?: boolean;
  extendedHeight?: boolean;
}) {
  return (
    <div
      className={
        "relative flex flex-col space-x-2 bg-zinc-100 dark:bg-slate-900 rounded-lg p-4 border border-stone-200 dark:border-stone-700 border-opacity-100 hover:border-opacity-0 transition-all " +
        (fullWidth ? "w-full" : "") + " " +
        (extendedHeight ? "h-screen" : "")
      }
      style={
        {
          "minWidth": "40rem"
        }
      }
    >
      {children}
    </div>
  );
}

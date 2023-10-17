export default function BigButton({
  children,
  placeHolder,
  description,
  href,
  onClick,
}: {
  children?: any;
  placeHolder: string;
  description?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <div className="grid text-center">
      <a
        href={href}
        onClick={onClick}
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className={`text-2xl font-semibold` + " " +
          (description ? "mb-3" : "")
        }
        >
          {placeHolder}{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            {/* -&gt; */}→
          </span>
        </h2>
        <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
          { description }
        </p>
      </a>
    </div>
  );
}

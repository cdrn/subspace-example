import { useEffect, useState } from "react";

export default function Card({
  title,
  value,
  link,
}: {
  title: string;
  value: string | undefined;
  link?: string;
}) {
  const [animate, setAnimate] = useState(false);

  // If the value updates, animate to let the user know
  useEffect(() => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
      return;
    }, 1490);
  }, [value]);

  return (
    <div
      className={`w-[250px] h-[120px] flex flex-col justify-center items-center space-y-4 border border-2 rounded-md border-subspacePurple p-2`}
    >
      {/* Handle if we are still waiting on values to return -- assume if value is undefined, we are loading */}
      {value === undefined ? (
        <p>Loading... </p>
      ) : (
        <>
          <h2 className="text-xl"> {title}</h2>
          <p
            className={`text-lg px-2 ${
              animate
                ? "bg-subspacePurpleLighter opacity-1 animate-ease-out-bg"
                : "bg-none"
            }`}
          >
            {value}
          </p>
        </>
      )}
    </div>
  );
}

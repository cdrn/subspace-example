export default function Card({
  title,
  value,
  link,
}: {
  title: string;
  value: string | undefined;
  link?: string;
}) {
  return (
    <div className="w-[250px] h-[120px] flex flex-col justify-center items-center space-y-4 border border-2 rounded-md border-subspacePurple p-2 hover:border-subspacePurpleLighter hover:animate-pulse">
      {/* Handle if we are still waiting on values to return -- assume if value is undefined, we are loading */}
      {value === undefined ? (
        <p>Loading... </p>
      ) : (
        <>
          <h2 className="text-xl"> {title}</h2>
          <p className="text-lg blink">{value}</p>
        </>
      )}
    </div>
  );
}

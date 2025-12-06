function Skeleton({cant}) {
  const data = Array.from({ length: cant }, (index) => index + 1);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 p-4 md:gap-y-14">
      {data.map((element, index) => (
        <div key={index} className="relative group">
          <div className="h-60 w-full bg-[#242424] rounded-lg shadow-lg animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export default Skeleton;

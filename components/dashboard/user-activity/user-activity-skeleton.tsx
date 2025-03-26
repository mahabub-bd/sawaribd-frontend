const TableSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Table headers */}
      <div className="flex items-center border-b border-gray-300 py-2">
        <div className="grow text-gray-400 text-left">Name</div>
        <div className="grow text-gray-400 text-left">Role</div>
        <div className="grow text-gray-400 text-left">Action</div>
        <div className="grow text-gray-400 text-left">Path</div>
        <div className="w-24 text-gray-400 text-right">Date</div>
      </div>

      {/* Table rows */}
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="flex items-center border-b border-gray-300 py-2 "
        >
          <div className="grow">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>
          <div className="grow capitalize">
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
          <div className="grow capitalize">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
          <div className="grow capitalize">
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
          <div className="w-24 text-right">
            <div className="h-4 bg-gray-300 rounded w-3/4 ml-auto"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;

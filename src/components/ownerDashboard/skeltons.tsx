export default function PropertiesListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="h-48 bg-blue-100 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-6 bg-blue-100 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-blue-100 rounded animate-pulse w-1/2" />
            <div className="flex justify-between pt-4">
              <div className="h-4 bg-blue-100 rounded animate-pulse w-1/3" />
              <div className="h-4 bg-blue-100 rounded animate-pulse w-1/3" />
            </div>
            <div className="flex space-x-2 pt-2">
              <div className="h-10 bg-blue-100 rounded animate-pulse flex-1" />
              <div className="h-10 bg-blue-100 rounded animate-pulse flex-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
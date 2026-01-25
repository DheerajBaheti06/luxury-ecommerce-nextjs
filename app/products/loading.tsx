export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8 space-y-4">
        <div className="h-10 w-48 bg-gray-800 rounded animate-pulse mx-auto"></div>
        <div className="h-4 w-96 bg-gray-800 rounded animate-pulse mx-auto"></div>
      </div>

      {/* Filters Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="hidden md:block space-y-6">
          <div className="h-8 w-32 bg-gray-800 rounded animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-6 w-full bg-gray-800 rounded animate-pulse"></div>
            <div className="h-6 w-3/4 bg-gray-800 rounded animate-pulse"></div>
            <div className="h-6 w-5/6 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="md:col-span-3">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800"
              >
                <div className="aspect-[4/3] bg-gray-800 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 w-3/4 bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-800 rounded animate-pulse"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-6 w-20 bg-gray-800 rounded animate-pulse"></div>
                    <div className="h-8 w-24 bg-gray-800 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

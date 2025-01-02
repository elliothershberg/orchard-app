import React from "react";

export default function Loading() {
  return (
    <main className="flex flex-col items-center p-8 bg-gray-50 h-[calc(100vh-4rem)]">
      <div className="w-full h-full">
        <div className="w-full flex gap-4 h-full">
          {/* Left panel */}
          <div className="w-1/3 flex flex-col h-full">
            <div>
              {/* Download button skeleton */}
              <div className="h-9 w-40 bg-gray-200 rounded-md animate-pulse" />
            </div>
            <div className="overflow-y-auto space-y-4 mr-4 mt-4 flex-1">
              {/* Research card skeletons */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-full h-48 bg-gray-200 rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>
          {/* Right panel - scatterplot skeleton */}
          <div className="w-2/3 h-full">
            <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}

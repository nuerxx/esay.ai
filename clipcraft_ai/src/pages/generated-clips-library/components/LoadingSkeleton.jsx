import React from 'react';

const LoadingSkeleton = ({ count = 12 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: count })?.map((_, index) => (
        <div key={index} className="bg-card border border-border rounded-lg overflow-hidden animate-pulse">
          {/* Thumbnail Skeleton */}
          <div className="aspect-video bg-muted" />
          
          {/* Content Skeleton */}
          <div className="p-3 space-y-2">
            {/* Title */}
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-1/2" />
            
            {/* Metadata */}
            <div className="flex justify-between items-center">
              <div className="h-3 bg-muted rounded w-1/3" />
              <div className="h-3 bg-muted rounded w-1/4" />
            </div>
            
            {/* Performance */}
            <div className="flex justify-between items-center">
              <div className="h-6 bg-muted rounded-full w-16" />
              <div className="flex gap-1">
                <div className="w-6 h-6 bg-muted rounded" />
                <div className="w-6 h-6 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
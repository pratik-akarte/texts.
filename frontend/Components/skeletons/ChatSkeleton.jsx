const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"}`}>
          <div className={`flex max-w-xs lg:max-w-md ${idx % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
            {/* Avatar skeleton */}
            <div className="flex-shrink-0 mr-2 ml-2">
              <div className="w-10 h-10 rounded-lg bg-gray-300 animate-pulse" />
            </div>

            {/* Message content */}
            <div className={`flex flex-col ${idx % 2 === 0 ? "items-start" : "items-end"}`}>
              {/* Sender name skeleton */}
              <div className="h-4 w-16 bg-gray-300 rounded mb-1 animate-pulse" />
              
              {/* Message bubble skeleton */}
              <div className={`h-16 w-[200px] bg-gray-300 rounded-lg animate-pulse ${
                idx % 2 === 0 ? "rounded-tl-none" : "rounded-tr-none"
              }`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
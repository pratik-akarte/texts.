import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-gray-200 flex flex-col transition-all duration-200  bg-zinc-900 px-4 pt-4">
      {/* Header */}
      <div className="border-b border-gray-200 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-gray-400" />
          <span className="font-medium hidden lg:block text-gray-400">
            Contacts
          </span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="w-full p-3 flex items-center gap-3 animate-pulse"
          >
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="w-12 h-12 rounded-lg bg-gray-300" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-32" />
              <div className="h-3 bg-gray-300 rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;

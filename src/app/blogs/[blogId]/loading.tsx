// Loading.js
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
  <div className="animate-spin h-14 w-14 border-t-4 border-b-4 border-gray-900 rounded-full"></div>
</div>

  );
}

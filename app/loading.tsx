import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Loader className="animate-spin" size="40" />
    </div>
  );
}

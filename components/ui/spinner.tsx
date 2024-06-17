import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <LoaderCircle
      strokeWidth="3"
      className={cn("animate-spin text-white", className)}
    />
  );
};

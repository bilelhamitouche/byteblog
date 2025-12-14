import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./button";

interface LoadingButtonProps {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive";
  size?: "lg" | "sm" | "default" | "icon";
  className?: string;
}

export default function LoadingButton({
  size,
  variant,
  className,
}: LoadingButtonProps) {
  return (
    <Button variant={variant} size={size} className={className} disabled>
      <div className="flex gap-2 items-center">
        <Loader2 size="45" className="animate-spin" />
        Please wait
      </div>
    </Button>
  );
}

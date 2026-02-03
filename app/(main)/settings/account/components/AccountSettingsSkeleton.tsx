import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountSettingsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-30" />
        <Skeleton className="h-6 w-50" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-full h-8" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-full h-8" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-20 h-6" />
          <Skeleton className="w-full h-8" />
        </div>
        <Skeleton className="h-8 w-30" />
      </CardContent>
    </Card>
  );
}

import { lusitana } from "@/lib/fonts";

interface FeatureProps {
  icon: React.ReactNode;
  feature: string;
  description: string;
}

export default function Feature({ icon, feature, description }: FeatureProps) {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="p-4 bg-gray-400 rounded-full dark:bg-gray-600">
        {icon}
      </div>
      <h3 className={`${lusitana.className} text-xl font-bold`}>{feature}</h3>
      <p className="max-w-xs text-center text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

import Link from "next/link";
import SettingsTabs from "./components/SettingsTabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container justify-center py-24 px-8 mx-auto space-y-4 max-w-3xl h-full">
      <Button variant="link" className="text-primary" asChild>
        <Link href="/">
          <ArrowLeft />
          <span>Back to Home</span>
        </Link>
      </Button>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm">
          Update your account, password and appearance settings
        </p>
      </div>
      <SettingsTabs>{children}</SettingsTabs>
    </div>
  );
}

export default Layout;

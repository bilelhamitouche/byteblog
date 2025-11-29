"use client";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsTabs = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const activeTab = pathname.includes("/settings/account")
    ? "account"
    : "password";

  return (
    <Tabs value={activeTab} className="w-full">
      <TabsList className="flex w-full">
        <TabsTrigger asChild value="account">
          <Link href="/settings/account">Account</Link>
        </TabsTrigger>
        <TabsTrigger asChild value="password">
          <Link href="/settings/password">Password</Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">{children}</TabsContent>
      <TabsContent value="password">{children}</TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";

export default function Appearance() {
  const { theme, setTheme } = useTheme();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance settings</CardTitle>
        <CardDescription>Change the application theme</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={theme}>
          <TabsList>
            <TabsTrigger
              className="min-w-24"
              value="system"
              onClick={() => setTheme("system")}
            >
              System
            </TabsTrigger>
            <TabsTrigger
              value="light"
              className="min-w-24"
              onClick={() => setTheme("light")}
            >
              Light
            </TabsTrigger>
            <TabsTrigger
              value="dark"
              className="min-w-24"
              onClick={() => setTheme("dark")}
            >
              Dark
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
}

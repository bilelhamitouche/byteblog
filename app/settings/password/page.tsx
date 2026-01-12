"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { passwordChangeSchema } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import { changePasswordAction } from "../actions/password";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Password() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof passwordChangeSchema>>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password here. After saving you&apos;ll be logged out.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              async (data: z.infer<typeof passwordChangeSchema>) => {
                const formData = new FormData();
                setIsPending(true);
                formData.append("password", data.password);
                formData.append("new_password", data.new_password);
                formData.append(
                  "confirm_new_password",
                  data.confirm_new_password,
                );
                try {
                  const result = await changePasswordAction(formData);
                  if (result?.message) toast.error(result.message);
                  if (!result?.errors && !result?.message) {
                    toast.success("Password changed successfully");
                  }
                  router.refresh();
                } catch (err) {
                  toast.success("Cannot change password");
                } finally {
                  setIsPending(false);
                }
              },
            )}
            className="space-y-4"
          >
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="new_password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirm_new_password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex gap-2 items-center">
                  <Loader2 className="animate-spin" />
                  <span>Please wait</span>
                </div>
              ) : (
                <span>Change Password</span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

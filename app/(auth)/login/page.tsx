"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { loginSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/actions/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to start writing blogs</CardDescription>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-2"
                onSubmit={form.handleSubmit(
                  async (data: z.infer<typeof loginSchema>) => {
                    const formData = new FormData();
                    formData.append("email", data.email);
                    formData.append("password", data.password);
                    setIsPending(true);
                    try {
                      const result = await loginAction(formData);
                      if (result?.message) toast.error(result.message);
                      if (!result?.message && !result?.errors) {
                        toast.success("Logged In successfully");
                        router.push("/");
                      }
                    } catch (err) {
                      console.log(err);
                    } finally {
                      setIsPending(false);
                    }
                  },
                )}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full">Login</Button>
              </form>
            </Form>
          </CardContent>
        </CardHeader>
        <CardFooter>
          <p>
            Don&apos; have an account?
            <Button size="sm" variant="link" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

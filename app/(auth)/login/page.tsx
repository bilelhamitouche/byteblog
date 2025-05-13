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
import {
  gitHubLoginAction,
  googleLoginAction,
  loginAction,
} from "@/actions/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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
      <Card className="min-w-xs md:min-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-center">Login</CardTitle>
          <CardDescription>Login to start writing blogs</CardDescription>
          <CardContent>
            <form action={googleLoginAction} className="py-2">
              <Button className="w-full">Login with Google</Button>
            </form>
            <form action={gitHubLoginAction} className="py-2">
              <Button className="w-full">Login with GitHub</Button>
            </form>
            <div className="relative text-sm text-center after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 px-2 bg-card text-muted-foreground">
                Or continue with
              </span>
            </div>
            <Form {...form}>
              <form
                className="space-y-6"
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
                <Button className="w-full" disabled={isPending}>
                  {isPending ? (
                    <div className="flex gap-2 items-center">
                      <Loader2 className="animate-spin" />
                      <span>Please wait</span>
                    </div>
                  ) : (
                    <span>Login</span>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </CardHeader>
        <CardFooter className="flex justify-center items-center w-full">
          <p className="text-sm">
            Don&apos;t have an account?
            <Button size="sm" variant="link" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

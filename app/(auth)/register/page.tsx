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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "@/lib/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerAction } from "@/actions/auth";
import { toast } from "sonner";

export default function Register() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-full">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Register to create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                async (data: z.infer<typeof registerSchema>) => {
                  const formData = new FormData();
                  formData.append("name", data.name);
                  formData.append("email", data.email);
                  formData.append("password", data.password);
                  setIsPending(true);
                  try {
                    const result = await registerAction(formData);
                    if (result?.message) toast.error(result.message);
                    if (!result?.message && !result?.errors) {
                      toast.success("Registered Successfully");
                      router.push("/login");
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
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
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
                name="password"
                control={form.control}
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
              <Button className="w-full">Register</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p>
            Already have an account?
            <Button size="sm" variant="link" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

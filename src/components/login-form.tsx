import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, LockKeyhole, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLogin } from "@/hooks/use-login";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export function LoginForm() {
  const [serverError, setServerError] = useState("");
  const { mutate: login, isPending } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "admin20@hireg.com",
      password: "123123",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setServerError("");

    login(
      {
        email: values.email,
        password: values.password,
      },
      {
        onError: (error) => {
          setServerError(error.message || "Login failed. Please try again.");
        },
        onSuccess: (data) => {
          if (!data.login.success) {
            setServerError(
              data.login.message ||
                "Login failed. Please check your credentials."
            );
          }
        },
      }
    );
  }

  return (
    <div className="w-full max-w-md p-8 mx-auto rounded-lg shadow-sm card bg-white dark:bg-zinc-900">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold mb-1 dark:text-white">Sign In</h1>
        <p className="text-gray-500 text-sm dark:text-gray-400">
          Don't have an account yet?{" "}
          <a href="#" className="text-blue-600 font-medium dark:text-blue-400">
            Sign Up
          </a>
        </p>
      </div>

      <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2.5 px-4 mb-6 text-sm font-medium transition-colors hover:bg-gray-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800">
        <svg viewBox="0 0 48 48" className="h-5 w-5">
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          />
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          />
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-zinc-700"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500 dark:bg-zinc-900 dark:text-gray-400">
            OR
          </span>
        </div>
      </div>

      {serverError && (
        <div className="mb-4 text-red-500 text-sm">{serverError}</div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Email Address"
                      className="w-full h-12 pl-10"
                      {...field}
                    />
                  </div>
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
                <FormLabel className="sr-only">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Password"
                      className="w-full h-12 pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-12" disabled={isPending}>
            {isPending ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing In...
              </span>
            ) : (
              <>
                <LogIn className="h-5 w-5 mr-2" />
                Sign In
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-blue-600 dark:text-blue-400">
          Forgot your password?
        </a>
      </div>
    </div>
  );
}

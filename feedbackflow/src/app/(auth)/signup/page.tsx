"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {useState} from "react";
import {signupFormSchema} from "@/lib/types";

const Signup = () => {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

const onSubmit: SubmitHandler<z.infer<typeof signupFormSchema>> = (formData: any) => {
    console.log(formData);
  }

  const isLoading = form.formState.isSubmitting;
const [submitError, setSubmitError] = useState("")

  return (
    <div className="w-full h-screen flex justify-center items-center my-4">
      <div className="p-8 border border-solid rounded-md space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-center">Signup</h1>
          <div className="flex justify-center">
            <span className="mr-2 text-center">Already a user</span>
            <span className="text-blue-500 hover:underline font-bold">
              Log in
            </span>
          </div>
        </div>
        <div>
          <Button
            variant="info"
            className="flex justify-center w-full text-white"
          >
            Signup with Google
          </Button>
        </div>
        <Form {...form}>
          <form
            onChange={() => {
              if (submitError) setSubmitError("");
            }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              disabled={isLoading}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isLoading}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="joejoe@email.com"
                      {...field}
                      type={"email"}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={isLoading}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} type={"password"} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signup;

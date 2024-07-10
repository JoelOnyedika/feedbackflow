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
import { useState } from "react";
import { signupFormSchema } from "@/lib/types";
import { updateUsername } from "@/lib/supabase/queries/auth"
import { actionSignupUser, signUpWithOAuth, createSessionCookie } from "@/lib/serverActions/auth-actions";
import { FcGoogle } from "react-icons/fc";
import clsx from "clsx";
import { MailCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMemo } from 'react'
import { useRouter, useSearchParams } from "next/navigation";

const Signup = () => {
  const [confirmation, setConfirmation] = useState(false);
  // const searchParams = useSearchParams();
  
  // const codeExchangeError = useMemo(() => {
  //   if (!searchParams) return "";
  //   return searchParams.get("error_description");
  // }, [searchParams]);

  // const confirmationAndErrorStyles = useMemo(
  //   () =>
  //     clsx("bg-primary", {
  //       "bg-red-500/10": codeExchangeError,
  //       "border-red-500/50": codeExchangeError,
  //       "text-red-700": codeExchangeError,
  //     }),
  //   [codeExchangeError]
  // );


  const form = useForm<z.infer<typeof signupFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof signupFormSchema>> = async (formData: any) => {

    try {
      console.log(email, username, password)
      const signupResult = await actionSignupUser({ email, password });
      console.log("signup result got triggered", signupResult)

      if (signupResult.error) {
        setSubmitError(signupResult.error.message);
        form.reset();
        return;
      }else {
        const insertResult = await updateUsername({ username, email });
        console.log("Insert result ", insertResult)

        if (insertResult instanceof Error) {
          setSubmitError("Unable to save username to database");
          form.reset();
          return;
        }

        const cookie = await createSessionCookie(email)
        console.log(cookie)

        setConfirmation(true);
      }
      
    } catch (error) {
      setSubmitError("An unexpected error occurred");
      form.reset();
    }
    console.log(formData);
  }


  const handleSignupWithOAuth = async (provider) => {
  try {
    const result = await signUpWithOAuth(provider);
    if (result.error) {
      setSubmitError(result.error.message);
    } else {
      console.log('OAuth process successful:', result);
      router.push(result.data.url)
    }
  } catch (error) {
    console.log(error);
    setSubmitError("An unexpected error occurred");
  }
  };

  const isLoading = form.formState.isSubmitting;
  const [submitError, setSubmitError] = useState("");

  return (
    <div className="w-full h-screen flex justify-center items-center my-4">
      <div className="p-8 w-1/2 border border-solid rounded-md space-y-5">  {/* Adjusted width here */}
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
            className="flex justify-center w-full text-white"
            onClick={handleSignupWithOAuth('google')}
          >
            <FcGoogle className="text-xl mr-3"/>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              Submit
            </Button>
          </form>
          {submitError && (
              <Alert>
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}
            {(confirmation) && (
              <Alert className={` text-white`}>
                  <MailCheck className="h-4 w-4 text-white" />
                <AlertTitle>
                  {submitError ? "Invalid Link" : "Check your email."}
                </AlertTitle>
                <AlertDescription>
                  {submitError ||
                    "An email confirmation has been sent."}
                </AlertDescription>
              </Alert>
            )}
        </Form>
      </div>
    </div>
  );
};

export default Signup;

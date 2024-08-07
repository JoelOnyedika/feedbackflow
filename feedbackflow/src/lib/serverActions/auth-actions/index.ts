"use server";

import { z } from "zod";
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import {createClient} from '@/lib/supabase'

import * as dotenv from "dotenv";

dotenv.config({ path: "../../env" });

export async function actionSignupUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  console.log("Email and password are going through", email, password);
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("email", email);

    if (error) {
      console.error("Error fetching user:", error.message);
      return { error: { message: "An error occurred while checking user existence" } };
    }

    console.log("Data from database:", data);

    if (data && data.length > 0) { // Check if the array has elements
      console.log("User exists", data[0]);
      return { error: { message: "User already exists with this email" } };
    } else {
      // Sign up the user
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
        },
      });

      console.log(response)
      
      // Check if sign-up was successful
      if (response.error) {
        console.error("Error signing up user:", response.error);
        return { error: { message: "Error signing up" } };
      }

      // Return a plain object indicating success
      return { data: data, error: null };
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return { error: { message: "An unexpected error occurred" } };
  }
}

export async function actionLoginUser({
  email,
  password,
}) {
  const supabase = await createClient()
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return error?.message.toString()  
  } catch (error) {
    console.log(error)
  }
  
}

export async function createSessionCookie(email = null) {
  try {
    const supabase = await createClient();

    let userEmail;
    let fullName;
    let avatarUrl;
    let id;

    // If no email is provided, fetch the session to get the email
    if (!email) {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.log('Error fetching session:', sessionError.message);
        return { data: null, error: { message: "Error fetching your session. Please refresh" } }

      }

      const { session } = sessionData;

      if (session) {
        userEmail = session.user.email;
        fullName = session.user.user_metadata.full_name;
        avatarUrl = session.user.user_metadata.avatar_url;
        id = session.user.id
      } else {
        console.log('Session not found');
        return { data: null, error: { message: "Whoops session does not exist. Please refresh" } }
      }
    } else {
      userEmail = email;

      // Fetch user details using the email
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .eq("email", email);

      if (error){
        console.log(error)
        return { data: null, error: { message: error.message } }
      };

      if (data && data.length > 0) {
        console.lo(user)
        const user = data[0];
        fullName = user.username;
        avatarUrl = user.avatar_img;
        userEmail = user.email;
      } else {
        console.log('No user found with this email');
        return { data: null, error: { message: "User not found in profile" } }
      }
    }

    // Update the user data in the database
    const { error: updateError } = await supabase
      .from("profile")
      .update({ username: fullName, profile_img: avatarUrl, email: userEmail })
      .eq("email", userEmail);

    if (updateError) {
      return { data: null, error: { message: error.message } }
    };

    // Set the user cookie
    cookies().set("userCookie", JSON.stringify({ username: fullName, userEmail, avatarUrl, id }), {
      httpOnly: true,
      secure: true,
    });

    console.log(cookies().get('userCookie'));
  } catch (error) {
    console.log('Error creating session cookie:', error);
    return { data: null, error: { message: "Something went wrong, please refresh" } }

  }
}

export async function getCookies() {
  try {
    const userCookies = cookies().get("userCookie");
    return userCookies;
  } catch (error) {
    console.log(error);
  }
}


export const signUpWithOAuth = async (provider) => {
  try {
    const supabase = await createClient();
    const origin = headers().get('origin');

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${origin}/api/auth/callback` }
    });

    if (error) {
      console.log('Error signing up with', provider, error.message);
      return { error };
    }

    return { data };
  } catch (error) {
    console.log(error);
    return { error: { message: "Something went wrong!" } };
  }
};


export const checkUserPlan = (userId) => {
  const { data, error } = supabase.from('user_subscription').select("*").eq('userId', userId)
  if (error) {
    return { data: null, error: error }
  }
  return data.planId
}
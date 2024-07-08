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
}) {
  console.log("Email and password are going through", email, password);
  const supabase = createClient()

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
      return { success: true };
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
  const supabase = createClient()
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
    const supabase = createClient();

    let userEmail;
    let fullName;
    let avatarUrl;
    let id;

    // If no email is provided, fetch the session to get the email
    if (!email) {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.log('Error fetching session:', sessionError.message);
        throw sessionError;
      }

      const { session } = sessionData;

      if (session) {
        userEmail = session.user.email;
        fullName = session.user.user_metadata.full_name;
        avatarUrl = session.user.user_metadata.avatar_url;
        id = session.user.id
      } else {
        console.log('Session not found');
        return;
      }
    } else {
      userEmail = email;

      // Fetch user details using the email
      const { data, error } = await supabase
        .from("profile")
        .select("username, email, profile_img")
        .eq("email", email);

      if (error) throw error;

      if (data && data.length > 0) {
        const user = data[0];
        fullName = user.username;
        avatarUrl = user.avatar_img;
        userEmail = user.email;
      } else {
        console.log('No user found with this email');
        return;
      }
    }

    // Update the user data in the database
    const { error: updateError } = await supabase
      .from("profile")
      .update({ username: fullName, profile_img: avatarUrl, email: userEmail })
      .eq("email", userEmail);

    if (updateError) throw updateError;

    // Set the user cookie
    cookies().set("userCookie", JSON.stringify({ username: fullName, userEmail, avatarUrl, id }), {
      httpOnly: true,
      secure: true,
    });

    console.log(cookies().get('userCookie'));
  } catch (error) {
    console.log('Error creating session cookie:', error);
  }
}


export const signUpWithOAuth = async (provider) => {
  try {
    const supabase = createClient();
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

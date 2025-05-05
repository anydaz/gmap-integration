import { supabase } from "../utils/supabase";

export const login = async ({ email }: { email: string }) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "http://localhost:3000/auth/callback", // adjust to your app
    },
  });

  if (error) {
    throw error.message;
  } else {
    return "OK";
  }
};

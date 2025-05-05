import { supabase } from "../utils/supabase";

export const login = async ({ email }: { email: string }) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`, // adjust to your app
    },
  });

  if (error) {
    throw error.message;
  } else {
    return "OK";
  }
};

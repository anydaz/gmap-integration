import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const uploadToStorage = async (file: File) => {
  return await supabase.storage
    .from("property-image") // replace with your bucket
    .upload(`public/${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    });
};

export const getImageUrl = async (path: string) => {
  const { data } = await supabase.storage
    .from("property-image")
    .createSignedUrl(path, 60);

  return data?.signedUrl;
};

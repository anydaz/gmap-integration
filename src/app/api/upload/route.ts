import { uploadToStorage } from "@/app/utils/supabase";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  try {
    const { data } = await uploadToStorage(file);
    return Response.json({ data: data });
  } catch (error) {
    return Response.json({ message: "Failed to upload", error });
  }
}

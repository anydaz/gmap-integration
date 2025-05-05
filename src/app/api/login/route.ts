import { validateLogin } from "@/app/input/login";
import { login } from "@/app/services/login";
import { errorHandler } from "@/app/utils/errorHandler";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const loginParam = validateLogin({
      email,
    });

    const data = await login(loginParam);

    return Response.json({
      data: data,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

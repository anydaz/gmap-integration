import { z } from "zod";

export const validateLogin = ({ email }: { email: string }) => {
  const user = z.object({
    email: z.string().email().min(5),
  });
  return user.parse({ email });
};

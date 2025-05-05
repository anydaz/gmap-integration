import { Property } from "@prisma/client";
import { z } from "zod";

export const validateProperty = ({
  price,
  image,
  latitude,
  longtitude,
}: Pick<Property, "price" | "image" | "latitude" | "longtitude">) => {
  const user = z.object({
    price: z.number(),
    image: z.string(),
    latitude: z.number(),
    longtitude: z.number(),
  });
  return user.parse({ price, image, latitude, longtitude });
};

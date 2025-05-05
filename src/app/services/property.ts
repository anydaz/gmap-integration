import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProperty = async ({
  price,
  image,
  latitude,
  longtitude,
}) => {
  console.log(price, image, latitude, longtitude);
  return await prisma.property.create({
    data: { price, image, latitude, longtitude },
  });
};

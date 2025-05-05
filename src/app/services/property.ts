import { IPaginationParam } from "@/interface/shared";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const isActiveRecord = { deleted_at: null };

export const listProperty = async ({ skip, take }: IPaginationParam) => {
  return await prisma.property.findMany({
    skip: skip,
    take: take,
    where: {
      ...isActiveRecord,
    },
  });
};

interface IPropertyParam {
  price: number;
  image: string;
  latitude: number;
  longtitude: number;
}

export const createProperty = async ({
  price,
  image,
  latitude,
  longtitude,
}: IPropertyParam) => {
  return await prisma.property.create({
    data: { price, image, latitude, longtitude },
  });
};

export const updateProperty = async ({
  id,
  price,
  image,
  latitude,
  longtitude,
}: IPropertyParam & { id: number }) => {
  return await prisma.property.update({
    where: {
      id: id,
    },
    data: { price, image, latitude, longtitude },
  });
};

export const deleteProperty = async ({ id }: { id: number }) => {
  return await prisma.property.update({
    where: {
      id: id,
    },
    data: {
      deleted_at: new Date(),
    },
  });
};

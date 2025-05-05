import { validateProperty } from "@/app/input/property";
import { createProperty } from "@/app/services/property";
import { errorHandler } from "@/app/utils/errorHandler";

export async function POST(req: Request) {
  try {
    const { price, image, latitude, longtitude } = await req.json();

    const propertyParams = validateProperty({
      price,
      image,
      latitude,
      longtitude,
    });

    const property = await createProperty(propertyParams);

    return Response.json({
      data: property,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

import { validateProperty } from "@/app/input/property";
import { createProperty, listProperty } from "@/app/services/property";
import { errorHandler } from "@/app/utils/errorHandler";
import { calculateOffset } from "@/app/utils/pagination";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);

    const { current_page, skip, take } = calculateOffset({ page, limit: 10 });
    const properties = await listProperty({ skip, take });

    return Response.json({
      data: properties,
      pagination: {
        current_page: current_page,
      },
    });
  } catch (error) {
    return errorHandler(error);
  }
}

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

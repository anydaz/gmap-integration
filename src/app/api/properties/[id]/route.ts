import { validateProperty } from "@/app/input/property";
import { updateProperty } from "@/app/services/property";
import { errorHandler } from "@/app/utils/errorHandler";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { price, image, latitude, longtitude } = await req.json();

    const propertyParam = validateProperty({
      price,
      image,
      latitude,
      longtitude,
    });

    const updated = await updateProperty({
      id: parseInt(id),
      ...propertyParam,
    });

    return Response.json({
      data: updated,
    });
  } catch (error) {
    return errorHandler(error);
  }
}

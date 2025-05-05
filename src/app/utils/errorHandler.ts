import z from "zod";

export const errorHandler = (error: unknown) => {
  if (error instanceof z.ZodError) {
    return Response.json(
      {
        error: `[${error.issues?.[0]?.path.join("-")}]: ${
          error.issues?.[0]?.message
        }`,
      },
      { status: 422 }
    );
  }

  if (error instanceof SyntaxError || error instanceof TypeError) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ error: error }, { status: 500 });
};

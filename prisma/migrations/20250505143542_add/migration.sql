-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longtitude" DECIMAL(65,30) NOT NULL,
    "image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

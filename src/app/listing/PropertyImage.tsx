import React, { useEffect, useState } from "react";
import { getImageUrl } from "../utils/supabase";
import { Property } from "@prisma/client";
import Image from "next/image";

interface PropertyImageProp {
  property: Property;
}

const PropertyImage = ({ property }: PropertyImageProp) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const getImage = async () => {
      const data = await getImageUrl(property.image);
      if (data) {
        setImageUrl(data);
      }
    };

    getImage();
  }, [property.image]);

  return (
    <div className="absolute top-[-4px] left-1/2 -translate-y-full -translate-x-1/2 hidden group-hover:block">
      {imageUrl && (
        <Image
          src={imageUrl}
          width={200}
          height={200}
          className="rounded-lg"
          alt="Property image"
        />
      )}
    </div>
  );
};

export default PropertyImage;

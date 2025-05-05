import Modal from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IUploadResponse } from "@/interface/shared";
import { fetchApi } from "@/app/utils/fetch";
import { Property } from "@prisma/client";
import { toast } from "sonner";
import { getImageUrl } from "../utils/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { listingQueryKey } from "../const/queryKeys";

interface ICreatePropertyModalProp {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  propertyData: Property | null;
}

const UpdatePropertyModal = ({
  showModal,
  setShowModal,
  propertyData,
}: ICreatePropertyModalProp) => {
  const [price, setPrice] = useState("0");
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const queryClient = useQueryClient();

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!propertyData) return;

    let uploadData: IUploadResponse | undefined;

    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      const { data } = await fetchApi<IUploadResponse>("api/upload", {
        body: formData,
        method: "POST",
      });
      if (data) {
        uploadData = data;
      }
    }

    const { data } = await fetchApi<Property>(
      `api/properties/${propertyData.id}`,
      {
        body: JSON.stringify({
          price: Number(price),
          image: image && uploadData ? uploadData?.path : propertyData.image,
          latitude: Number(propertyData.latitude),
          longtitude: Number(propertyData.longtitude),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      }
    );

    if (data) {
      toast("Property has been updated.");
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: listingQueryKey });
    }
  };

  useEffect(() => {
    if (propertyData) {
      const getImage = async () => {
        const data = await getImageUrl(propertyData.image);
        if (data) {
          setCurrentImageUrl(data);
        }
      };
      getImage();
      setPrice(String(propertyData.price));
    }
  }, [propertyData]);

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title="Update Property"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4 py-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
          />
        </div>

        <div className="mt-2">
          <Image
            src={image ? URL.createObjectURL(image) : currentImageUrl}
            alt="Preview"
            className="mt-2 max-h-48"
            width={200}
            height={200}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UpdatePropertyModal;

import Modal from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Image from "next/image";
import { IMarkerPosition, IUploadResponse } from "@/interface/shared";
import { fetchApi } from "@/app/utils/fetch";
import { Property } from "@prisma/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { listingQueryKey } from "../const/queryKeys";

interface ICreatePropertyModalProp {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  markerPosition: IMarkerPosition;
}

const CreatePropertyModal = ({
  showModal,
  setShowModal,
  markerPosition,
}: ICreatePropertyModalProp) => {
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const queryClient = useQueryClient();

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    const { data: uploadData } = await fetchApi<IUploadResponse>("api/upload", {
      body: formData,
      method: "POST",
    });

    const { data } = await fetchApi<Property>("api/properties", {
      body: JSON.stringify({
        price: Number(price),
        image: uploadData.path,
        latitude: markerPosition.lat,
        longtitude: markerPosition.lng,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (data) {
      toast("Property has been created.");
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: listingQueryKey });
    }
  };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title="Create Property"
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

        {image && (
          <div className="mt-2">
            <Image
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mt-2 max-h-48"
              width={200}
              height={200}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CreatePropertyModal;

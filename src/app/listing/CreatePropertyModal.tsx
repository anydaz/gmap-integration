import Modal from "@/components/shared/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Image from "next/image";
import { IMarkerPosition } from "@/interface/shared";

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

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = () => {
    // TO DO
    // UPLOAD IMAGE
    // SAVE
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

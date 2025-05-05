"use client";
import React, { useEffect, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import CreatePropertyModal from "./CreatePropertyModal";
import { IMarkerPosition } from "@/interface/shared";
import Gmap from "./Gmap";
import { Property } from "@prisma/client";
import { fetchApi } from "../utils/fetch";
import UpdatePropertyModal from "./UpdatePropertyModal";

export interface ModalEditState {
  show: boolean;
  data: Property | null;
}

const Listing = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD_4gtpLk3j3_0C_xZZOraoVh64JqcMjuQ",
  });

  const [markerPosition, setMarkerPosition] = useState<IMarkerPosition | null>(
    null
  );
  const [listing, setListing] = useState<Property[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalEditData, setModalEditData] = useState<ModalEditState>({
    show: false,
    data: null,
  });

  const getListing = async () => {
    const { data } = await fetchApi<Property[]>("api/properties");
    setListing(data);
  };

  useEffect(() => {
    getListing();
  }, []);

  return isLoaded ? (
    <>
      <Gmap
        markerPosition={markerPosition}
        setMarkerPosition={setMarkerPosition}
        onCreate={() => setShowModal(true)}
        listing={listing}
        onEdit={(data: Property) => setModalEditData({ data, show: true })}
      />
      {markerPosition && (
        <CreatePropertyModal
          showModal={showModal}
          setShowModal={setShowModal}
          markerPosition={markerPosition}
        />
      )}
      <UpdatePropertyModal
        showModal={modalEditData.show}
        setShowModal={(value: boolean) => {
          const data = {
            ...modalEditData,
            show: value,
          };

          setModalEditData(data);
        }}
        propertyData={modalEditData.data}
      />
    </>
  ) : (
    <></>
  );
};

export default Listing;

"use client";
import React, { useEffect, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import CreatePropertyModal from "./CreatePropertyModal";
import { IMarkerPosition } from "@/interface/shared";
import Gmap from "./Gmap";
import { Property } from "@prisma/client";
import { fetchApi } from "../utils/fetch";

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
      />
      {markerPosition && (
        <CreatePropertyModal
          showModal={showModal}
          setShowModal={setShowModal}
          markerPosition={markerPosition}
        />
      )}
    </>
  ) : (
    <></>
  );
};

export default Listing;

"use client";
import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  OverlayView,
} from "@react-google-maps/api";

import { Button } from "@/components/ui/button";
import CreatePropertyModal from "./CreatePropertyModal";
import { IMarkerPosition } from "@/interface/shared";

const containerStyle = {
  width: "100vw",
  height: "90vh",
};

const center = {
  lat: -6.2088,
  lng: 106.8456,
};

const Listing = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD_4gtpLk3j3_0C_xZZOraoVh64JqcMjuQ",
  });

  const [markerPosition, setMarkerPosition] = useState<IMarkerPosition | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });
    }
  };

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick}
      >
        {markerPosition && (
          <>
            <Marker position={markerPosition} />
            <OverlayView
              position={markerPosition}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="cursor-pointer w-max h-max transform translate-y-[4px] -translate-x-[50%] bg-black px-[4px] py-[8px] rounded">
                <Button
                  size="xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                  }}
                >
                  Create Property
                </Button>
              </div>
            </OverlayView>
          </>
        )}

        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
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

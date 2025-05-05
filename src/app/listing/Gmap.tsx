import { GoogleMap, Marker, OverlayView } from "@react-google-maps/api";
import React from "react";

import { Button } from "@/components/ui/button";
import { IMarkerPosition } from "@/interface/shared";
import { Property } from "@prisma/client";
import PropertyItem from "./PropertyItem";

const containerStyle = {
  width: "100vw",
  height: "90vh",
};

const center = {
  lat: -6.2088,
  lng: 106.8456,
};

interface IGmapProps {
  listing: Property[];
  markerPosition: IMarkerPosition | null;
  setMarkerPosition: (value: IMarkerPosition | null) => void;
  onCreate: () => void;
  onEdit: (data: Property) => void;
}

const Gmap = ({
  listing,
  markerPosition,
  setMarkerPosition,
  onCreate,
  onEdit,
}: IGmapProps) => {
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      onClick={handleMapClick}
    >
      {listing.map((item) => {
        return <PropertyItem key={item.id} item={item} onEdit={onEdit} />;
      })}
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
                  onCreate();
                }}
              >
                Create Property
              </Button>
            </div>
          </OverlayView>
        </>
      )}
    </GoogleMap>
  );
};

export default Gmap;

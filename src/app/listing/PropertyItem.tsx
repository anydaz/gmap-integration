import { OverlayView } from "@react-google-maps/api";

import { Button } from "@/components/ui/button";
import { Property } from "@prisma/client";
import PropertyImage from "./PropertyImage";
import { Edit, Trash } from "lucide-react";

interface PropertyItemProp {
  item: Property;
}

const PropertyItem = ({ item }: PropertyItemProp) => {
  return (
    <OverlayView
      key={item.id}
      position={{
        lat: Number(item.latitude),
        lng: Number(item.longtitude),
      }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div
        className="relative group cursor-pointer w-max h-max transform translate-y-[4px] -translate-x-[50%] bg-black px-[4px] py-[8px] rounded hover:z-[10]"
        onClick={(e) => e.stopPropagation()}
      >
        <PropertyImage property={item} />
        <div className="flex items-center">
          <Button size="xs">$ {String(item.price)}</Button>
          <div className="gap-2 hidden group-hover:flex">
            <Edit color="white" />
            <Trash color="white" />
          </div>
        </div>
      </div>
    </OverlayView>
  );
};

export default PropertyItem;

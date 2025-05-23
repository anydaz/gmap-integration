import { OverlayView } from "@react-google-maps/api";

import { Button } from "@/components/ui/button";
import { Property } from "@prisma/client";
import PropertyImage from "./PropertyImage";
import { Edit, Trash } from "lucide-react";
import { fetchApi } from "../utils/fetch";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { listingQueryKey } from "../const/queryKeys";

interface PropertyItemProp {
  item: Property;
  onEdit: (data: Property) => void;
}

const PropertyItem = ({ item, onEdit }: PropertyItemProp) => {
  const queryClient = useQueryClient();

  const deleteItem = async () => {
    const { data } = await fetchApi<Property>(`api/properties/${item.id}`, {
      method: "DELETE",
    });

    if (data) {
      toast("Property has been deleted.");
      queryClient.invalidateQueries({ queryKey: listingQueryKey });
    }
  };

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
            <Edit color="white" onClick={() => onEdit(item)} />
            <Trash color="white" onClick={() => deleteItem()} />
          </div>
        </div>
      </div>
    </OverlayView>
  );
};

export default PropertyItem;

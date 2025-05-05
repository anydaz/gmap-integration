import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface IModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  title: string;
  children: React.ReactNode | React.ReactNode[];
  onSubmit?: () => void;
}

const Modal = ({
  showModal,
  setShowModal,
  title,
  children,
  onSubmit,
}: IModalProps) => {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {onSubmit && <Button onClick={onSubmit}>Submit</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

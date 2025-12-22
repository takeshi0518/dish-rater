'ues client';

import CreateDishForm from './CreateDishForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface CreateDishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DishModal({ isOpen, onClose }: CreateDishModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>料理を投稿</DialogTitle>
        </DialogHeader>
        <CreateDishForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

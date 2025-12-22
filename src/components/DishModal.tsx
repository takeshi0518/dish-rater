'ues client';

import CreateDishForm from './CreateDishForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface CreateDishModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'create' | 'edit';
}

export function DishModal({
  isOpen,
  onClose,
  mode = 'create',
}: CreateDishModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? '料理を投稿' : '料理を編集'}
          </DialogTitle>
        </DialogHeader>
        <CreateDishForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}

'ues client';

import DishForm from './DishForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface DishModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'create' | 'edit';
  dishId: string;
  initialData: any;
}

export function DishModal({
  isOpen,
  onClose,
  mode = 'create',
  dishId,
  initialData,
}: DishModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? '料理を投稿' : '料理を編集'}
          </DialogTitle>
        </DialogHeader>
        <DishForm
          mode={mode}
          dishId={dishId}
          initialData={initialData}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

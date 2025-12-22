'use client';

import { Icons } from '../Icon/icons';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

interface DishDetailAcrionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function DishDetailActions({
  onEdit,
  onDelete,
}: DishDetailAcrionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/90 hover:bg-white z-10 cursor-pointer"
        >
          <Icons.moreVertical className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}

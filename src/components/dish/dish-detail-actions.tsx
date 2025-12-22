'use client';

import { Icons } from '../Icon/icons';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

interface DishDetailActionsProps {
  onShare?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function DishDetailActions({
  onShare,
  onEdit,
  onDelete,
}: DishDetailActionsProps) {
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
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onShare} className="cursor-pointer">
          <Icons.share className="w-4 h-4 mr-2" />
          共有
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
          <Icons.edit className="w-4 h-4 mr-2" />
          編集
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <Icons.trash className="w-4 h-4 mr-2" />
          削除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

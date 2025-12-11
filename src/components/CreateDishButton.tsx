'use client';

import { Icons } from './Icon/icons';
import { Button } from './ui/button';
import { useState } from 'react';

export function CreateDishButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-25 md:bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-orange-400 hover:bg-orange-400 cursor-pointer"
      >
        <Icons.plus className="h-6 w-6" />
      </Button>
    </>
  );
}

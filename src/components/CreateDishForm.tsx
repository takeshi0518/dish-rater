'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { createClient } from '@/lib/supabase/client';

interface CreateDishFormProps {
  onSucess: () => void;
}

export default function CreateDishForm({ onSucess }: CreateDishFormProps) {
  const [dishName, setDishName] = useState('');

  return (
    <form className="space-y-4">
      {/* 料理名 */}
      <Label htmlFor="dishName">料理名 *</Label>
      <Input
        id="dishName"
        value={dishName}
        onChange={(e) => setDishName(e.target.value)}
        placeholder="例: カルボナーラ"
        required
      />
    </form>
  );
}

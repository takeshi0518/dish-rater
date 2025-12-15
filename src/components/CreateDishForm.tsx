'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { createClient } from '@/lib/supabase/client';

import { Icons } from './Icon/icons';

interface CreateDishFormProps {
  onSucess: () => void;
}

export default function CreateDishForm({ onSucess }: CreateDishFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [dishName, setDishName] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');

  return (
    <form className="space-y-4">
      {/* 料理名 */}
      <div>
        <Label htmlFor="dishName" className="mb-2">
          料理名
        </Label>
        <Input
          id="dishName"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          placeholder="例: カルボナーラ"
          required
        />
      </div>

      {/* 評価 */}
      <div>
        <Label htmlFor="rating" className="mb-2">
          評価(1-5)
        </Label>
        <Input
          id="rating"
          type="number"
          min="1"
          max="5"
          step="0.5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="4.5"
          required
        />
      </div>

      {/* 説明文 */}
      <div>
        <Label htmlFor="description" className="mb-2">
          説明
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="料理の感想を書いてください"
          rows={4}
        />
      </div>
      {/* 画像URL */}
      <div>
        <Label htmlFor="imageUrl" className="mb-2">
          画像URL
        </Label>
        <Input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>
      {/* タグ */}
      <div>
        <Label htmlFor="tags" className="mb-2">
          タグ
        </Label>
        <Input
          id="tags"
          onChange={(e) => setTags(e.target.value)}
          placeholder="イタリアン、パスタ、ランチ"
        />
      </div>
      {/* 送信ボタン */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onSucess}
          className="cursor-pointer"
        >
          キャンセル
        </Button>
        <Button
          type="submit"
          onClick={() => setIsLoading(true)}
          className="cursor-pointer"
        >
          {isLoading ? (
            <Icons.loaderCircle className="w-5 h-5 animate-spin" />
          ) : (
            '投稿する'
          )}
        </Button>
      </div>
    </form>
  );
}

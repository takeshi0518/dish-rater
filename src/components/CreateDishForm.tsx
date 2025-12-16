'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { createClient } from '@/lib/supabase/client';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

import { Icons } from './Icon/icons';
import { extractHashtags } from '@/lib/utils';
import { toast } from 'sonner';

interface CreateDishFormProps {
  onClose: () => void;
}

type SourceType = 'restaurant' | 'homemade' | 'other';

export default function CreateDishForm({ onClose }: CreateDishFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //基本情報
  const [dishName, setDishName] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [extractedTags, setExtractedTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');

  //ソース情報
  const [sourceType, setSourceType] = useState<SourceType>('restaurant');
  const [restaurantName, setRestaurantName] = useState('');
  const [chefName, setChefName] = useState('');

  //説明文からハッシュタグを抽出
  useEffect(() => {
    const tags = extractHashtags(description);
    setExtractedTags(tags);
  }, [description]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error('ログインが必要です');
        return;
      }

      //バリデーション
      const ratingValue = parseInt(rating);
      if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
        toast.error('評価は1~5の整数で入力してください');
        return;
      }

      if (sourceType === 'restaurant' && !restaurantName.trim()) {
        toast.error('レストラン名を入力してください');
        return;
      }

      const { error } = await supabase.from('dishes').insert({
        user_id: user.id,
        name: dishName.trim(),
        description: description.trim() || null,
        rating: ratingValue,
        image_url: imageUrl.trim() || null,
        tags: extractHashtags.length > 0 ? extractedTags : null,
        source_type: sourceType,
        restaurant_name:
          sourceType === 'restaurant' ? restaurantName.trim() : null,
        chef_name: chefName.trim() || null,
      });

      if (error) throw error;

      toast.success('料理を投稿しました');
      router.refresh();
      onClose();
    } catch (error) {
      console.error('投稿エラー', error);
      toast.error('投稿に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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

      {/* ソースタイプ */}
      <div>
        <Label className="mb-2">料理について</Label>
        <RadioGroup
          value={sourceType}
          onValueChange={(value) => setSourceType(value as SourceType)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="restaurant" id="restaurant" />
            <Label htmlFor="restaurant" className="font-nomal cursor-pointer">
              レストラン
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="homemade" id="homemade" />
            <Label htmlFor="homemade" className="font-nomal cursor-pointer">
              手作り
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="font-nomal cursor-pointer">
              その他
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* レストラン名 */}
      {sourceType === 'restaurant' && (
        <div>
          <Label htmlFor="restaurantName" className="mb-2">
            レストラン名
          </Label>
          <Input
            id="restaurantName"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            placeholder="例: トラットリア ロッソ"
            required
          />
        </div>
      )}

      {/* シェフ名 */}
      <div>
        <Label htmlFor="chefName" className="mb-2">
          料理を作ったひと
        </Label>
        <Input
          id="chefName"
          value={chefName}
          onChange={(e) => setChefName(e.target.value)}
          placeholder="例: 山田太郎"
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
          maxLength={500}
        />
        <p className="text-xs text-gray-500 mt-1">
          {description.length} / 500文字
        </p>

        {/* 抽出されたタグをプレビュー */}
        {extractedTags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {extractedTags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
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
      {/* 送信ボタン */}
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="cursor-pointer"
          disabled={isLoading}
        >
          キャンセル
        </Button>
        <Button type="submit" className="cursor-pointer" disabled={isLoading}>
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

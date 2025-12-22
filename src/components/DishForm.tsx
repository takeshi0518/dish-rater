'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
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

interface DishFormProps {
  mode: 'create' | 'edit';
  dishId?: string;
  initialData?: {
    name: string;
    rating: number;
    description: string;
    image_url: string | null;
    source_type: SourceType;
    restaurant_name: string | null;
    chef_name: string | null;
  };
  onClose: () => void;
}

type SourceType = 'restaurant' | 'homemade' | 'other';

function DishNameInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Label htmlFor="dishName" className="mb-2">
        料理名
      </Label>
      <Input
        id="dishName"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="例: カルボナーラ"
        required
      />
    </div>
  );
}

function RatingInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <Label htmlFor="rating" className="mb-2">
        評価(1-5)
      </Label>
      <Input
        id="rating"
        type="number"
        min="1"
        max="5"
        step="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="4"
        required
      />
    </div>
  );
}

function SouceTypeSelector({
  value,
  onChange,
}: {
  value: SourceType;
  onChange: (value: SourceType) => void;
}) {
  return (
    <div>
      <Label className="mb-2">料理について</Label>
      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as SourceType)}
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
  );
}

function RestaurantNameInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (vallue: string) => void;
}) {
  return (
    <div>
      <Label htmlFor="restaurantName" className="mb-2">
        レストラン名
      </Label>
      <Input
        id="restaurantName"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="例: トラットリア ロッソ"
        required
      />
    </div>
  );
}

function ChefNameInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (vallue: string) => void;
}) {
  return (
    <div>
      <Label htmlFor="chefName" className="mb-2">
        料理を作ったひと
      </Label>
      <Input
        id="chefName"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="例: 山田太郎"
      />
    </div>
  );
}

function DescriptionInput({
  value,
  onChange,
  extractedTags,
}: {
  value: string;
  onChange: (value: string) => void;
  extractedTags: string[];
}) {
  return (
    <div>
      <Label htmlFor="description" className="mb-2">
        説明
      </Label>
      <Textarea
        id="description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="料理の感想を書いてください"
        rows={4}
        maxLength={500}
      />
      <p className="text-xs text-gray-500 mt-1">{value.length} / 500文字</p>

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
  );
}

function ImageUrlInput({
  value,
  previewUrl,
  setImageUrl,
  uploadMode,
  setUploadMode,
  handleFileChange,
}: {
  value: string;
  previewUrl: string;
  setImageUrl: (value: string) => void;
  uploadMode: 'url' | 'upload';
  setUploadMode: Dispatch<SetStateAction<'url' | 'upload'>>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <Label htmlFor="imageUrl" className="mb-2">
        画像URL
      </Label>
      <div className="flex gap-2 mb-2">
        <Button
          type="button"
          size="sm"
          variant={uploadMode === 'upload' ? 'default' : 'outline'}
          onClick={() => setUploadMode('upload')}
        >
          ファイルをアップロード
        </Button>
        <Button
          type="button"
          size="sm"
          variant={uploadMode === 'url' ? 'default' : 'outline'}
          onClick={() => setUploadMode('url')}
        >
          URLを入力
        </Button>
      </div>
      {uploadMode === 'upload' && (
        <div>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
      )}
      {previewUrl && (
        <div className="mt-2 flex justify-center">
          <img
            src={previewUrl}
            alt="preview"
            className="w-32 h-32 object-cover"
          />
        </div>
      )}
      {uploadMode === 'url' && (
        <Input
          id="imageUrl"
          type="url"
          value={value}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      )}
    </div>
  );
}

function SubmitButtons({
  onClose,
  isLoading,
  mode,
}: {
  onClose: () => void;
  isLoading: boolean;
  mode: 'create' | 'edit';
}) {
  return (
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
        ) : mode === 'create' ? (
          '投稿する'
        ) : (
          '更新する'
        )}
      </Button>
    </div>
  );
}

export default function CreateDishForm({
  mode,
  dishId,
  initialData,
  onClose,
}: DishFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //初期値を設定
  const [dishName, setDishName] = useState(initialData?.name || '');
  const [rating, setRating] = useState(initialData?.rating?.toString() || '');
  const [description, setDescription] = useState(
    initialData?.description || ''
  );
  const [extractedTags, setExtractedTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [uploadMode, setUploadMode] = useState<'url' | 'upload'>('url');
  const [previewUrl, setPreviewUrl] = useState<string>(
    initialData?.image_url || ''
  );
  const [dishFile, setDishFile] = useState<File | null>(null);

  //ソース情報
  const [sourceType, setSourceType] = useState<SourceType>(
    initialData?.source_type || 'restaurant'
  );
  const [restaurantName, setRestaurantName] = useState(
    initialData?.restaurant_name || ''
  );
  const [chefName, setChefName] = useState(initialData?.name || '');

  //説明文からハッシュタグを抽出
  useEffect(() => {
    const tags = extractHashtags(description);
    setExtractedTags(tags);
  }, [description]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDishFile(file);

      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

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

      let finalImageUrl = imageUrl;

      if (uploadMode === 'upload' && dishFile) {
        const fileExt = dishFile?.name.split('.').pop();
        const filename = `${user.id}/${Date.now()}.${fileExt}`;

        const { data, error: uploadError } = await supabase.storage
          .from('dishes')
          .upload(filename, dishFile!, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          console.error('アップロードエラー: ', uploadError);
          toast.error('画像のアップロードに失敗しました');
          return;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from('dishes').getPublicUrl(data.path);

        finalImageUrl = publicUrl;
      }

      //データを準備
      const dishData = {
        name: dishName.trim(),
        description: description.trim() || null,
        rating: ratingValue,
        image_url: finalImageUrl || null,
        tags: extractHashtags.length > 0 ? extractedTags : null,
        sourceType: sourceType,
        restaurant_name:
          sourceType === 'restaurant' ? restaurantName.trim() : null,
        chef_name: chefName.trim() || null,
      };

      if (mode === 'create') {
        const { error } = await supabase.from('dishes').insert({
          user_id: user.id,
          ...dishData,
        });

        if (error) throw error;
        toast.success('料理を投稿しました');
      } else {
        if (!dishId) throw new Error('Dsih ID is required for edit mode');

        const { error } = await supabase
          .from('dishes')
          .update(dishData)
          .eq('id', dishId)
          .eq('user_id', user.id);

        if (error) throw error;
        toast.success('料理を更新しました');
      }

      router.refresh();
      onClose();
    } catch (error) {
      console.error('投稿エラー', error);
      toast.error(
        mode === 'create' ? '投稿に失敗しました' : '更新に失敗しました'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* 料理名 */}
      <DishNameInput value={dishName} onChange={setDishName} />
      {/* 評価 */}
      <RatingInput value={rating} onChange={setRating} />
      {/* ソースタイプ */}
      <SouceTypeSelector value={sourceType} onChange={setSourceType} />
      {/* レストラン名 */}
      {sourceType === 'restaurant' && (
        <RestaurantNameInput
          value={restaurantName}
          onChange={setRestaurantName}
        />
      )}
      {/* シェフ名 */}
      <ChefNameInput value={chefName} onChange={setChefName} />
      {/* 説明文 */}
      <DescriptionInput
        value={description}
        onChange={setDescription}
        extractedTags={extractedTags}
      />
      {/* 画像URL */}
      <ImageUrlInput
        value={imageUrl}
        setImageUrl={setImageUrl}
        uploadMode={uploadMode}
        setUploadMode={setUploadMode}
        handleFileChange={handleFileChange}
        previewUrl={previewUrl}
      />
      {/* 送信ボタン */}
      <SubmitButtons onClose={onClose} isLoading={isLoading} mode={mode} />
    </form>
  );
}

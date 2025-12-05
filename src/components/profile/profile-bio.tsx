'use client';

import { useState } from 'react';

type Props = {
  bio: string | null;
};

export function ProfileBio({ bio }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 40;
  const shouldTruncate = bio && bio.length > MAX_LENGTH;
  return (
    <div className="max-w-xl">
      <p className="whitespace-pre-wrap leading-relaxed">
        {isExpanded || !shouldTruncate ? bio : `${bio.slice(0, MAX_LENGTH)}...`}
        {shouldTruncate && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="ml-2 text-xs text-muted-foreground cursor-pointer"
          >
            more
          </button>
        )}
      </p>
    </div>
  );
}

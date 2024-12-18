import React from 'react';
import type { WallPost } from '../../../../../types';
import { TextContent } from './TextContent';
import { WeeklySummaryContent } from './WeeklySummaryContent';

interface PostContentProps {
  content: WallPost['content'];
  isEditing?: boolean;
  onSave?: (content: string) => void;
  onCancel?: () => void;
}

export const PostContent: React.FC<PostContentProps> = ({
  content,
  isEditing = false,
  onSave = () => {},
  onCancel = () => {},
}) => {
  if (content.type === 'weekly_summary') {
    return <WeeklySummaryContent content={content} />;
  }

  return (
    <TextContent
      content={content.text || ''}
      isEditing={isEditing}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
};
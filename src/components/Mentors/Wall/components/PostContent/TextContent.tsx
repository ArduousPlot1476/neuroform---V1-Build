import React from 'react';
import { EditableContent } from '../EditableContent';

interface TextContentProps {
  content: string;
  isEditing: boolean;
  onSave: (content: string) => void;
  onCancel: () => void;
}

export const TextContent: React.FC<TextContentProps> = ({
  content,
  isEditing,
  onSave,
  onCancel,
}) => {
  if (!isEditing) {
    return <p className="text-gray-600">{content}</p>;
  }

  return (
    <EditableContent
      content={content}
      isEditing={isEditing}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
};
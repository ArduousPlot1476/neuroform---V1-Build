import React from 'react';
import { useEditableContent } from './useEditableContent';
import SaveButton from './SaveButton';
import CancelButton from './CancelButton';

interface EditableContentProps {
  content: string;
  isEditing: boolean;
  onSave: (newContent: string) => void;
  onCancel: () => void;
}

export const EditableContent: React.FC<EditableContentProps> = ({
  content,
  isEditing,
  onSave,
  onCancel,
}) => {
  const { editedContent, textareaRef, handleContentChange, handleSave } = useEditableContent({
    initialContent: content,
    onSave,
  });

  if (!isEditing) {
    return <p className="text-gray-600">{content}</p>;
  }

  return (
    <div className="space-y-2">
      <textarea
        ref={textareaRef}
        value={editedContent}
        onChange={handleContentChange}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        rows={3}
      />
      <div className="flex justify-end space-x-2">
        <SaveButton onClick={handleSave} disabled={!editedContent.trim()} />
        <CancelButton onClick={onCancel} />
      </div>
    </div>
  );
};
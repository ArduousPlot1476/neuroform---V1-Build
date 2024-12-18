import React, { useState, useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';

interface EditableContentProps {
  content: string;
  isEditing: boolean;
  onSave: (newContent: string) => void;
  onCancel: () => void;
}

const EditableContent: React.FC<EditableContentProps> = ({
  content,
  isEditing,
  onSave,
  onCancel,
}) => {
  const [editedContent, setEditedContent] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editedContent.trim()) {
      onSave(editedContent);
    }
  };

  if (!isEditing) {
    return <p className="text-gray-600">{content}</p>;
  }

  return (
    <div className="space-y-2">
      <textarea
        ref={textareaRef}
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        rows={3}
      />
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleSave}
          disabled={!editedContent.trim()}
          className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300"
        >
          <Check className="w-4 h-4" />
          <span>Save</span>
        </button>
        <button
          onClick={onCancel}
          className="flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  );
};
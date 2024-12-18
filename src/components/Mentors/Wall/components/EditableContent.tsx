import React from 'react';

interface EditableContentProps {
  content: string;
  onChange: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const EditableContent: React.FC<EditableContentProps> = ({
  content,
  onChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className="space-y-2">
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
        rows={3}
      />
      <div className="flex justify-end space-x-2">
        <button
          onClick={onSave}
          className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditableContent;
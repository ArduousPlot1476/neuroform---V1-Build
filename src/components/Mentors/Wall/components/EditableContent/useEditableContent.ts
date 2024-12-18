import { useState, useRef, useEffect } from 'react';

interface UseEditableContentProps {
  initialContent: string;
  onSave: (content: string) => void;
}

export const useEditableContent = ({ initialContent, onSave }: UseEditableContentProps) => {
  const [editedContent, setEditedContent] = useState(initialContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleSave = () => {
    if (editedContent.trim()) {
      onSave(editedContent);
    }
  };

  return {
    editedContent,
    textareaRef,
    handleContentChange,
    handleSave,
  };
};
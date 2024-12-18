import React from 'react';
import { Send } from 'lucide-react';

interface PostButtonProps {
  onClick: (e: React.FormEvent) => void;
  disabled: boolean;
}

const PostButton: React.FC<PostButtonProps> = ({ onClick, disabled }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
        disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-purple-600 text-white hover:bg-purple-700'
      }`}
    >
      <span>Post</span>
      <Send className="w-4 h-4" />
    </button>
  );
};

export default PostButton;
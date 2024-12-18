import React from 'react';
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react';

interface PostActionsProps {
  likes: number;
  comments: number;
  isLiked?: boolean;
  onLike: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  likes,
  comments,
  isLiked,
  onLike,
}) => {
  return (
    <div className="flex items-center space-x-6 mt-4">
      <button
        onClick={onLike}
        className={`flex items-center space-x-2 transition-colors ${
          isLiked ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <ThumbsUp className="w-4 h-4" />
        <span>{likes}</span>
      </button>
      <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
        <MessageSquare className="w-4 h-4" />
        <span>{comments}</span>
      </button>
      <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700">
        <Share2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PostActions;
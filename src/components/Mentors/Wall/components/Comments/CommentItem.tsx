import React from 'react';
import { Trash2 } from 'lucide-react';
import { Comment } from '../../../types';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface CommentItemProps {
  comment: Comment;
  onDelete: (commentId: string) => void;
  currentUser: { name: string };
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDelete, currentUser }) => {
  const isAuthor = comment.author.name === currentUser.name;

  return (
    <div className="flex items-start gap-2 group">
      <img
        src={comment.author.avatarUrl}
        alt={`${comment.author.name}'s avatar`}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{comment.author.name}</span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm text-gray-700">{comment.content}</p>
      </div>
      {isAuthor && (
        <button
          onClick={() => onDelete(comment.id)}
          className="p-1 text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Delete comment"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default CommentItem;
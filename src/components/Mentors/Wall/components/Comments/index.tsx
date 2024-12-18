import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';
import { Comment } from '../../../types';

interface CommentsProps {
  postId: string;
  comments: Comment[];
  onAddComment: (postId: string, content: string) => void;
  onDeleteComment: (postId: string, commentId: string) => void;
  currentUser: { name: string; avatarUrl: string };
}

const Comments: React.FC<CommentsProps> = ({
  postId,
  comments,
  onAddComment,
  onDeleteComment,
  currentUser,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddComment = (content: string) => {
    onAddComment(postId, content);
  };

  const handleDeleteComment = (commentId: string) => {
    onDeleteComment(postId, commentId);
  };

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
      >
        <MessageSquare className="w-4 h-4" />
        <span>
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </span>
      </button>
      
      {isExpanded && (
        <div className="space-y-4">
          <CommentList
            comments={comments}
            onDeleteComment={handleDeleteComment}
            currentUser={currentUser}
          />
          <CommentInput onSubmit={handleAddComment} />
        </div>
      )}
    </div>
  );
};

export default Comments;
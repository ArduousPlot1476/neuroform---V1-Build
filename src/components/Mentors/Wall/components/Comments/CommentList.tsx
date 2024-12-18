import React from 'react';
import { Comment } from '../../../types';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  onDeleteComment: (commentId: string) => void;
  currentUser: { name: string };
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onDeleteComment,
  currentUser,
}) => {
  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDelete={onDeleteComment}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export default CommentList;
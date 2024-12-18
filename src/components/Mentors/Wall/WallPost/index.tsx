import React from 'react';
import type { WallPost as WallPostType } from '../../../../types';
import { usePost } from '../hooks/usePost';
import { PostHeader } from './PostHeader';
import { PostContent } from '../components/PostContent';
import { PostActions } from './PostActions';
import { PostMenu } from '../components/PostMenu';
import Comments from '../components/Comments';

interface WallPostProps {
  post: WallPostType;
  onEdit: (postId: string, newContent: string) => void;
  onDelete: (postId: string) => void;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, content: string) => void;
  onDeleteComment: (postId: string, commentId: string) => void;
  currentUser: { name: string; avatarUrl: string };
}

export const WallPost: React.FC<WallPostProps> = ({
  post,
  onEdit,
  onDelete,
  onToggleLike,
  onAddComment,
  onDeleteComment,
  currentUser,
}) => {
  const { isEditing, startEditing, stopEditing } = usePost(post);
  const isAuthor = post.author.name === currentUser.name;

  const handleSave = (newContent: string) => {
    onEdit(post.id, newContent);
    stopEditing();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <PostHeader author={post.author} date={post.content.date} />
        <PostMenu
          onEdit={startEditing}
          onDelete={handleDelete}
          isAuthor={isAuthor}
        />
      </div>
      <div className="mt-4">
        <PostContent
          content={post.content}
          isEditing={isEditing}
          onSave={handleSave}
          onCancel={stopEditing}
        />
      </div>
      <PostActions
        likes={post.content.likes}
        comments={post.content.comments.length}
        isLiked={post.isLiked}
        onLike={() => onToggleLike(post.id)}
      />
      <div className="mt-4 border-t pt-4">
        <Comments
          postId={post.id}
          comments={post.content.comments}
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};
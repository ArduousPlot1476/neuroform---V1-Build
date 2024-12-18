import React, { useState } from 'react';
import { ThumbsUp, Share2 } from 'lucide-react';
import type { WallPost as WallPostType } from '../../../types';
import PostHeader from './components/PostHeader';
import PostContent from './components/PostContent';
import PostMenu from './components/PostActions/PostMenu';
import EditPostModal from './components/PostActions/EditPostModal';
import DeletePostModal from './components/PostActions/DeletePostModal';
import Comments from './components/Comments';
import { getCurrentUser } from './utils/userUtils';

interface WallPostProps {
  post: WallPostType;
  onEdit: (postId: string, newContent: string) => void;
  onDelete: (postId: string) => void;
  onLike: (postId: string) => void;
  onShare: (postId: string) => void;
  onAddComment: (postId: string, content: string) => void;
  onDeleteComment: (postId: string, commentId: string) => void;
}

const WallPost: React.FC<WallPostProps> = ({
  post,
  onEdit,
  onDelete,
  onLike,
  onShare,
  onAddComment,
  onDeleteComment,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const currentUser = getCurrentUser();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between">
        <PostHeader author={post.author} date={post.content.date} />
        <PostMenu
          post={post}
          currentUser={currentUser}
          onEdit={() => setIsEditModalOpen(true)}
          onDelete={() => setIsDeleteModalOpen(true)}
        />
      </div>

      <div className="mt-4">
        <PostContent content={post.content} />
      </div>

      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={() => onLike(post.id)}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{post.content.likes}</span>
        </button>
        <button
          onClick={() => onShare(post.id)}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      <div className="mt-4 pt-4 border-t">
        <Comments
          postId={post.id}
          comments={post.content.comments}
          onAddComment={onAddComment}
          onDeleteComment={onDeleteComment}
          currentUser={currentUser}
        />
      </div>

      <EditPostModal
        post={post}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={onEdit}
      />

      <DeletePostModal
        post={post}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onDelete}
      />
    </div>
  );
};

export default WallPost;
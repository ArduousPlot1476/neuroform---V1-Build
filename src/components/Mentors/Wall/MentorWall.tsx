import React from 'react';
import PostInput from './PostInput';
import WallPost from './WallPost';
import { usePosts } from './hooks/usePosts';
import { getCurrentUser } from './utils/userUtils';

const MentorWall: React.FC = () => {
  const {
    posts,
    handleNewPost,
    handleEditPost,
    handleDeletePost,
    handleLikePost,
    handleSharePost,
    handleAddComment,
    handleDeleteComment,
  } = usePosts();

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Mentor Wall</h2>
      <div className="space-y-6">
        <PostInput onPost={handleNewPost} />
        {posts.map((post) => (
          <WallPost
            key={post.id}
            post={post}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
            onLike={handleLikePost}
            onShare={handleSharePost}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default MentorWall;
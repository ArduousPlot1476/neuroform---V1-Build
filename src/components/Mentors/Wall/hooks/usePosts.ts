import { useState } from 'react';
import type { WallPost, Comment } from '../../../types';
import { getCurrentUser } from '../utils/userUtils';

export const usePosts = () => {
  const [posts, setPosts] = useState<WallPost[]>([
    {
      id: '1',
      author: {
        name: 'System AI',
        type: 'system',
        avatarUrl: ''
      },
      content: {
        type: 'weekly_summary',
        title: 'Weekly Summary',
        date: 'today',
        likes: 3,
        comments: [],
        report: {
          title: 'Weekly Progress Report - March 15, 2024',
          content: [
            'This week marked significant progress in personal development and productivity optimization.',
            'Task completion rates reached 85% efficiency, with 15 high-priority items successfully delivered.',
            'The data suggests that structured planning and regular mentor check-ins have been instrumental.',
            'Looking ahead: Targeting a 20% increase in deep work capacity.'
          ]
        }
      }
    }
  ]);

  const handleNewPost = (content: string) => {
    const currentUser = getCurrentUser();
    const newPost: WallPost = {
      id: Date.now().toString(),
      author: {
        name: currentUser.name,
        type: 'user',
        avatarUrl: currentUser.avatarUrl
      },
      content: {
        type: 'text',
        text: content,
        date: 'just now',
        likes: 0,
        comments: []
      }
    };
    setPosts([newPost, ...posts]);
  };

  const handleEditPost = (postId: string, newContent: string) => {
    setPosts(posts.map(post => 
      post.id === postId && post.content.type === 'text'
        ? {
            ...post,
            content: {
              ...post.content,
              text: newContent
            }
          }
        : post
    ));
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId
        ? {
            ...post,
            content: {
              ...post.content,
              likes: post.content.likes + 1
            }
          }
        : post
    ));
  };

  const handleSharePost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      // In a real app, this would open a share dialog
      console.log('Sharing post:', post);
    }
  };

  const handleAddComment = (postId: string, content: string) => {
    const currentUser = getCurrentUser();
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author: {
        name: currentUser.name,
        avatarUrl: currentUser.avatarUrl
      },
      createdAt: new Date()
    };

    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            content: {
              ...post.content,
              comments: [...post.content.comments, newComment]
            }
          }
        : post
    ));
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            content: {
              ...post.content,
              comments: post.content.comments.filter(comment => comment.id !== commentId)
            }
          }
        : post
    ));
  };

  return {
    posts,
    handleNewPost,
    handleEditPost,
    handleDeletePost,
    handleLikePost,
    handleSharePost,
    handleAddComment,
    handleDeleteComment
  };
};
import React, { useState } from 'react';
import PostButton from './PostButton';
import UserAvatar from '../shared/UserAvatar';

interface PostInputProps {
  onPost: (content: string) => void;
}

const PostInput: React.FC<PostInputProps> = ({ onPost }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onPost(content);
      setContent('');
    }
  };

  return (
    <div className="flex items-start space-x-4">
      <UserAvatar
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&auto=format&fit=crop"
        alt="User avatar"
      />
      <form onSubmit={handleSubmit} className="flex-1 flex space-x-2">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts with the mentor circle..."
          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <PostButton onClick={handleSubmit} disabled={!content.trim()} />
      </form>
    </div>
  );
}
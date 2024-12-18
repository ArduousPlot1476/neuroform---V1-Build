import React from 'react';
import { Brain } from 'lucide-react';
import type { WallPost } from '../../../../types';

interface PostHeaderProps {
  author: WallPost['author'];
  date: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ author, date }) => {
  return (
    <div className="flex items-center space-x-2">
      {author.type === 'system' ? (
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
          <Brain className="w-6 h-6 text-purple-600" />
        </div>
      ) : (
        <img
          src={author.avatarUrl}
          alt={`${author.name}'s avatar`}
          className="w-10 h-10 rounded-full"
        />
      )}
      <div>
        <span className="font-semibold">{author.name}</span>
        {author.type === 'mentor' && (
          <span className="ml-2 text-sm text-purple-600">Mentor</span>
        )}
        <span className="text-sm text-gray-500 ml-2">{date}</span>
      </div>
    </div>
  );
};

export default PostHeader;
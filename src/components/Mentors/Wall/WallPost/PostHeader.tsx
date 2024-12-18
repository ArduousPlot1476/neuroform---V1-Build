import React from 'react';
import UserAvatar from '../shared/UserAvatar';
import { type WallPost } from '../../../../types';

interface PostHeaderProps {
  author: WallPost['author'];
  date: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ author, date }) => {
  return (
    <div className="flex items-center space-x-2">
      <UserAvatar src={author.avatarUrl} alt={`${author.name}'s avatar`} />
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
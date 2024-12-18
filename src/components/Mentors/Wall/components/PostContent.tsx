import React from 'react';
import type { WallPost } from '../../../../types';

interface PostContentProps {
  content: WallPost['content'];
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
  if (content.type === 'weekly_summary') {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-purple-600">{content.title}</span>
        </div>
        <h3 className="font-semibold">{content.report?.title}</h3>
        {content.report?.content.map((paragraph, index) => (
          <p key={index} className="text-gray-600">{paragraph}</p>
        ))}
      </div>
    );
  }

  return <p className="text-gray-600">{content.text}</p>;
};

export default PostContent;
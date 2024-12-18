import React from 'react';
import type { WallPost } from '../../../../../types';

interface WeeklySummaryContentProps {
  content: WallPost['content'];
}

export const WeeklySummaryContent: React.FC<WeeklySummaryContentProps> = ({ content }) => {
  if (content.type !== 'weekly_summary' || !content.report) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <span className="text-purple-600">{content.title}</span>
      </div>
      <h3 className="font-semibold">{content.report.title}</h3>
      {content.report.content.map((paragraph, index) => (
        <p key={index} className="text-gray-600">{paragraph}</p>
      ))}
    </div>
  );
};
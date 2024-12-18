import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TimeBlock } from '../types';
import EditButton from './EditButton';
import EditForm from './EditForm';
import DisplayContent from './DisplayContent';
import { formatTime } from '../utils/timeUtils';

interface TimeBlockItemProps {
  block: TimeBlock;
  onEdit: (id: string, updates: Partial<TimeBlock>) => void;
}

const TimeBlockItem: React.FC<TimeBlockItemProps> = ({ block, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTime, setEditedTime] = useState(block.time);
  const [editedActivity, setEditedActivity] = useState(block.activity);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    onEdit(block.id, {
      time: formatTime(editedTime, '12h'),
      activity: editedActivity,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTime(block.time);
    setEditedActivity(block.activity);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...(isEditing ? {} : listeners)}
      className={`flex items-center justify-between p-3 mb-2 rounded-lg ${block.color} hover:brightness-95 transition-all group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center flex-1 ${!isEditing ? 'cursor-move' : ''}`}>
        {isEditing ? (
          <EditForm
            time={editedTime}
            activity={editedActivity}
            onTimeChange={setEditedTime}
            onActivityChange={setEditedActivity}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <DisplayContent
            time={block.time}
            activity={block.activity}
            icon={block.icon}
          />
        )}
      </div>
      {!isEditing && isHovered && (
        <EditButton onClick={() => setIsEditing(true)} />
      )}
    </div>
  );
};

export default TimeBlockItem;
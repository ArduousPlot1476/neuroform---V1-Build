import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit2, Check, X } from 'lucide-react';
import type { TimeBlock } from './types';
import { getIconComponent } from './utils';
import { formatTime } from './utils/timeUtils';

interface TimeBlockItemProps {
  block: TimeBlock;
  onEdit: (id: string, updates: Partial<TimeBlock>) => void;
}

const TimeBlockItem: React.FC<TimeBlockItemProps> = ({ block, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTime, setEditedTime] = useState(block.time);
  const [editedActivity, setEditedActivity] = useState(block.activity);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const Icon = block.icon ? getIconComponent(block.icon) : null;

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
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
          <div className="flex items-center space-x-2 w-full">
            <input
              type="time"
              value={formatTime(editedTime, '24h')}
              onChange={(e) => setEditedTime(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-24 px-2 py-1 rounded border bg-white/50"
            />
            <input
              ref={inputRef}
              type="text"
              value={editedActivity}
              onChange={(e) => setEditedActivity(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 px-2 py-1 rounded border bg-white/50"
            />
            <div className="flex items-center space-x-1">
              <button
                onClick={handleSave}
                className="p-1 hover:bg-black/10 rounded-full transition-colors"
              >
                <Check className="w-4 h-4 text-green-600" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 hover:bg-black/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="w-16 text-sm text-gray-600">{block.time}</div>
            <div className="flex items-center gap-2">
              {Icon && <Icon className="w-4 h-4" />}
              <span>{block.activity}</span>
            </div>
          </>
        )}
      </div>
      {!isEditing && isHovered && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
          className="p-1 hover:bg-black/10 rounded-full transition-colors"
          aria-label="Edit block"
        >
          <Edit2 className="w-4 h-4 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default TimeBlockItem;
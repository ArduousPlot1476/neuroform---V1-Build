import React, { useState, useRef, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

interface EditableGoalProps {
  icon: LucideIcon;
  value: number;
  label: string;
  unit: string;
  onSave: (value: number) => void;
}

const EditableGoal: React.FC<EditableGoalProps> = ({
  icon: Icon,
  value,
  label,
  unit,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const newValue = parseInt(editValue);
    if (!isNaN(newValue) && newValue > 0) {
      onSave(newValue);
    } else {
      setEditValue(value.toString());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditValue(value.toString());
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div 
        className="flex items-center space-x-2 cursor-pointer group"
        onClick={() => setIsEditing(true)}
      >
        <Icon className="w-5 h-5 text-purple-600 group-hover:text-purple-700" />
        <span className="font-medium">{label}</span>
      </div>
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-20 px-2 py-1 text-lg font-bold border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            min="1"
          />
          <span className="text-lg font-bold">{unit}</span>
        </div>
      ) : (
        <span className="text-lg font-bold">{value} {unit}</span>
      )}
    </div>
  );
};

export default EditableGoal;
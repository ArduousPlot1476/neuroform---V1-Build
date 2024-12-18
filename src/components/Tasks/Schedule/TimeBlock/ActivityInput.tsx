import React, { useRef, useEffect } from 'react';

interface ActivityInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const ActivityInput: React.FC<ActivityInputProps> = ({ value, onChange, onKeyDown }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      className="flex-1 px-2 py-1 rounded border bg-white/50"
    />
  );
};

export default ActivityInput;
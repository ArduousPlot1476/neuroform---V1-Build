import React from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const colors = [
  { value: 'bg-purple-100', label: 'Purple' },
  { value: 'bg-blue-100', label: 'Blue' },
  { value: 'bg-green-100', label: 'Green' },
  { value: 'bg-yellow-100', label: 'Yellow' },
  { value: 'bg-red-100', label: 'Red' },
];

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <button
          key={color.value}
          type="button"
          onClick={() => onChange(color.value)}
          className={`w-6 h-6 rounded-full ${color.value} ${
            value === color.value ? 'ring-2 ring-gray-400' : ''
          }`}
          aria-label={`Select ${color.label}`}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
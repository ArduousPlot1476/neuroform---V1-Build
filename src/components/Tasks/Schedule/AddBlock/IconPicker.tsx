import React from 'react';
import { Calendar, Coffee, Book, Bath, Briefcase, Utensils, Pencil, Moon } from 'lucide-react';

interface IconPickerProps {
  value?: string;
  onChange: (icon: string) => void;
}

const icons = [
  { value: 'calendar', icon: Calendar },
  { value: 'coffee', icon: Coffee },
  { value: 'book', icon: Book },
  { value: 'shower', icon: Bath },
  { value: 'briefcase', icon: Briefcase },
  { value: 'utensils', icon: Utensils },
  { value: 'pencil', icon: Pencil },
  { value: 'moon', icon: Moon },
];

const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {icons.map((icon) => {
        const Icon = icon.icon;
        return (
          <button
            key={icon.value}
            type="button"
            onClick={() => onChange(icon.value)}
            className={`p-1.5 rounded hover:bg-gray-100 ${
              value === icon.value ? 'bg-gray-100 ring-2 ring-gray-400' : ''
            }`}
            aria-label={`Select ${icon.value} icon`}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
};

export default IconPicker;
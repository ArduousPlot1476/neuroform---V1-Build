import { Calendar, Coffee, Book, Bath, Briefcase, Utensils, Pencil, Moon } from 'lucide-react';

export const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    calendar: Calendar,
    coffee: Coffee,
    book: Book,
    shower: Bath, // Changed from Shower to Bath
    briefcase: Briefcase,
    utensils: Utensils,
    pencil: Pencil,
    moon: Moon,
  };
  return icons[iconName] || null;
};

export const initialSchedule = [
  {
    id: 'daily',
    title: 'Daily',
    blocks: [
      { id: '1', time: '5:30 AM', activity: 'WHIPEM & Drive', icon: 'calendar', color: 'bg-purple-100', dayType: 'daily' },
      { id: '2', time: '6:30 AM', activity: 'Exercise', icon: 'calendar', color: 'bg-green-100', dayType: 'daily' },
      { id: '3', time: '7:30 AM', activity: 'Sauna', icon: 'calendar', color: 'bg-red-100', dayType: 'daily' },
      { id: '4', time: '7:45 AM', activity: 'Shower', icon: 'shower', color: 'bg-red-100', dayType: 'daily' },
      { id: '5', time: '8:15 AM', activity: 'Coffee/Read Newsletters/Write Content', icon: 'coffee', color: 'bg-blue-100', dayType: 'daily' },
      { id: '6', time: '9:00 AM', activity: 'Work (3.0)', icon: 'briefcase', color: 'bg-blue-100', dayType: 'daily' },
      { id: '7', time: '12:00 PM', activity: 'Lunch', icon: 'utensils', color: 'bg-red-100', dayType: 'daily' },
      { id: '8', time: '12:30 PM', activity: 'Work (4.0)', icon: 'briefcase', color: 'bg-blue-100', dayType: 'daily' },
      { id: '9', time: '5:00 PM', activity: 'Drive', icon: 'calendar', color: 'bg-purple-100', dayType: 'daily' },
      { id: '10', time: '6:00 PM', activity: 'Shower', icon: 'shower', color: 'bg-red-100', dayType: 'daily' },
      { id: '11', time: '6:30 PM', activity: 'Dinner', icon: 'utensils', color: 'bg-red-100', dayType: 'daily' },
      { id: '12', time: '7:00 PM', activity: 'Learn/Take Notes', icon: 'book', color: 'bg-yellow-100', dayType: 'daily' },
      { id: '13', time: '8:00 PM', activity: 'Relax w/ Wife', icon: 'calendar', color: 'bg-purple-100', dayType: 'daily' },
      { id: '14', time: '9:30 PM', activity: 'Journal', icon: 'pencil', color: 'bg-purple-100', dayType: 'daily' },
      { id: '15', time: '10:00 PM', activity: 'Sleep', icon: 'moon', color: 'bg-red-100', dayType: 'daily' },
    ],
  },
  {
    id: 'saturday',
    title: 'Saturday',
    blocks: [
      { id: '16', time: '8:15 AM', activity: 'Work On Business', icon: 'briefcase', color: 'bg-blue-100', dayType: 'saturday' },
      { id: '17', time: '9:00 AM', activity: 'Network', icon: 'calendar', color: 'bg-purple-100', dayType: 'saturday' },
    ],
  },
  {
    id: 'sunday',
    title: 'Sunday',
    blocks: [
      { id: '18', time: '8:15 AM', activity: 'Learn (1-2 HR)', icon: 'book', color: 'bg-yellow-100', dayType: 'sunday' },
      { id: '19', time: '9:00 AM', activity: 'Edit & Schedule Content', icon: 'pencil', color: 'bg-blue-100', dayType: 'sunday' },
      { id: '20', time: '2:00 PM', activity: 'Hobby (2-3 HRS)', icon: 'calendar', color: 'bg-purple-100', dayType: 'sunday' },
      { id: '21', time: '5:00 PM', activity: 'Read Book', icon: 'book', color: 'bg-yellow-100', dayType: 'sunday' },
    ],
  },
];
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import MentorCard from './MentorCard';
import SearchBar from './SearchBar';
import MentorWall from './Wall/MentorWall';
import EditMentorModal from './modals/EditMentorModal';
import DeleteMentorModal from './modals/DeleteMentorModal';
import type { Mentor } from '../../types';

const MentorsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      expertise: 'Cognitive Behavioral Therapy',
      rating: 4.9,
      reviewCount: 128,
      nextAvailable: 'Tomorrow, 2:00 PM',
      sessionLength: 50,
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128',
      bio: 'Dr. Chen is a highly experienced professional specializing in cognitive behavioral therapy. With a proven track record of helping individuals achieve their goals, she brings a wealth of knowledge and practical experience to each session.',
      calendarUrl: 'https://calendly.com/dr-sarah-chen/therapy-session'
    },
    {
      id: '2',
      name: 'Dr. Michael Roberts',
      expertise: 'Mindfulness & Stress Management',
      rating: 4.8,
      reviewCount: 94,
      nextAvailable: 'Today, 5:30 PM',
      sessionLength: 45,
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=128&h=128',
      bio: 'Dr. Roberts specializes in mindfulness and stress management techniques. His approach combines traditional therapeutic methods with modern mindfulness practices.',
      calendarUrl: 'https://calendly.com/dr-roberts/mindfulness-session'
    },
  ]);

  const [editingMentor, setEditingMentor] = useState<Mentor | null>(null);
  const [deletingMentor, setDeletingMentor] = useState<Mentor | null>(null);

  const handleEditMentor = (updatedMentor: Mentor) => {
    setMentors(mentors.map(mentor => 
      mentor.id === updatedMentor.id ? updatedMentor : mentor
    ));
    setEditingMentor(null);
  };

  const handleDeleteMentor = (mentorId: string) => {
    setMentors(mentors.filter(mentor => mentor.id !== mentorId));
    setDeletingMentor(null);
  };

  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.expertise.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mentors</h1>
        <div className="flex items-center space-x-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <button
            onClick={() => setEditingMentor({
              id: '',
              name: '',
              expertise: '',
              rating: 5.0,
              reviewCount: 0,
              nextAvailable: 'Not set',
              sessionLength: 45,
              avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=128&h=128',
              bio: '',
              calendarUrl: ''
            })}
            className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Mentor</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMentors.map((mentor) => (
          <MentorCard
            key={mentor.id}
            mentor={mentor}
            onEdit={() => setEditingMentor(mentor)}
            onDelete={() => setDeletingMentor(mentor)}
          />
        ))}
      </div>

      <EditMentorModal
        mentor={editingMentor}
        isOpen={!!editingMentor}
        onClose={() => setEditingMentor(null)}
        onSave={handleEditMentor}
      />

      <DeleteMentorModal
        mentor={deletingMentor}
        isOpen={!!deletingMentor}
        onClose={() => setDeletingMentor(null)}
        onConfirm={() => deletingMentor && handleDeleteMentor(deletingMentor.id)}
      />

      <MentorWall />
    </div>
  );
};

export default MentorsView;
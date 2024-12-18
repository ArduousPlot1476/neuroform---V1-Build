import React, { useState } from 'react';
import { X, Tag as TagIcon, Plus, Save } from 'lucide-react';
import { useAuth } from '../../services/auth/AuthContext';

interface ParkingLotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Tag {
  id: string;
  name: string;
}

interface Thought {
  id: string;
  content: string;
  tags: Tag[];
  createdAt: Date;
}

const ParkingLotModal: React.FC<ParkingLotModalProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated } = useAuth();
  const [newThought, setNewThought] = useState('');
  const [thoughts, setThoughts] = useState<Thought[]>([
    {
      id: '1',
      content: 'Research new productivity methods',
      tags: [{ id: '1', name: 'learning' }, { id: '2', name: 'productivity' }],
      createdAt: new Date(),
    },
  ]);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [activeThoughtId, setActiveThoughtId] = useState<string | null>(null);

  if (!isAuthenticated || !isOpen) return null;

  const handleAddThought = () => {
    if (!newThought.trim()) return;

    const thought: Thought = {
      id: Date.now().toString(),
      content: newThought,
      tags: [],
      createdAt: new Date(),
    };

    setThoughts([...thoughts, thought]);
    setNewThought('');
  };

  const handleAddTag = (thoughtId: string) => {
    if (!newTagName.trim()) return;

    const newTag: Tag = {
      id: Date.now().toString(),
      name: newTagName.toLowerCase(),
    };

    setThoughts(thoughts.map(thought => 
      thought.id === thoughtId
        ? { ...thought, tags: [...thought.tags, newTag] }
        : thought
    ));

    setNewTagName('');
    setIsAddingTag(false);
    setActiveThoughtId(null);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-xl p-6 space-y-4 animate-slide-up">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Parking Lot</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close Parking Lot"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a new thought..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={newThought}
            onChange={(e) => setNewThought(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddThought()}
          />
          <button 
            onClick={handleAddThought}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Add
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {thoughts.map((thought) => (
            <div key={thought.id} className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium mb-2">{thought.content}</p>
              <div className="flex gap-2 flex-wrap items-center">
                {thought.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-full text-sm"
                  >
                    <TagIcon className="w-3 h-3" />
                    {tag.name}
                  </span>
                ))}
                {isAddingTag && activeThoughtId === thought.id ? (
                  <div className="inline-flex items-center gap-2">
                    <input
                      type="text"
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag(thought.id)}
                      className="px-2 py-1 text-sm border rounded-lg"
                      placeholder="Tag name"
                      autoFocus
                    />
                    <button
                      onClick={() => handleAddTag(thought.id)}
                      className="p-1 hover:bg-gray-300 rounded-full"
                    >
                      <Save className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsAddingTag(true);
                      setActiveThoughtId(thought.id);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-full text-sm hover:bg-gray-300"
                  >
                    <Plus className="w-3 h-3" />
                    Add Tag
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParkingLotModal;
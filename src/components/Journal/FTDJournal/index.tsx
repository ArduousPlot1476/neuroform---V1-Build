import React, { useState } from 'react';
import IntensitySlider from './components/IntensitySlider';
import { emotionalTracker } from '../../../services/tracking/emotionalTracker';
import type { JournalEntry } from './types';

const FTDJournal: React.FC = () => {
  const [entry, setEntry] = useState<JournalEntry>({
    feeling: '',
    thinking: '',
    doing: '',
    intensity: 1,
  });

  const handleSave = () => {
    // Save to emotional tracker
    emotionalTracker.addEntry(entry.intensity, entry.feeling);
    
    // Reset form after saving
    setEntry({
      feeling: '',
      thinking: '',
      doing: '',
      intensity: 1,
    });
  };

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">FTD Journal</h2>
        <p className="text-gray-600">Feeling, Thinking, Doing</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="feeling" className="block text-sm font-medium text-gray-700 mb-1">
            Feeling
          </label>
          <input
            id="feeling"
            type="text"
            value={entry.feeling}
            onChange={(e) => setEntry({ ...entry, feeling: e.target.value })}
            placeholder="How are you feeling right now?"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="thinking" className="block text-sm font-medium text-gray-700 mb-1">
            Thinking
          </label>
          <input
            id="thinking"
            type="text"
            value={entry.thinking}
            onChange={(e) => setEntry({ ...entry, thinking: e.target.value })}
            placeholder="What's on your mind?"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="doing" className="block text-sm font-medium text-gray-700 mb-1">
            Doing
          </label>
          <input
            id="doing"
            type="text"
            value={entry.doing}
            onChange={(e) => setEntry({ ...entry, doing: e.target.value })}
            placeholder="What are you working on?"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Overall Intensity
          </label>
          <IntensitySlider
            value={entry.intensity}
            onChange={(value) => setEntry({ ...entry, intensity: value })}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Save Entry
      </button>
    </section>
  );
};

export default FTDJournal;
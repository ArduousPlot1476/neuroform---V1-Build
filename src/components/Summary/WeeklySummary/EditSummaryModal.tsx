import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { WeeklySummary } from '../../../types';

interface EditSummaryModalProps {
  summary: WeeklySummary;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: Partial<WeeklySummary>) => void;
}

const EditSummaryModal: React.FC<EditSummaryModalProps> = ({
  summary,
  isOpen,
  onClose,
  onSave,
}) => {
  const [achievements, setAchievements] = useState<string[]>([]);
  const [challenges, setChallenges] = useState<string[]>([]);
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    setAchievements(summary.achievements);
    setChallenges(summary.challenges);
    setInsights(summary.insights);
  }, [summary]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      achievements,
      challenges,
      insights,
    });
    onClose();
  };

  const handleListChange = (
    value: string,
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[]
  ) => {
    const newList = [...list];
    newList[index] = value;
    setter(newList);
  };

  const handleAddItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[]
  ) => {
    setter([...list, '']);
  };

  const handleRemoveItem = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[]
  ) => {
    const newList = list.filter((_, i) => i !== index);
    setter(newList);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Weekly Summary</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Achievements Section */}
          <section>
            <h3 className="text-lg font-medium mb-2">Achievements</h3>
            <div className="space-y-2">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => handleListChange(e.target.value, index, setAchievements, achievements)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter achievement"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index, setAchievements, achievements)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem(setAchievements, achievements)}
                className="text-purple-600 hover:text-purple-700"
              >
                + Add Achievement
              </button>
            </div>
          </section>

          {/* Challenges Section */}
          <section>
            <h3 className="text-lg font-medium mb-2">Challenges</h3>
            <div className="space-y-2">
              {challenges.map((challenge, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={challenge}
                    onChange={(e) => handleListChange(e.target.value, index, setChallenges, challenges)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter challenge"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index, setChallenges, challenges)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem(setChallenges, challenges)}
                className="text-purple-600 hover:text-purple-700"
              >
                + Add Challenge
              </button>
            </div>
          </section>

          {/* Insights Section */}
          <section>
            <h3 className="text-lg font-medium mb-2">Insights</h3>
            <div className="space-y-2">
              {insights.map((insight, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={insight}
                    onChange={(e) => handleListChange(e.target.value, index, setInsights, insights)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter insight"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index, setInsights, insights)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddItem(setInsights, insights)}
                className="text-purple-600 hover:text-purple-700"
              >
                + Add Insight
              </button>
            </div>
          </section>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSummaryModal;
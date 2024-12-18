import React from "react";
import { useJournal } from "../../context/JournalContext";

const WeeklySummary: React.FC = () => {
  const { currentStreak, longestStreak, weeklyProgress } = useJournal();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Weekly Summary</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Journal Streak */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Journal Streak</h2>
          <p className="text-gray-600">Current Streak</p>
          <p className="text-2xl font-bold">{currentStreak} days</p>

          <p className="text-gray-600 mt-2">Longest Streak</p>
          <p className="text-2xl font-bold">{longestStreak} days</p>

          <p className="text-gray-600 mt-2">Weekly Goal</p>
          <p className="text-2xl font-bold">14 entries</p>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-purple-500 h-2.5 rounded-full"
              style={{ width: `${(weeklyProgress / 14) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Weekly Progress: {weeklyProgress} / 14 entries
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeeklySummary;

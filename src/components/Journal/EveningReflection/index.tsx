import React, { useState } from "react";
import { useJournal } from "../../../context/JournalContext"; // Fixed path to JournalContext

const EveningReflection: React.FC = () => {
  const { entries, addJournalEntry, clearEntries } = useJournal();
  const [reflection, setReflection] = useState("");

  const handleSave = () => {
    if (reflection) {
      addJournalEntry({
        type: "evening",
        date: new Date(),
        reflection,
      });
      setReflection("");
    }
  };

  const handleClear = () => {
    clearEntries("evening");
  };

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">Evening Reflection</h2>
      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="How was your day?"
        className="w-full h-32 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
        >
          Save Evening Entry
        </button>
        <button
          onClick={handleClear}
          className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
        >
          Clear Entries
        </button>
      </div>
      <div>
        <h3 className="font-semibold">Entry Log</h3>
        <table className="w-full mt-4 border">
          <thead>
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Reflection</th>
            </tr>
          </thead>
          <tbody>
            {entries
              .filter((entry) => entry.type === "evening")
              .map((entry, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td className="border p-2">{entry.reflection}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default EveningReflection;

import React, { createContext, useContext, useState } from "react";

interface JournalEntry {
  type: "morning" | "evening";
  date: Date;
  gratitude?: string;
  reflection?: string;
}

interface JournalContextType {
  entries: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;
  clearEntries: (type: "morning" | "evening") => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
};

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const addJournalEntry = (entry: JournalEntry) => {
    setEntries((prevEntries) => [...prevEntries, entry]);
  };

  const clearEntries = (type: "morning" | "evening") => {
    setEntries((prevEntries) => prevEntries.filter((e) => e.type !== type));
  };

  return (
    <JournalContext.Provider value={{ entries, addJournalEntry, clearEntries }}>
      {children}
    </JournalContext.Provider>
  );
};

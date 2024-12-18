import React from 'react';
import FTDJournal from './FTDJournal';
import MorningJournal from './MorningJournal';
import EveningReflection from './EveningReflection';
import DayScore from './DayScore';
import { journalTracker } from '../../services/tracking/journalTracker';

const JournalView: React.FC = () => {
  const handleJournalEntry = (type: 'morning' | 'evening' | 'ftd') => {
    journalTracker.addEntry(type);
  };

  return (
    <div className="space-y-6">
      <FTDJournal onSubmit={() => handleJournalEntry('ftd')} />
      <MorningJournal onSubmit={() => handleJournalEntry('morning')} />
      <EveningReflection onSubmit={() => handleJournalEntry('evening')} />
      <DayScore />
    </div>
  );
};

export default JournalView;
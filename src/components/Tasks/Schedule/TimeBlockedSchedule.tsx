import React, { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Calendar } from 'lucide-react';
import ScheduleColumn from './ScheduleColumn';
import { initialSchedule } from './utils';
import type { TimeBlock, ScheduleColumn as ScheduleColumnType } from './types';
import CalendarSyncModal from './CalendarSync/CalendarSyncModal';
import type { CalendarService } from './CalendarSync/types';

const TimeBlockedSchedule: React.FC = () => {
  const [columns, setColumns] = useState<ScheduleColumnType[]>(initialSchedule);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeBlock = columns.flatMap(col => col.blocks).find(block => block.id === active.id);
    const overBlock = columns.flatMap(col => col.blocks).find(block => block.id === over.id);

    if (!activeBlock || !overBlock || activeBlock.dayType !== overBlock.dayType) return;

    const activeColumn = columns.find(col => col.blocks.some(block => block.id === active.id))!;
    const oldIndex = activeColumn.blocks.findIndex(block => block.id === active.id);
    const newIndex = activeColumn.blocks.findIndex(block => block.id === over.id);

    setColumns(columns.map(col => {
      if (col.id === activeColumn.id) {
        return {
          ...col,
          blocks: arrayMove(col.blocks, oldIndex, newIndex),
        };
      }
      return col;
    }));
  };

  const handleEditBlock = (blockId: string, updates: Partial<TimeBlock>) => {
    setColumns(columns.map(col => ({
      ...col,
      blocks: col.blocks.map(block => 
        block.id === blockId ? { ...block, ...updates } : block
      ),
    })));
  };

  const handleAddBlock = (columnId: string, block: Omit<TimeBlock, 'id'>) => {
    const newBlock: TimeBlock = {
      ...block,
      id: Date.now().toString(),
    };

    setColumns(columns.map(col => {
      if (col.id === columnId) {
        return {
          ...col,
          blocks: [...col.blocks, newBlock],
        };
      }
      return col;
    }));
  };

  const handleCalendarSync = async (service: CalendarService) => {
    // In a real app, this would handle the OAuth flow and API integration
    console.log(`Syncing with ${service} calendar...`);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Calendar sync successful!');
    } catch (error) {
      console.error('Calendar sync failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold">Time Blocked Schedule</h2>
        </div>
        <button
          onClick={() => setIsSyncModalOpen(true)}
          className="text-purple-600 hover:text-purple-700 transition-colors font-medium"
        >
          Sync with Calendar
        </button>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map((column) => (
            <ScheduleColumn
              key={column.id}
              column={column}
              onEditBlock={handleEditBlock}
              onAddBlock={handleAddBlock}
            />
          ))}
        </div>
      </DndContext>

      <CalendarSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onSync={handleCalendarSync}
      />
    </div>
  );
};

export default TimeBlockedSchedule;
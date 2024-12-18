import React, { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TimeBlockItem from './TimeBlock';
import AddBlockButton from './AddBlock/AddBlockButton';
import AddBlockModal from './AddBlock/AddBlockModal';
import type { ScheduleColumn as ScheduleColumnType, TimeBlock } from './types';

interface ScheduleColumnProps {
  column: ScheduleColumnType;
  onEditBlock: (blockId: string, updates: Partial<TimeBlock>) => void;
  onAddBlock: (columnId: string, block: Omit<TimeBlock, 'id'>) => void;
}

const ScheduleColumn: React.FC<ScheduleColumnProps> = ({ 
  column, 
  onEditBlock,
  onAddBlock,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="flex-1">
      <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
      <SortableContext
        items={column.blocks.map(block => block.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {column.blocks.map((block) => (
            <TimeBlockItem
              key={block.id}
              block={block}
              onEdit={onEditBlock}
            />
          ))}
        </div>
      </SortableContext>

      <AddBlockButton onClick={() => setIsAddModalOpen(true)} />

      <AddBlockModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(block) => onAddBlock(column.id, block)}
        dayType={column.id as TimeBlock['dayType']}
      />
    </div>
  );
};

export default ScheduleColumn;
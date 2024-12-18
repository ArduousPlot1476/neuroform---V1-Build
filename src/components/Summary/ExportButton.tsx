import React, { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { exportService } from '../../services/export';
import type { WeeklySummary } from '../../types';

interface ExportButtonProps {
  summary: WeeklySummary;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ summary }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleExport = async (format: 'markdown' | 'json' | 'csv') => {
    try {
      await exportService.exportSummary(summary, {
        format,
        includeMetadata: true
      });
      setShowDropdown(false);
    } catch (error) {
      console.error('Export failed:', error);
      // In a production app, we'd want to show a proper error notification
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <Download className="w-4 h-4" />
        <span>Export Report</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
          <button
            onClick={() => handleExport('markdown')}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Export as Markdown
          </button>
          <button
            onClick={() => handleExport('json')}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Export as JSON
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Export as CSV
          </button>
        </div>
      )}
    </div>
  );
};
import { WeeklySummary } from '../../types';
import { ExportOptions } from './types';
import { generateMarkdown, generateCSV, generateMetadata } from './utils';

class ExportService {
  public async exportSummary(summary: WeeklySummary, options: ExportOptions): Promise<void> {
    const { format, includeMetadata = false } = options;
    let content: string;
    let filename: string;
    let mimeType: string;

    const dateStr = summary.weekStart.toISOString().split('T')[0];

    switch (format) {
      case 'markdown':
        content = generateMarkdown(summary, includeMetadata);
        filename = `weekly-summary-${dateStr}.md`;
        mimeType = 'text/markdown';
        break;

      case 'json':
        const data = includeMetadata 
          ? { ...summary, metadata: generateMetadata('json') }
          : summary;
        content = JSON.stringify(data, null, 2);
        filename = `weekly-summary-${dateStr}.json`;
        mimeType = 'application/json';
        break;

      case 'csv':
        content = generateCSV(summary);
        filename = `weekly-summary-${dateStr}.csv`;
        mimeType = 'text/csv';
        break;

      default:
        throw new Error(`Unsupported export format: ${format}`);
    }

    // Create and trigger download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

export const exportService = new ExportService();
import { WeeklySummary } from '../../types';
import { ExportOptions, ExportMetadata } from './types';

export const generateMetadata = (format: string): ExportMetadata => ({
  generatedAt: new Date().toISOString(),
  exportFormat: format,
  version: '1.0.0',
});

export const formatDateRange = (start: Date, end: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return `${start.toLocaleDateString(undefined, options)} - ${end.toLocaleDateString(undefined, options)}`;
};

export const generateCSV = (summary: WeeklySummary): string => {
  const headers = [
    'Category',
    'Item',
    'Date Range',
    'Focus Time Progress',
    'Journaling Streak'
  ].join(',');

  const dateRange = formatDateRange(summary.weekStart, summary.weekEnd);
  
  const rows: string[] = [];

  // Add achievements
  summary.achievements.forEach(achievement => {
    rows.push([
      'Achievement',
      achievement,
      dateRange,
      summary.focusTimeProgress,
      summary.journalingStreak
    ].map(value => `"${value}"`).join(','));
  });

  // Add challenges
  summary.challenges.forEach(challenge => {
    rows.push([
      'Challenge',
      challenge,
      dateRange,
      summary.focusTimeProgress,
      summary.journalingStreak
    ].map(value => `"${value}"`).join(','));
  });

  // Add insights
  summary.insights.forEach(insight => {
    rows.push([
      'Insight',
      insight,
      dateRange,
      summary.focusTimeProgress,
      summary.journalingStreak
    ].map(value => `"${value}"`).join(','));
  });

  return [headers, ...rows].join('\n');
};

export const generateMarkdown = (summary: WeeklySummary, includeMetadata: boolean = false): string => {
  let markdown = `# Weekly Summary Report\n\n`;
  markdown += `## ${formatDateRange(summary.weekStart, summary.weekEnd)}\n\n`;

  markdown += `### Key Achievements\n`;
  summary.achievements.forEach(achievement => {
    markdown += `- ${achievement}\n`;
  });

  markdown += `\n### Challenges\n`;
  summary.challenges.forEach(challenge => {
    markdown += `- ${challenge}\n`;
  });

  markdown += `\n### Insights\n`;
  summary.insights.forEach(insight => {
    markdown += `- ${insight}\n`;
  });

  markdown += `\n### Progress Metrics\n`;
  markdown += `- Focus Time Progress: ${summary.focusTimeProgress}%\n`;
  markdown += `- Journaling Streak: ${summary.journalingStreak} days\n`;

  if (includeMetadata) {
    const metadata = generateMetadata('markdown');
    markdown += `\n---\n`;
    markdown += `Generated: ${new Date(metadata.generatedAt).toLocaleString()}\n`;
    markdown += `Format: ${metadata.exportFormat}\n`;
    markdown += `Version: ${metadata.version}\n`;
  }

  return markdown;
};
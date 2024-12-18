export interface ExportOptions {
  format: 'pdf' | 'markdown' | 'json' | 'csv';
  includeMetadata?: boolean;
}

export interface ExportMetadata {
  generatedAt: string;
  exportFormat: string;
  version: string;
}
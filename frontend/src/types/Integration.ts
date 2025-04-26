// src/types/Integration.ts
export interface IntegrationSite {
  id: string;
  username: string;
  url: string;
  status: boolean;
  dateAdded: string;
  favicon: string;
  questions: {
    [key: string]: string; // For the 5 question:answer pairs
  };
}

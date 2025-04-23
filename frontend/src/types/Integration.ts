// src/types/Integration.ts
export interface IntegrationSite {
  id: string; // Firestore document id
  uid: string; // User's UID (foreign key)
  username: string; // User's username (foreign key)
  url: string;
  status: boolean; // true = Active, false = Pending
  dateAdded: string; // ISO string
  favicon: string;
}

export interface SiteType {
  createdAt: number;
  createdAtText: string;
  dbPath: string;
  docId: string;
  key: string;
  text: string;
  updatedAt: number | null;
  updatedAtText: string;
  active: boolean;
}

export interface PointType extends SiteType {
  siteDbPath: string;
  siteKey: string;
  siteText: string;
  totalScans: number;
  totalFingerprints: number;
}

export interface LocationFormDataType {
  text: string;
  submission: null; // For submission error.
}

export type LocationType = {
  city?: string;
  region?: string;
  lat?: number | undefined;
  lon?: number | undefined;
  [key: string]: unknown;
};

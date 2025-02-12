export interface Event {
    created_at: string;          // Timestamp of creation
    updated_at: string;          // Timestamp of last update
    lastdetectiontimestamp: string;  // Last detection timestamp
    lat_hex: string;                 // Latitude as a string
    lon_hex: string;                 // Longitude as a string
    flightlevel: string;         // Flight level as a string
    strength: string;            // Signal strength
    jamming: number;             // Jamming status (0/1)
    spoofing: number;            // Spoofing status (0/1)
  }
  
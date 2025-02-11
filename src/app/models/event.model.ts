export interface Event {
    id: number;                  // Unique identifier
    created_at: string;          // Timestamp of creation
    updated_at: string;          // Timestamp of last update
    lastdetectiontimestamp: string;  // Last detection timestamp
    datum: string;               // Datum reference (e.g., WGS84)
    lat: string;                 // Latitude as a string
    lon: string;                 // Longitude as a string
    flightlevel: string;         // Flight level as a string
    pfa: string;                 // Probability of False Alarm (PFA)
    sat_ua: string;              // Satellite User Availability (UA)
    strength: string;            // Signal strength
    jamming: number;             // Jamming status (0/1)
    spoofing: number;            // Spoofing status (0/1)
  }
  
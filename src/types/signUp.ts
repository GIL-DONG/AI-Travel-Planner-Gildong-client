export interface SignUpType {
  id: string;
  name: string;
  email: string;
  gender: string;
  ageGroup: number;
  disabilityStatus: boolean;
  disabilityType: string;
  preferTravel: string[];
  residence: residenceType;
}

export interface residenceType {
  lat: number;
  lon: number;
}

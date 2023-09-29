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
  id: number;
  word: string;
  city: string;
  district: string;
  location: locationType;
}

export interface locationType {
  lat: number;
  lon: number;
}

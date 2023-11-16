export interface SignUpTypes {
  userID: string | null;
  user_name: string;
  gender: string;
  age_group: number;
  disability_status: boolean;
  disability_type: string;
  prefer_travel: string[];
  residence: LocationTypes | undefined;
  user_photo: string;
}

export interface ResidenceTypes {
  id: number;
  word: string;
  city: string;
  district: string;
  location: LocationTypes;
}

export interface LocationTypes {
  lat: number;
  lon: number;
}

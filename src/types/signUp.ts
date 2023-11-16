export interface SignUpTypes {
  userID: string | null;
  user_name: string;
  gender: string;
  age_group: number;
  disability_status: boolean;
  disability_type: string;
  prefer_travel: string[];
  residence: locationTypes | undefined;
  user_photo: string;
}

export interface residenceTypes {
  id: number;
  word: string;
  city: string;
  district: string;
  location: locationTypes;
}

export interface locationTypes {
  lat: number;
  lon: number;
}

export interface SignUpType {
  userID: string | null;
  user_name: string;
  gender: string;
  age_group: number;
  disability_status: boolean;
  disability_type: string;
  prefer_travel: string[];
  residence: locationType | undefined;
  user_photo: string;
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

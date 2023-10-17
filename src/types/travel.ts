import { locationType } from './signUp';

export interface detailType {
  title: string;
  overview: string;
  contenttypeid: string;
  addr: string;
  tel: string;
  zipcode: string;
  url?: string;
  physical?: string;
  visual?: string;
  hearing?: string;
}

export interface itineraryTypes {
  date_type: string;
  destinations: destinationsTypes[];
  itinerary_id: string;
  session_id: string;
  title: string;
}

export interface itineraryScheduleTypes {
  date: string;
  date_type: string;
  description: string;
  end_time: string;
  location?: locationType;
  start_time: string;
  title: string;
  url?: string;
  image_url?: string;
}

export interface destinationsTypes {
  hearing?: boolean;
  physical?: boolean;
  title: string;
  visual?: boolean;
}

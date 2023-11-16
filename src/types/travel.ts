import { locationTypes } from './signUp';

export interface detailTypes {
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
  timestamp: string;
}

export interface itineraryScheduleTypes {
  date: string;
  date_type: string;
  description: string;
  end_time: string;
  location?: locationTypes;
  start_time: string;
  title: string;
  url?: string;
  image_url?: string;
}

export interface destinationsTypes {
  title: string;
  hearing?: boolean;
  physical?: boolean;
  visual?: boolean;
}

export interface theTopTypes {
  title: string;
  destinations: destinationsTypes[];
}

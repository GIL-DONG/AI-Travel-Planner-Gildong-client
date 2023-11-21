import { LocationTypes } from './signUp';

export interface TravelDetailsTypes {
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

export interface ItineraryTypes {
  date_type: string;
  destinations: DestinationsTypes[];
  itinerary_id: string;
  session_id: string;
  title: string;
  timestamp: string;
}

export interface ItineraryScheduleTypes {
  date: string;
  date_type: string;
  description: string;
  end_time: string;
  location?: LocationTypes;
  start_time: string;
  title: string;
  url?: string;
  image_url?: string;
  visual?: string;
  hearing?: string;
  physical?: string;
}

export interface DestinationsTypes {
  title: string;
  hearing?: boolean;
  physical?: boolean;
  visual?: boolean;
}

export interface TheTopTypes {
  title: string;
  destinations: DestinationsTypes[];
}

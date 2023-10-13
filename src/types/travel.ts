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
  destinations: string[];
  itinerary_id: string;
  session_id: string;
  title: string;
}

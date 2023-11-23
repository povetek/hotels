import { TuiDay } from '@taiga-ui/cdk';

export const APP_FEATURE_KEY = 'app';

export interface IAppState {
  profile: Profile | null;
  homepage: Homepage | null;
}

export interface Profile {
  id: string;
  surname: string;
  name: string;
  patronymic: string;
  birthdate: TuiDay;
  phone: string;
  permissions?: number[];
}

export interface Homepage {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  email: string;
  phone_number: string;
  website: string;
  fitness_center: boolean;
  spa_services: boolean;
  restaurant: boolean;
  private_security: boolean;
  work_area: boolean;
}

export interface Room {
  id: number;
  image: string;
  number: number;
  room_type: string;
  bed_count: number;
  floor_number: number;
  area: number;
  price_per_night: number;
  has_wifi: boolean;
  has_tv: boolean;
  has_air_conditioning: boolean;
  availability_status: boolean;
  hotel_id: number;
  available_date: string;
}

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  contacts: number;
  price: number;
}

export interface Menu {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface Transfer {
  id: number;
  name: string;
  departure_place: string;
  arrival_place: string;
  price: number;
}

export interface Reservation {
  id?: number;
  client_id: string | undefined;
  room_id: number;
  arrival_date: string;
  departure_date: string;
  price: number;
  transfer_id: number;
  restaurant_id: number;
  menu_id: number;
  menu?: Menu;
  room?: Room;
  restaurant?: Restaurant;
  transfer?: Transfer;
  created_at?: any;
  client?: Client;
}

export interface Client {
  id: number;
  passport_series: string;
  passport_id: string;
  passport_validity_period: string;
  profile?: Profile;
}

export interface Employee {
  id: number;
  hiring_day: string;
  dismissal_day: string;
  work_experience: number;
  job_title: {
    id: number;
    room: number;
    salary: number;
    title: string;
  };
}

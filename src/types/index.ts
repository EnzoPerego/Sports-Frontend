// Types para os serviços
export interface Location {
  id: number;
  name: string;
  address: string;
}

export interface Court {
  id: number;
  location_id: number;
  name: string;
  sport: string;
}

export interface Slot {
  id: number;
  court_id: number;
  date: string;
  start_time: string;
  end_time: string;
  status: 'AVAILABLE' | 'BOOKED';
}

export interface Booking {
  id: number;
  court_id: number;
  slot_id: number;
  status: 'CREATED' | 'PENDING_PAYMENT' | 'CONFIRMED' | 'CANCELLED';
  estimate_total: number;
  paid_total?: number;
  notes?: string;
}

export interface Quote {
  subtotal: number;
  extras: Array<{
    type: string;
    price: number;
  }>;
  total: number;
}

export interface Payment {
  id: number;
  booking_id: number;
  method: string;
  requested_amount: number;
  paid_amount?: number;
  status: 'PENDING' | 'APPROVED' | 'DECLINED';
  coupon_code?: string;
}

export interface BookingExtras {
  type: 'ball' | 'vest' | 'lights';
  price: number;
}

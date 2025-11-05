import { Booking, Quote } from '../types';

const API_BASE_URL = '/api/booking';

class BookingService {
  async createBooking(
    courtId: number, 
    slotId: number, 
    extras?: string[], 
    notes?: string
  ): Promise<{ booking_id: number; status: string; estimate: Quote; lock_id: string }> {
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        court_id: courtId,
        slot_id: slotId,
        extras,
        notes,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create booking');
    }
    return response.json();
  }

  async getBooking(bookingId: number): Promise<Booking> {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch booking');
    }
    return response.json();
  }

  async cancelBooking(bookingId: number): Promise<{ ok: boolean }> {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to cancel booking');
    }
    return response.json();
  }

  async getUserBookings(): Promise<Booking[]> {
    const response = await fetch(`${API_BASE_URL}/me/bookings`);
    if (!response.ok) {
      throw new Error('Failed to fetch user bookings');
    }
    return response.json();
  }

  async checkoutBooking(
    bookingId: number, 
    method: string, 
    coupon?: string
  ): Promise<{ payment_id: number; status: string }> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          method,
          coupon,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to checkout booking: ${response.status} ${errorText}`);
      }
      return response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Checkout timeout. Por favor, tente novamente.');
      }
      throw error;
    }
  }

  async getQuote(courtId: number, slotId: number, extras?: string[]): Promise<Quote> {
    const params = new URLSearchParams({
      court_id: courtId.toString(),
      slot_id: slotId.toString(),
    });

    if (extras && extras.length > 0) {
      extras.forEach(extra => params.append('extras', extra));
    }

    const response = await fetch(`${API_BASE_URL}/quotes?${params}`);
    if (!response.ok) {
      throw new Error('Failed to get quote');
    }
    return response.json();
  }
}

export const bookingService = new BookingService();

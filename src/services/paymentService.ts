import { Payment } from '../types';

const API_BASE_URL = '/api/payment';

class PaymentService {
  async checkout(
    bookingId: number, 
    amount: number, 
    method: string, 
    coupon?: string
  ): Promise<{ payment_id: number; status: string }> {
    const response = await fetch(`${API_BASE_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        booking_id: bookingId,
        amount,
        method,
        coupon,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to process checkout');
    }
    return response.json();
  }

  async getPayment(paymentId: number): Promise<Payment> {
    const response = await fetch(`${API_BASE_URL}/payments/${paymentId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch payment');
    }
    return response.json();
  }

  async simulatePayment(paymentId: number, forceStatus?: string): Promise<{ ok: boolean; status: string; invoice_id?: number; invoice_url?: string }> {
    const response = await fetch(`${API_BASE_URL}/simulate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_id: paymentId,
        force_status: forceStatus,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to simulate payment');
    }
    return response.json();
  }

  async downloadInvoice(invoiceId: number): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/invoices/${invoiceId}`);
    if (!response.ok) {
      throw new Error('Failed to download invoice');
    }
    return response.blob();
  }
}

export const paymentService = new PaymentService();

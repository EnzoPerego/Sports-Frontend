import { Location, Court, Slot } from '../types';

const API_BASE_URL = '/api/agenda';

class AgendaService {
  async getLocations(): Promise<Location[]> {
    const response = await fetch(`${API_BASE_URL}/locations`);
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }
    return response.json();
  }

  async getCourts(locationId?: number): Promise<Court[]> {
    const url = locationId 
      ? `${API_BASE_URL}/courts?location_id=${locationId}`
      : `${API_BASE_URL}/courts`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch courts');
    }
    return response.json();
  }

  async getSlots(courtId: number, date: string): Promise<Slot[]> {
    const response = await fetch(`${API_BASE_URL}/slots?court_id=${courtId}&date=${date}`);
    if (!response.ok) {
      throw new Error('Failed to fetch slots');
    }
    return response.json();
  }
}

export const agendaService = new AgendaService();

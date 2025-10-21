import { useState, useCallback } from 'react';
import { Location, Court, Slot, Booking, Quote } from '../types';

export interface BookingState {
  // Dados selecionados
  selectedLocation?: Location;
  selectedCourt?: Court;
  selectedSlot?: Slot;
  selectedExtras: string[];
  notes?: string;
  
  // Estado da aplicação
  currentStep: 'location' | 'court' | 'slot' | 'extras' | 'payment' | 'confirmation';
  isLoading: boolean;
  error?: string;
  
  // Dados carregados
  locations: Location[];
  courts: Court[];
  slots: Slot[];
  quote?: Quote;
  booking?: Booking;
}

export const useBookingFlow = () => {
  const [state, setState] = useState<BookingState>({
    selectedExtras: [],
    currentStep: 'location',
    isLoading: false,
    locations: [],
    courts: [],
    slots: [],
  });

  const updateState = useCallback((updates: Partial<BookingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const selectLocation = useCallback((location: Location) => {
    updateState({
      selectedLocation: location,
      selectedCourt: undefined,
      selectedSlot: undefined,
      selectedExtras: [],
      currentStep: 'court',
      courts: [],
      slots: [],
    });
  }, [updateState]);

  const selectCourt = useCallback((court: Court) => {
    updateState({
      selectedCourt: court,
      selectedSlot: undefined,
      selectedExtras: [],
      currentStep: 'slot',
      slots: [],
    });
  }, [updateState]);

  const selectSlot = useCallback((slot: Slot) => {
    updateState({
      selectedSlot: slot,
      currentStep: 'extras',
    });
  }, [updateState]);

  const setExtras = useCallback((extras: string[]) => {
    updateState({
      selectedExtras: extras,
    });
  }, [updateState]);

  const setNotes = useCallback((notes: string) => {
    updateState({
      notes,
    });
  }, [updateState]);

  const setQuote = useCallback((quote: Quote) => {
    updateState({
      quote,
    });
  }, [updateState]);

  const setBooking = useCallback((booking: Booking) => {
    updateState({
      booking,
      currentStep: 'confirmation',
    });
  }, [updateState]);

  const goToPayment = useCallback(() => {
    updateState({
      currentStep: 'payment',
    });
  }, [updateState]);

  const reset = useCallback(() => {
    setState({
      selectedExtras: [],
      currentStep: 'location',
      isLoading: false,
      locations: [],
      courts: [],
      slots: [],
    });
  }, []);

  return {
    state,
    updateState,
    selectLocation,
    selectCourt,
    selectSlot,
    setExtras,
    setNotes,
    setQuote,
    setBooking,
    goToPayment,
    reset,
  };
};

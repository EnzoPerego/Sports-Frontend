import React from 'react';
import { useBookingFlow } from '../hooks/useBookingFlow';
import { LocationList } from './LocationList';
import { CourtList } from './CourtList';
import { SlotList } from './SlotList';
import { ExtrasForm } from './ExtrasForm';
import { PaymentForm } from './PaymentForm';
import { ConfirmationPage } from './ConfirmationPage';
import { bookingService } from '../services/bookingService';

export const BookingFlow: React.FC = () => {
  const {
    state,
    selectLocation,
    selectCourt,
    selectSlot,
    setExtras,
    setNotes,
    setQuote,
    setBooking,
    goToPayment,
    reset,
    updateState,
  } = useBookingFlow();

  const handlePaymentSubmit = async (method: string, coupon?: string) => {
    if (!state.selectedCourt || !state.selectedSlot || !state.quote) return;

    try {
      updateState({ isLoading: true, error: undefined });

      // Criar booking
      const bookingResult = await bookingService.createBooking(
        state.selectedCourt.id,
        state.selectedSlot.id,
        state.selectedExtras,
        state.notes
      );

      // Fazer checkout
      await bookingService.checkoutBooking(
        bookingResult.booking_id,
        method,
        coupon
      );

      // Buscar booking atualizado
      const updatedBooking = await bookingService.getBooking(bookingResult.booking_id);
      setBooking(updatedBooking);

    } catch (error) {
      updateState({ 
        error: error instanceof Error ? error.message : 'Erro ao processar pagamento',
        isLoading: false 
      });
    }
  };

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 'location':
        return <LocationList onLocationSelect={selectLocation} />;

      case 'court':
        if (!state.selectedLocation) return null;
        return (
          <CourtList
            locationId={state.selectedLocation.id}
            onCourtSelect={selectCourt}
            onBack={() => updateState({ currentStep: 'location' })}
          />
        );

      case 'slot':
        if (!state.selectedCourt) return null;
        return (
          <SlotList
            courtId={state.selectedCourt.id}
            onSlotSelect={selectSlot}
            onBack={() => updateState({ currentStep: 'court' })}
          />
        );

      case 'extras':
        if (!state.selectedCourt || !state.selectedSlot) return null;
        return (
          <ExtrasForm
            courtId={state.selectedCourt.id}
            slotId={state.selectedSlot.id}
            selectedExtras={state.selectedExtras}
            onExtrasChange={setExtras}
            onNotesChange={setNotes}
            onQuoteUpdate={setQuote}
            onNext={goToPayment}
            onBack={() => updateState({ currentStep: 'slot' })}
          />
        );

      case 'payment':
        if (!state.quote) return null;
        return (
          <PaymentForm
            quote={state.quote}
            onPaymentSubmit={handlePaymentSubmit}
            onBack={() => updateState({ currentStep: 'extras' })}
          />
        );

      case 'confirmation':
        if (!state.booking) return null;
        return (
          <ConfirmationPage
            booking={state.booking}
            onNewBooking={reset}
          />
        );

      default:
        return <LocationList onLocationSelect={selectLocation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-slate-900 mb-4 tracking-tight">
            Fazer Reserva
          </h1>
          <p className="text-slate-600 text-lg">
            Escolha sua quadra e horário preferido
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-16">
          <div className="flex items-center justify-center space-x-8">
            {['location', 'court', 'slot', 'extras', 'payment'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    state.currentStep === step
                      ? 'bg-slate-900 text-white'
                      : index < ['location', 'court', 'slot', 'extras', 'payment'].indexOf(state.currentStep)
                      ? 'bg-slate-600 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {index + 1}
                </div>
                {index < 4 && (
                  <div
                    className={`w-16 h-0.5 mx-4 transition-all duration-200 ${
                      index < ['location', 'court', 'slot', 'extras', 'payment'].indexOf(state.currentStep)
                        ? 'bg-slate-600'
                        : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {state.error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Erro</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{state.error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {state.isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700">Processando...</span>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-200/50 p-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

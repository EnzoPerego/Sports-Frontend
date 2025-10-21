import React from 'react';
import { Booking } from '../types';

interface ConfirmationPageProps {
  booking: Booking;
  onNewBooking: () => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({
  booking,
  onNewBooking,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'PENDING_PAYMENT':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'Confirmada';
      case 'PENDING_PAYMENT':
        return 'Aguardando Pagamento';
      case 'CANCELLED':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Reserva Criada!</h2>
        <p className="text-gray-600">Sua reserva foi processada com sucesso.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Detalhes da Reserva</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">ID da Reserva:</span>
            <span className="font-medium">#{booking.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
              {getStatusText(booking.status)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Quadra:</span>
            <span className="font-medium">Quadra #{booking.court_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Horário:</span>
            <span className="font-medium">Slot #{booking.slot_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Valor Estimado:</span>
            <span className="font-medium">R$ {booking.estimate_total.toFixed(2)}</span>
          </div>
          {booking.paid_total && (
            <div className="flex justify-between">
              <span className="text-gray-600">Valor Pago:</span>
              <span className="font-medium text-green-600">R$ {booking.paid_total.toFixed(2)}</span>
            </div>
          )}
          {booking.notes && (
            <div className="mt-4">
              <span className="text-gray-600 block mb-1">Observações:</span>
              <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">{booking.notes}</p>
            </div>
          )}
        </div>
      </div>

      {booking.status === 'PENDING_PAYMENT' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Pagamento Pendente
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Sua reserva está aguardando confirmação do pagamento. Você receberá uma confirmação por email assim que o pagamento for processado.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <button
          onClick={onNewBooking}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Nova Reserva
        </button>
      </div>
    </div>
  );
};

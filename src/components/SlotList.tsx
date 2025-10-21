import React, { useState, useEffect } from 'react';
import { Slot } from '../types';
import { agendaService } from '../services/agendaService';

interface SlotListProps {
  courtId: number;
  onSlotSelect: (slot: Slot) => void;
  onBack: () => void;
}

export const SlotList: React.FC<SlotListProps> = ({ courtId, onSlotSelect, onBack }) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        const data = await agendaService.getSlots(courtId, selectedDate);
        setSlots(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar horários');
        console.error('Error fetching slots:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [courtId, selectedDate]);

  const formatTime = (time: string) => {
    return time.substring(0, 5); // Remove seconds
  };

  const isSlotAvailable = (slot: Slot) => slot.status === 'AVAILABLE';

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Carregando horários...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={onBack}
          className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          ← Voltar
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Escolha um Horário</h2>
      </div>

      <div className="mb-6">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
          Data:
        </label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => (
          <div
            key={slot.id}
            onClick={() => isSlotAvailable(slot) && onSlotSelect(slot)}
            className={`border rounded-lg p-4 transition-all duration-200 ${
              isSlotAvailable(slot)
                ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md cursor-pointer'
                : 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">
                  {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                </p>
                <p className="text-sm text-gray-600">
                  {new Date(slot.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs ${
                isSlotAvailable(slot)
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {isSlotAvailable(slot) ? 'Disponível' : 'Ocupado'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {slots.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Nenhum horário disponível para esta data.
        </div>
      )}
    </div>
  );
};

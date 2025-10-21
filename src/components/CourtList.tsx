import React, { useState, useEffect } from 'react';
import { Court } from '../types';
import { agendaService } from '../services/agendaService';

interface CourtListProps {
  locationId: number;
  onCourtSelect: (court: Court) => void;
  onBack: () => void;
}

export const CourtList: React.FC<CourtListProps> = ({ locationId, onCourtSelect, onBack }) => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        setLoading(true);
        const data = await agendaService.getCourts(locationId);
        setCourts(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar quadras');
        console.error('Error fetching courts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourts();
  }, [locationId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Carregando quadras...</span>
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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
        >
          ← Voltar
        </button>
        <div className="text-center">
          <h2 className="text-3xl font-light text-slate-900 mb-2">Escolha uma Quadra</h2>
          <p className="text-slate-600">Selecione a quadra do seu esporte</p>
        </div>
        <div></div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {courts.map((court) => (
          <div
            key={court.id}
            onClick={() => onCourtSelect(court)}
            className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-slate-300 hover:shadow-lg cursor-pointer transition-all duration-200 group"
          >
            <h3 className="text-xl font-medium text-slate-900 mb-4 group-hover:text-slate-700">
              {court.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="inline-block bg-slate-100 text-slate-700 text-sm px-3 py-1 rounded-full font-medium">
                {court.sport}
              </span>
              <div className="flex items-center text-slate-500 text-sm font-medium group-hover:text-slate-700">
                Ver horários
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Location } from '../types';
import { agendaService } from '../services/agendaService';

interface LocationListProps {
  onLocationSelect: (location: Location) => void;
}

export const LocationList: React.FC<LocationListProps> = ({ onLocationSelect }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        const data = await agendaService.getLocations();
        setLocations(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar locais');
        console.error('Error fetching locations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Carregando locais...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-light text-slate-900 mb-4">Escolha um Local</h2>
        <p className="text-slate-600">Selecione onde você quer jogar</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {locations.map((location) => (
          <div
            key={location.id}
            onClick={() => onLocationSelect(location)}
            className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-slate-300 hover:shadow-lg cursor-pointer transition-all duration-200 group"
          >
            <h3 className="text-xl font-medium text-slate-900 mb-3 group-hover:text-slate-700">
              {location.name}
            </h3>
            <p className="text-slate-600 mb-6">
              {location.address}
            </p>
            <div className="flex items-center text-slate-500 text-sm font-medium group-hover:text-slate-700">
              Ver quadras disponíveis
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Quote } from '../types';
import { bookingService } from '../services/bookingService';

interface ExtrasFormProps {
  courtId: number;
  slotId: number;
  selectedExtras: string[];
  onExtrasChange: (extras: string[]) => void;
  onNotesChange: (notes: string) => void;
  onQuoteUpdate: (quote: Quote) => void;
  onNext: () => void;
  onBack: () => void;
}

const EXTRA_OPTIONS = [
  { id: 'ball', name: 'Bola', price: 5.0, description: 'Bola oficial do esporte' },
  { id: 'vest', name: 'Coletes', price: 8.0, description: 'Conjunto de coletes para equipes' },
  { id: 'lights', name: 'Iluminação', price: 12.0, description: 'Iluminação adicional noturna' },
];

export const ExtrasForm: React.FC<ExtrasFormProps> = ({
  courtId,
  slotId,
  selectedExtras,
  onExtrasChange,
  onNotesChange,
  onQuoteUpdate,
  onNext,
  onBack,
}) => {
  const [notes, setNotes] = useState('');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        const quoteData = await bookingService.getQuote(courtId, slotId, selectedExtras);
        setQuote(quoteData);
        onQuoteUpdate(quoteData);
      } catch (error) {
        console.error('Error fetching quote:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, [courtId, slotId, selectedExtras, onQuoteUpdate]);

  const handleExtraToggle = (extraId: string) => {
    const newExtras = selectedExtras.includes(extraId)
      ? selectedExtras.filter(id => id !== extraId)
      : [...selectedExtras, extraId];
    
    onExtrasChange(newExtras);
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    onNotesChange(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          ← Voltar
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Extras e Observações</h2>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Adicionais Disponíveis</h3>
        <div className="space-y-3">
          {EXTRA_OPTIONS.map((extra) => (
            <label
              key={extra.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedExtras.includes(extra.id)}
                  onChange={() => handleExtraToggle(extra.id)}
                  className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div>
                  <p className="font-medium text-gray-800">{extra.name}</p>
                  <p className="text-sm text-gray-600">{extra.description}</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-blue-600">
                R$ {extra.price.toFixed(2)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Observações</h3>
        <textarea
          value={notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Adicione observações sobre sua reserva..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Calculando...</span>
        </div>
      ) : quote && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4">Resumo da Reserva</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Valor base:</span>
              <span className="font-medium">R$ {quote.subtotal.toFixed(2)}</span>
            </div>
            {quote.extras.map((extra, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">+ {extra.type}:</span>
                <span>R$ {extra.price.toFixed(2)}</span>
              </div>
            ))}
            <hr className="border-gray-300" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-blue-600">R$ {quote.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Voltar
        </button>
        <button
          onClick={onNext}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Continuar para Pagamento
        </button>
      </div>
    </div>
  );
};

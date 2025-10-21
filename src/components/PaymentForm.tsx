import React, { useState } from 'react';
import { Quote } from '../types';

interface PaymentFormProps {
  quote: Quote;
  onPaymentSubmit: (method: string, coupon?: string) => void;
  onBack: () => void;
}

const PAYMENT_METHODS = [
  { id: 'CARD', name: 'Cartão de Crédito', description: 'Aprovação imediata' },
  { id: 'PIX', name: 'PIX', description: 'Pagamento instantâneo' },
  { id: 'BOLETO', name: 'Boleto Bancário', description: 'Pagamento em até 3 dias' },
];

export const PaymentForm: React.FC<PaymentFormProps> = ({
  quote,
  onPaymentSubmit,
  onBack,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [coupon, setCoupon] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod) return;

    setLoading(true);
    try {
      await onPaymentSubmit(selectedMethod, coupon || undefined);
    } finally {
      setLoading(false);
    }
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
        <h2 className="text-2xl font-bold text-gray-800">Pagamento</h2>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo da Reserva</h3>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Forma de Pagamento</h3>
          <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => (
              <label
                key={method.id}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={selectedMethod === method.id}
                    onChange={(e) => setSelectedMethod(e.target.value)}
                    className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{method.name}</p>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
                {method.id === 'CARD' && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Instantâneo
                  </span>
                )}
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Cupom de Desconto</h3>
          <div className="flex space-x-3">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Digite o código do cupom"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Aplicar
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={!selectedMethod || loading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Processando...' : 'Finalizar Pagamento'}
          </button>
        </div>
      </form>
    </div>
  );
};

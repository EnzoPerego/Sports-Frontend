import React from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <h1 className="text-2xl font-bold text-white">
                Sports Booking
              </h1>
              <nav className="hidden md:flex space-x-8">
                <Link 
                  to="/" 
                  className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
                >
                  Home
                </Link>
                <Link 
                  to="/booking" 
                  className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
                >
                  Reservar
                </Link>
                <Link 
                  to="/admin" 
                  className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
                >
                  Admin
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-6">
              <Link 
                to="/contact" 
                className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
              >
                Contato
              </Link>
              <Link 
                to="/cart" 
                className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
              >
                Carrinho
              </Link>
              <button className="text-white hover:text-gray-300 font-medium transition-colors duration-300">
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Simulation */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800">
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Simulated court elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-white/30 rounded-full"></div>
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border-2 border-white/20 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-white/25 rounded-full"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h2 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            SPORTS BOOKING
          </h2>
          <p className="text-xl md:text-2xl mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Da nossa quadra para sua diversão, com a mesma qualidade de sempre
          </p>
          <Link
            to="/booking"
            className="inline-block px-12 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Faça sua reserva!
          </Link>
        </div>

        {/* WhatsApp-like floating button */}
        <div className="absolute bottom-8 right-8">
          <button className="w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center">
            <span className="text-white text-xl">💬</span>
          </button>
        </div>
      </section>

      {/* Featured Courts Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              ESTRELAS SPORTS BOOKING
            </h3>
            <p className="text-xl text-gray-600 font-light">
              Conheça as quadras mais reservadas da casa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Court 1 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-6xl">⚽</span>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Quadra Central</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Nossa quadra principal de futebol, com gramado sintético de última geração e iluminação profissional.
                </p>
                <Link 
                  to="/booking" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                >
                  Adicionar ao carrinho →
                </Link>
              </div>
            </div>

            {/* Court 2 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <span className="text-6xl">🏀</span>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Quadra de Basquete</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Quadra coberta com piso de madeira profissional, ideal para jogos e treinos de basquete.
                </p>
                <Link 
                  to="/booking" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                >
                  Adicionar ao carrinho →
                </Link>
              </div>
            </div>

            {/* Court 3 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-6xl">🎾</span>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">Quadra de Tênis</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Quadra de saibro com dimensões oficiais, perfeita para partidas de tênis e aulas.
                </p>
                <Link 
                  to="/booking" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                >
                  Adicionar ao carrinho →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/booking"
              className="inline-block px-12 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Veja todas as quadras disponíveis
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Por que escolher nossa plataforma?
            </h3>
            <p className="text-xl text-gray-600 font-light">
              Oferecemos a melhor experiência em reservas esportivas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-800 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                <span className="text-white text-2xl">📍</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Localizações Múltiplas
              </h4>
              <p className="text-gray-600 leading-relaxed text-lg">
                Quadras espalhadas pela cidade, sempre próximas de você. 
                Encontre a localização ideal para sua prática esportiva.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gray-800 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                <span className="text-white text-2xl">⏰</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Horários Flexíveis
              </h4>
              <p className="text-gray-600 leading-relaxed text-lg">
                Reserve no horário que melhor se adequa à sua rotina. 
                Disponibilidade 24/7 para sua conveniência.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gray-800 rounded-2xl mx-auto mb-8 flex items-center justify-center">
                <span className="text-white text-2xl">💳</span>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Pagamento Simples
              </h4>
              <p className="text-gray-600 leading-relaxed text-lg">
                Pague como preferir: cartão, PIX ou boleto. 
                Processamento seguro e instantâneo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h4 className="text-2xl font-bold mb-4">Sports Booking</h4>
          <p className="text-gray-400 mb-8">
            A melhor plataforma para reservas esportivas
          </p>
          <p className="text-gray-500">
            © 2024 Sports Booking. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
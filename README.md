# Sports Frontend - Plataforma de Agendamento de Quadras

Frontend React para a plataforma de agendamento de quadras esportivas, desenvolvido com TypeScript, Vite e Tailwind CSS.

## 🚀 Tecnologias

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **React Hooks** - Gerenciamento de estado

## 📋 Funcionalidades

### 🏠 **Página Inicial**
- ✅ Interface moderna com navegação
- ✅ Cards informativos sobre o sistema
- ✅ Lista de esportes disponíveis
- ✅ Botões de acesso rápido

### 🏟️ **Sistema de Reservas**
- ✅ Seleção de local esportivo
- ✅ Escolha de quadra por esporte
- ✅ Visualização de horários disponíveis
- ✅ Adição de extras (bola, coletes, iluminação)
- ✅ Cálculo automático de preços
- ✅ Processamento de pagamento (simulado)
- ✅ Confirmação de reserva
- ✅ Interface responsiva e moderna

### 👨‍💼 **Painel Administrativo**
- ✅ Página protegida por autenticação
- ✅ Visualização de localizações e quadras
- ✅ Formulários para criar novas localizações
- ✅ Formulários para criar novas quadras
- ✅ Estatísticas em tempo real
- ✅ Interface administrativa intuitiva

### 🔐 **Autenticação Auth0**
- ✅ Login/logout integrado
- ✅ Proteção de rotas administrativas
- ✅ Perfil do usuário
- ✅ Controle de acesso baseado em roles

## 🏗️ Arquitetura

O frontend consome três serviços backend:

- **Sports-Agenda** (`/api/agenda`) - Locais, quadras e horários
- **Sports-Booking** (`/api/booking`) - Reservas e cotações
- **Sports-Payment** (`/api/payment`) - Pagamentos e faturas

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Backend services rodando (Sports-Agenda, Sports-Booking, Sports-Payment)

### Instalação
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### Configuração dos Backends

O frontend está configurado para usar os serviços remotos:

- **Sports-Agenda**: `http://18.231.197.236:8081`
- **Sports-Booking**: `http://18.231.197.236:8082` 
- **Sports-Payment**: `http://18.231.197.236:8083`

Os proxies estão configurados no `vite.config.ts` para redirecionar:
- `/api/agenda/*` → `http://18.231.197.236:8081/*`
- `/api/booking/*` → `http://18.231.197.236:8082/*`
- `/api/payment/*` → `http://18.231.197.236:8083/*`

### Configuração do Auth0

Para usar a autenticação, você precisa:

1. **Criar uma conta Auth0** em [auth0.com](https://auth0.com)
2. **Criar uma aplicação** Single Page Application
3. **Configurar as variáveis de ambiente**:

```bash
# Copie o arquivo de exemplo
cp env.example .env

# Edite com suas credenciais Auth0
REACT_APP_AUTH0_DOMAIN=seu-dominio.auth0.com
REACT_APP_AUTH0_CLIENT_ID=seu-client-id
REACT_APP_AUTH0_AUDIENCE=https://sports-booking-api
```

4. **Configurar roles** no Auth0 Dashboard para controle de acesso administrativo

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── BookingFlow.tsx  # Fluxo principal
│   ├── LocationList.tsx # Lista de locais
│   ├── CourtList.tsx    # Lista de quadras
│   ├── SlotList.tsx     # Lista de horários
│   ├── ExtrasForm.tsx   # Formulário de extras
│   ├── PaymentForm.tsx  # Formulário de pagamento
│   └── ConfirmationPage.tsx # Página de confirmação
├── services/            # Clientes de API
│   ├── agendaService.ts
│   ├── bookingService.ts
│   └── paymentService.ts
├── hooks/               # Hooks personalizados
│   └── useBookingFlow.ts
├── types/               # Definições TypeScript
│   └── index.ts
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 🎨 Design

Interface moderna e responsiva com:
- Design mobile-first
- Cores consistentes (azul, verde, cinza)
- Animações suaves
- Estados de loading e erro
- Indicador de progresso
- Feedback visual para ações

## 🔄 Fluxo de Reserva

1. **Local** → Usuário escolhe o local esportivo
2. **Quadra** → Seleciona quadra por esporte
3. **Horário** → Escolhe data e horário disponível
4. **Extras** → Adiciona serviços extras e observações
5. **Pagamento** → Escolhe forma de pagamento
6. **Confirmação** → Recebe confirmação da reserva

## 🛠️ Desenvolvimento

### Adicionando Novos Componentes
```bash
# Criar novo componente
touch src/components/NewComponent.tsx
```

### Modificando Serviços
Os serviços de API estão em `src/services/` e podem ser facilmente modificados para ajustar endpoints ou adicionar novas funcionalidades.

### Customizando Estilos
O projeto usa Tailwind CSS. Para estilos customizados, modifique `src/index.css` ou adicione classes Tailwind nos componentes.

## 📝 Notas

- O frontend é totalmente funcional e integrado com os três serviços backend
- Todos os estados de erro são tratados com feedback visual
- A aplicação é responsiva e funciona em dispositivos móveis
- O código está bem tipado com TypeScript para melhor manutenibilidade
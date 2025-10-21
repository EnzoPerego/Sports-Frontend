# Como executar o Sports Frontend

## 1. Instalar dependências
```bash
npm install
```

## 2. Executar em modo desenvolvimento
```bash
npm run dev
```

O frontend estará disponível em: http://localhost:3000

## 3. Pré-requisitos - Backend Services

Para o frontend funcionar completamente, você precisa ter os três serviços backend rodando:

### Sports-Agenda (Porta 8000)
```bash
cd ../Sports-Agenda
# Instalar dependências e executar
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Sports-Booking (Porta 8001)
```bash
cd ../Sports-Booking
# Instalar dependências e executar
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8001
```

### Sports-Payment (Porta 8002)
```bash
cd ../Sports-Payment
# Instalar dependências e executar
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8002
```

## 4. Fluxo de Teste

1. Acesse http://localhost:3000
2. Escolha um local esportivo
3. Selecione uma quadra
4. Escolha um horário disponível
5. Adicione extras (bola, coletes, iluminação)
6. Escolha forma de pagamento
7. Confirme a reserva

## 5. Build para Produção
```bash
npm run build
```

Os arquivos de produção estarão na pasta `dist/`.

## 6. Preview do Build
```bash
npm run preview
```

## Notas Importantes

- O frontend usa proxies configurados no Vite para redirecionar chamadas API
- Certifique-se de que todos os serviços backend estão rodando antes de testar
- O banco de dados PostgreSQL deve estar configurado e populado com dados de teste
- Para desenvolvimento, você pode usar dados mockados modificando os serviços de API

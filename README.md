# 🏰 Tibia Watcher - Inabra

Uma aplicação web para rastrear guilds e jogadores online do servidor Inabra do Tibia.

## 🚀 Funcionalidades

- **Listagem de Guilds**: Busca e exibe todas as guilds ativas do servidor Inabra
- **Seleção de Guild**: Dropdown interativo para selecionar uma guild específica
- **Interface Moderna**: Design responsivo com Material-UI
- **API Integration**: Integração com a API oficial do TibiaData

## 🛠️ Tecnologias

- **React 19** - Framework JavaScript
- **TypeScript** - Linguagem tipada
- **Vite** - Build tool e servidor de desenvolvimento
- **Material-UI** - Biblioteca de componentes
- **Axios** - Cliente HTTP para requisições
- **React Router** - Roteamento

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Criar build de produção
npm run build
```

## 🌐 API

A aplicação utiliza a API do TibiaData para buscar informações sobre guilds:

- **Endpoint**: `https://api.tibiadata.com/v4/guilds/Inabra`
- **Documentação**: [TibiaData API](https://tibiadata.com/doc-api-v4/)

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── GuildSelect.tsx  # Select dropdown para guilds
├── pages/              # Páginas da aplicação
│   └── TrackOnline.tsx # Página principal
├── services/           # Serviços e APIs
│   └── tibiaApi.ts    # Serviço da API do Tibia
├── types/             # Definições TypeScript
│   └── tibia.ts       # Tipos da API do Tibia
└── App.tsx            # Componente principal
```

## 🎯 Próximas Funcionalidades

- [ ] Rastreamento de membros online por guild
- [ ] Histórico de jogadores online
- [ ] Notificações quando jogadores ficam online/offline
- [ ] Filtros avançados por nível e vocação
- [ ] Dashboard com estatísticas

## 🚀 Executando o Projeto

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview do build
npm run preview
```

A aplicação estará disponível em `http://localhost:5174` (ou outra porta se 5174 estiver ocupada).

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 🎨 Interface

A aplicação possui uma interface moderna e responsiva com:
- Barra de navegação com tema do Tibia
- Cards com informações das guilds
- Dropdown interativo para seleção
- Loading states e tratamento de erros
- Design responsivo para mobile e desktop
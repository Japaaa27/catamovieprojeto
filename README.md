# 🎬 CataMovie

Um catálogo de filmes simples e minimalista construído com React, Express e PostgreSQL.

## 📦 Tecnologias

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Express.js + TypeScript
- **Banco de Dados**: PostgreSQL 16
- **ORM**: Drizzle ORM

## 🚀 Como rodar localmente

### 1. Clonar o repositório

```bash
git clone [url-do-seu-repositorio]
cd catamovie
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar banco de dados

Crie um arquivo `.env` na raiz do projeto (use `.env.example` como base):

```.env
exemplos: DATABASE_URL="connection string do Neon"
```

**Opções de banco:**
- **Neon** (recomendado): https://neon.tech
- **Supabase**: https://supabase.com
- **Local**: Instale PostgreSQL no seu computador

### 4. Configurar o schema do banco

```bash
npm run db:push
```

### 5. Popular com dados reais

**OPÇÃO A - Seed automático (recomendado):**

```bash
npx tsx server/seed.ts
```

Isso vai inserir os 6 filmes reais do projeto automaticamente!

**OPÇÃO B - Importar SQL:**

Se você tiver o arquivo `database_backup.sql`:

```bash
psql "sua_url_do_banco" < database_backup.sql
```

### 6. Rodar o .setup-windows.bat
```bash


### 7. Rodar o projeto

```bash
$env:NODE_ENV="development"; npx tsx server/index-dev.ts
```

Acesse: http://localhost:5000

## 📁 Estrutura do Projeto

```
catamovie/
├── client/              # Frontend React
│   ├── index.html
│   └── src/
│       ├── main.tsx     # Aplicação completa (232 linhas!)
│       └── index.css
├── server/              # Backend Express
│   ├── routes.ts        # API endpoints
│   ├── storage.ts       # Lógica de banco de dados
│   └── app.ts
├── shared/
│   └── schema.ts        # Schema do banco (Drizzle)
└── db/
    └── index.ts         # Conexão PostgreSQL
```

## 🎯 Funcionalidades

- ✅ Listar filmes
- ✅ Adicionar novos filmes
- ✅ Editar filmes existentes
- ✅ Deletar filmes
- ✅ Sistema de avaliação (1-5 estrelas)
- ✅ Upload de URL de pôster
- ✅ Dados reais incluídos (6 filmes clássicos)

## 🎬 Filmes incluídos

O projeto vem com 6 filmes clássicos pré-cadastrados:
1. O Poderoso Chefão (1972)
2. Pulp Fiction (1994)
3. Clube da Luta (1999)
4. Matrix (1999)
5. Interestelar (2014)
6. A Origem (2010)

## 🔒 Segurança

**IMPORTANTE:**
- Nunca comite o arquivo `.env` no Git
- Nunca compartilhe sua `DATABASE_URL`
- Use variáveis de ambiente para dados sensíveis

## 📝 Scripts disponíveis

```bash
npm run dev              # Roda em modo desenvolvimento
npm run build            # Build para produção
npm run db:push          # Sincroniza schema com banco
npx tsx server/seed.ts   # Popula banco com dados reais
```

## 🌐 Deploy

Para fazer deploy:
1. Configure as variáveis de ambiente no servidor
2. Rode `npm run build`
3. Rode `npm start` (produção)


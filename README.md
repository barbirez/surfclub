# EasySurf 🏄

> **Alugue a prancha certa para as condições de hoje**

Assinatura de aluguel de pranchas com reserva simples: escolha, confirme datas, pegue, surfe e devolva.

---

## Stack

| Tecnologia | Função |
|---|---|
| Next.js 16 (App Router) | Framework full-stack |
| TypeScript strict | Tipagem |
| Tailwind CSS 4 | Estilização |
| TanStack Query | Data fetching client |
| Prisma 6 | ORM + migrations (PostgreSQL) |
| Zod | Validação |
| Auth.js v5 | Autenticação (Google + Magic Link) |
| Stripe | Pagamentos |
| shadcn/ui | Componentes UI |
| Resend | Emails transacionais |
| design-system/tokens.ts | Source of truth dos design tokens |

## Hospedagem recomendada

| Serviço | Função | Tier |
|---|---|---|
| Vercel | App hosting | Free |
| Neon | PostgreSQL | Free |
| Resend | Emails | Free (3k/mês) |
| Stripe | Pagamentos | Test mode |

---

## Configuração

### 1. Clone e instale as dependências

```bash
git clone <repo>
cd surfclub
npm install
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Preencha todas as variáveis:

```env
DATABASE_URL=          # Neon PostgreSQL connection string
AUTH_SECRET=           # openssl rand -base64 32
AUTH_GOOGLE_ID=        # Google Cloud Console
AUTH_GOOGLE_SECRET=
AUTH_RESEND_KEY=       # Resend API Key
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_PRO=
NEXT_PUBLIC_APP_URL=http://localhost:3000
RESEND_API_KEY=
```

### 3. Configure o banco de dados

```bash
npm run db:push       # Aplica o schema ao banco
npm run db:generate   # Gera o cliente Prisma
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## Design System

Os tokens de design vivem em `design-system/tokens.ts` como fonte única de verdade.

```bash
npm run tokens        # Gera CSS custom properties no globals.css
npm run tokens:check  # Verifica se tokens estão sincronizados (CI)
```

**Regra:** nunca use hex hardcoded nos componentes. Use tokens semânticos Tailwind (`bg-primary`, `text-foreground`, etc).

---

## Estrutura de rotas

```
/                          → Landing page
/login                     → Login (Google + Magic Link)
/pricing                   → Planos de assinatura

/dashboard                 → Dashboard (autenticado)
/boards                    → Lista de pranchas com filtros
/boards/[id]               → Detalhe + formulário de reserva
/reservations              → Minhas reservas
/settings/billing          → Faturamento e gerenciamento do plano

/api/auth/[...nextauth]    → Auth.js handlers
/api/boards                → GET pranchas com filtros
/api/boards/[id]/availability → GET datas indisponíveis
/api/reservations          → POST criar / GET listar reservas
/api/stripe/checkout       → POST iniciar checkout
/api/stripe/portal         → POST abrir portal do cliente
/api/stripe/webhook        → POST webhook Stripe
```

---

## Modelos de dados

- **User** — autenticação, plano, Stripe
- **Location** — localização com instruções de retirada/devolução
- **Surfboard** — prancha com specs e perfil de condições
- **RentalPlan** — planos de aluguel com limites de dias
- **Reservation** — reservas com status e datas
- **Availability** — controle de disponibilidade por data
- **LiabilityAcceptance** — aceite de termos por reserva

---

## Fluxo de planos

1. Cadastro → `plan=TRIAL`, `trialEndsAt=now+14dias`
2. Trial ativo → acesso total + banner "X dias restantes"
3. Trial expirado → bloqueado → redirect `/pricing`
4. Pagou → `plan=PRO` → acesso total
5. Cancelou → `plan=FREE` → acesso até fim do período

---

## Configuração do Stripe

1. Crie um produto "EasySurf PRO" no Stripe Dashboard
2. Crie um preço recorrente de R$ 289/mês
3. Copie o `price_id` para `STRIPE_PRICE_ID_PRO`
4. Configure o webhook endpoint para `/api/stripe/webhook`
5. Eventos: `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.updated`, `customer.subscription.deleted`

---

## Configuração do Google OAuth

1. Acesse [Google Cloud Console](https://console.cloud.google.com)
2. Crie um projeto OAuth 2.0
3. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
4. Copie Client ID e Secret para `.env`

---

## Deploy na Vercel

```bash
# Instale a Vercel CLI
npm install -g vercel

# Faça login e deploy
vercel login
vercel

# Configure todas as env vars
vercel env add DATABASE_URL
vercel env add AUTH_SECRET
# ... (repita para todas as variáveis)

vercel --prod
```

---

## Scripts disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run db:push      # Aplica schema ao banco
npm run db:generate  # Gera Prisma Client
npm run db:studio    # Abre Prisma Studio
npm run tokens       # Sincroniza design tokens → globals.css
npm run tokens:check # Verifica sincronização (CI)
```

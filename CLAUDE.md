# EasySurf — Convenções do projeto para agentes AI

## Produto
Plataforma SaaS de assinatura de aluguel de pranchas de surf. Usuários pagam R$ 289/mês para reservar pranchas.

## Stack
- Next.js 16 (App Router) + TypeScript strict
- Tailwind CSS 4 + shadcn/ui (componentes)
- Prisma 6 + PostgreSQL (Neon)
- Auth.js v5 (Google OAuth + Resend Magic Link)
- Stripe (subscriptions)
- TanStack Query (client-side data fetching)
- Zod (validação)
- Resend (emails)
- Sonner (toasts — NÃO usar toast do shadcn, está deprecated)

## Regras críticas

### Imports
- Use `@/` para imports absolutos do src/ (ex: `@/lib/db`, `@/components/ui/button`)
- Nunca importe Auth.js no middleware — estoura o limite de 1MB do Vercel Edge

### Design System
- **NUNCA** use hex hardcoded nos componentes
- Use tokens semânticos Tailwind: `bg-primary`, `text-foreground`, `border-border`, etc.
- Se precisar mudar cores, edite `design-system/tokens.ts` e rode `npm run tokens`
- Cores: primary=#3366FF, background=#1A1D29, accent=#F5C542

### Autenticação / Planos
- `hasAccess(user)` = TRIAL ativo OR PRO ativo
- FREE users: podem navegar e ver pranchas, mas NÃO podem reservar
- TRIAL: 14 dias grátis ao criar conta, tudo ilimitado
- PRO: pago, tudo ilimitado
- Middleware usa cookie `authjs.session-token` (não Auth.js diretamente)

### Stripe
- Lazy init em `lib/stripe.ts` — nunca instanciar no top-level do módulo
- API version: sem definir (usa default do Stripe) 
- `current_period_end` não existe na Subscription v22+, use `invoice.period_end`

### Banco de dados
- `db` client em `lib/db.ts` com singleton pattern
- Prisma 6 (não 7 — breaking changes na config do datasource)

### Formulário de reserva
- O `ReservationForm` tem 3 etapas: calendar → disclosure → success
- Liability acceptance é obrigatório antes de confirmar
- Versão dos termos em `LIABILITY_VERSION = "v1.0"`

## Estrutura de pastas
```
src/
├── app/
│   ├── (auth)/          # Rotas protegidas pelo middleware
│   ├── (public)/        # Rotas públicas (login, pricing)
│   ├── api/             # API routes
│   └── page.tsx         # Landing page
├── components/
│   ├── boards/          # Filtros e card de prancha
│   ├── layout/          # Header, Providers
│   ├── paywall/         # PaywallGate, TrialBanner
│   ├── reservations/    # ReservationForm
│   └── ui/              # shadcn/ui components
├── lib/
│   ├── auth.ts          # Auth.js config
│   ├── db.ts            # Prisma singleton
│   ├── email.ts         # Resend (lazy init)
│   ├── stripe.ts        # Stripe (lazy init + proxy)
│   ├── subscription.ts  # hasAccess, isTrialActive, PLAN_LIMITS
│   └── validations.ts   # Zod schemas
└── middleware.ts        # Cookie-based auth (sem Auth.js import)
```

## Comandos úteis
```bash
npm run dev              # Dev server
npm run db:push          # Aplicar schema
npm run db:studio        # Prisma Studio
npm run tokens           # Sincronizar design tokens
```

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { hasAccess, isSubscribed } from "@/lib/subscription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Search, CalendarDays, Waves, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      reservations: {
        where: { status: { in: ["CONFIRMED", "ACTIVE"] } },
        include: {
          surfboard: true,
          pickupLocation: true,
        },
        orderBy: { startDate: "asc" },
        take: 3,
      },
    },
  });

  if (!user) redirect("/login");

  const access = hasAccess(user);
  const subscribed = isSubscribed(user);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">
          Olá, {user.name?.split(" ")[0] || "Surfista"} 👋
        </h1>
        <p className="text-muted-foreground">
          {access
            ? "Pronto para as ondas de hoje?"
            : "Escolha um plano para começar a reservar pranchas."}
        </p>
      </div>

      {/* Status cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Status do Plano
            </CardTitle>
            <Waves className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {subscribed ? "PRO" : "Free"}
              </span>
              <Badge
                variant={access ? "default" : "secondary"}
                className={access ? "bg-primary/20 text-primary border-primary/30" : ""}
              >
                {access ? "Ativo" : "Inativo"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Reservas Ativas
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.reservations.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">confirmadas / ativas</p>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ações rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button asChild size="sm" className="flex-1">
              <Link href="/boards">
                <Search className="mr-1.5 h-4 w-4" />
                Explorar Pranchas
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="flex-1">
              <Link href="/reservations">
                <CalendarDays className="mr-1.5 h-4 w-4" />
                Minhas Reservas
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade CTA */}
      {!access && (
        <Card className="border-accent/30 bg-accent/5">
          <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <TrendingUp className="mt-0.5 h-5 w-5 text-accent shrink-0" />
              <div>
                <p className="font-semibold">Desbloqueie as reservas</p>
                <p className="text-sm text-muted-foreground">
                  Assine o WavyClub e comece a reservar pranchas para as condições de hoje.
                </p>
              </div>
            </div>
            <Button
              asChild
              className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
            >
              <Link href="/pricing">Ver planos — R$ 289/mês</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Upcoming reservations */}
      {user.reservations.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Próximas Reservas</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {user.reservations.map((r) => (
              <Card key={r.id} className="border-border/50">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm">{r.surfboard.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {r.pickupLocation.city}, {r.pickupLocation.town}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        r.status === "ACTIVE"
                          ? "bg-green-500/15 text-green-400 border-green-500/20"
                          : "bg-primary/15 text-primary border-primary/20"
                      }
                    >
                      {r.status === "ACTIVE" ? "Ativa" : "Confirmada"}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>
                      {format(r.startDate, "dd/MM", { locale: ptBR })} →{" "}
                      {format(r.endDate, "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

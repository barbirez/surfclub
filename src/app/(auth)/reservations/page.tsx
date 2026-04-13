"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import {
  ReservationDetailModal,
  type ReservationDetail,
} from "@/components/reservations/ReservationDetailModal";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendente",
  CONFIRMED: "Confirmada",
  ACTIVE: "Ativa",
  RETURNED: "Devolvida",
  CANCELLED: "Cancelada",
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  CONFIRMED: "bg-primary/10 text-primary border-primary/20",
  ACTIVE: "bg-green-500/10 text-green-400 border-green-500/20",
  RETURNED: "bg-muted text-muted-foreground border-muted",
  CANCELLED: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<ReservationDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ReservationDetail | null>(null);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reservations");
      const data = await res.json();
      setReservations(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  function handleCancelled(id: string) {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "CANCELLED" } : r))
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Minhas Reservas</h1>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-secondary/50 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Minhas Reservas</h1>
          <p className="text-muted-foreground mt-1">
            {reservations.length} reserva{reservations.length !== 1 ? "s" : ""} no total
          </p>
        </div>

        {reservations.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
            <div className="text-5xl mb-4">📅</div>
            <p className="font-semibold text-lg">Nenhuma reserva ainda</p>
            <p className="text-muted-foreground text-sm mt-1">
              Explore as pranchas disponíveis e faça sua primeira reserva.
            </p>
            <Link
              href="/boards"
              className="mt-4 inline-flex items-center gap-1.5 text-primary text-sm hover:underline"
            >
              Ver pranchas disponíveis →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {reservations.map((r) => (
              <Card
                key={r.id}
                className="border-border/50 cursor-pointer transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
                onClick={() => setSelected(r)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                        {r.surfboard.images[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={r.surfboard.images[0]}
                            alt={r.surfboard.name}
                            className="h-full w-full object-contain p-1"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-2xl opacity-30">🏄</div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{r.surfboard.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {r.surfboard.type} · {r.surfboard.size}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {r.pickupLocation.city}, {r.pickupLocation.town}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary" className={STATUS_STYLES[r.status]}>
                        {STATUS_LABELS[r.status]}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {format(new Date(r.startDate), "dd/MM/yyyy", { locale: ptBR })} →{" "}
                        {format(new Date(r.endDate), "dd/MM/yyyy", { locale: ptBR })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ReservationDetailModal
        reservation={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onCancelled={handleCancelled}
      />
    </>
  );
}

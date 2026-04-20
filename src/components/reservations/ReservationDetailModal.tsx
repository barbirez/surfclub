"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  MapPin,
  Ruler,
  Droplets,
  AlertTriangle,
  ExternalLink,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import Link from "next/link";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendente",
  CONFIRMED: "Confirmada",
  ACTIVE: "Ativa",
  RETURNED: "Devolvida",
  CANCELLED: "Cancelada",
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  CONFIRMED: "bg-primary/15 text-primary-light border-primary/30",
  ACTIVE: "bg-green-500/15 text-green-300 border-green-500/30",
  RETURNED: "bg-muted/60 text-muted-foreground border-border",
  CANCELLED: "bg-destructive/15 text-destructive border-destructive/30",
};

export type ReservationDetail = {
  id: string;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  surfboard: {
    id: string;
    name: string;
    type: string;
    size: string;
    volumeLiters: number;
    images: string[];
    shaper?: string | null;
  };
  pickupLocation: {
    city: string;
    town: string;
    address: string;
    pickupInstructions: string;
    returnInstructions: string;
  };
};

interface ReservationDetailModalProps {
  reservation: ReservationDetail | null;
  open: boolean;
  onClose: () => void;
  onCancelled: (id: string) => void;
}

const BOARD_TYPE_LABELS: Record<string, string> = {
  SHORTBOARD: "Shortboard",
  LONGBOARD: "Longboard",
  FISH: "Fish",
  FUNBOARD: "Funboard",
  GUN: "Gun",
  SUP: "SUP",
  FOIL: "Foil",
};

export function ReservationDetailModal({
  reservation,
  open,
  onClose,
  onCancelled,
}: ReservationDetailModalProps) {
  const [cancelling, setCancelling] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!reservation) return null;

  const canCancel = ["PENDING", "CONFIRMED"].includes(reservation.status);
  const startDate = new Date(reservation.startDate);
  const endDate = new Date(reservation.endDate);
  const nights = Math.round(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  async function handleCancel() {
    if (!reservation) return;
    setCancelling(true);
    try {
      const res = await fetch(`/api/reservations/${reservation.id}/cancel`, {
        method: "PATCH",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao cancelar.");
      }
      toast.success("Reserva cancelada com sucesso.");
      onCancelled(reservation.id);
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao cancelar.");
    } finally {
      setCancelling(false);
      setShowConfirm(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          onClose();
          setShowConfirm(false);
        }
      }}
    >
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* ── Header ── */}
        <DialogHeader className="px-5 pt-5 pb-4 pr-12 border-b border-border/60">
          <DialogTitle className="text-base font-semibold">
            Detalhes da Reserva
          </DialogTitle>
          <Badge
            variant="secondary"
            className={`self-start ${STATUS_STYLES[reservation.status]}`}
          >
            {STATUS_LABELS[reservation.status]}
          </Badge>
        </DialogHeader>

        <div className="px-5 py-4 space-y-5">
          {/* ── Board ── */}
          <div className="flex items-start gap-4">
            {/* Thumbnail */}
            <div className="h-28 w-20 shrink-0 overflow-hidden rounded-xl bg-secondary border border-border/60">
              {reservation.surfboard.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={reservation.surfboard.images[0]}
                  alt={reservation.surfboard.name}
                  className="h-full w-full object-contain p-2"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl opacity-20">
                  🏄
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pt-0.5">
              <p className="font-bold text-base leading-tight">
                {reservation.surfboard.name}
              </p>
              {reservation.surfboard.shaper && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {reservation.surfboard.shaper}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                <Badge variant="secondary" className="text-xs h-5 px-2">
                  {BOARD_TYPE_LABELS[reservation.surfboard.type] ||
                    reservation.surfboard.type}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Ruler className="h-3 w-3" />
                  {reservation.surfboard.size}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Droplets className="h-3 w-3" />
                  {reservation.surfboard.volumeLiters}L
                </span>
              </div>

              <Button
                asChild
                variant="ghost"
                size="sm"
                className="mt-2 -ml-2 h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <Link
                  href={`/boards/${reservation.surfboard.id}`}
                  onClick={onClose}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Ver prancha
                </Link>
              </Button>
            </div>
          </div>

          {/* ── Dates ── */}
          <div className="rounded-xl bg-secondary/60 border border-border/60 p-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Período
            </p>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary-light shrink-0" />
              <span className="text-sm font-semibold">
                {format(startDate, "dd 'de' MMMM", { locale: ptBR })}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-sm font-semibold">
                {format(endDate, "dd 'de' MMMM", { locale: ptBR })}
              </span>
            </div>
            <p className="text-xs text-muted-foreground pl-6">
              {nights} dia{nights !== 1 ? "s" : ""} de aluguel
            </p>
          </div>

          {/* ── Location + Instructions ── */}
          <div className="rounded-xl bg-secondary/60 border border-border/60 p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Local
            </p>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-primary-light shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold">
                  {reservation.pickupLocation.town},{" "}
                  {reservation.pickupLocation.city}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {reservation.pickupLocation.address}
                </p>
              </div>
            </div>

            {reservation.status !== "CANCELLED" && (
              <div className="grid gap-2 pt-1">
                {/* Pickup */}
                <div className="rounded-lg bg-background/60 border border-border p-3 space-y-1">
                  <p className="text-xs font-semibold text-foreground">
                    Retirada
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {reservation.pickupLocation.pickupInstructions}
                  </p>
                </div>
                {/* Return */}
                <div className="rounded-lg bg-background/60 border border-border p-3 space-y-1">
                  <p className="text-xs font-semibold text-foreground">
                    Devolução
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {reservation.pickupLocation.returnInstructions}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Footer meta ── */}
          <p className="text-[11px] text-muted-foreground/60 text-right">
            <span className="font-mono">{reservation.id.slice(0, 10)}…</span>
            {" · "}
            {format(new Date(reservation.createdAt), "dd/MM/yyyy", {
              locale: ptBR,
            })}
          </p>

          {/* ── Cancel section ── */}
          {canCancel && (
            <>
              {!showConfirm ? (
                <Button
                  variant="outline"
                  className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
                  onClick={() => setShowConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Cancelar reserva
                </Button>
              ) : (
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-destructive">
                        Confirmar cancelamento
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Essa ação não pode ser desfeita. A prancha voltará a
                        ficar disponível.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setShowConfirm(false)}
                      disabled={cancelling}
                    >
                      Voltar
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={handleCancel}
                      disabled={cancelling}
                    >
                      {cancelling ? "Cancelando…" : "Sim, cancelar"}
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  MapPin,
  Ruler,
  Droplets,
  AlertTriangle,
  ExternalLink,
  X,
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
  PENDING: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  CONFIRMED: "bg-primary/10 text-primary border-primary/20",
  ACTIVE: "bg-green-500/10 text-green-400 border-green-500/20",
  RETURNED: "bg-muted text-muted-foreground border-muted",
  CANCELLED: "bg-destructive/10 text-destructive border-destructive/20",
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
    <Dialog open={open} onOpenChange={(v) => { if (!v) { onClose(); setShowConfirm(false); } }}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between gap-3">
            <DialogTitle className="text-lg">Detalhes da Reserva</DialogTitle>
            <Badge variant="secondary" className={STATUS_STYLES[reservation.status]}>
              {STATUS_LABELS[reservation.status]}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-5">
          {/* Board */}
          <div className="flex items-center gap-4">
            <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
              {reservation.surfboard.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={reservation.surfboard.images[0]}
                  alt={reservation.surfboard.name}
                  className="h-full w-full object-contain p-1"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl opacity-20">🏄</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base leading-tight">{reservation.surfboard.name}</p>
              {reservation.surfboard.shaper && (
                <p className="text-xs text-muted-foreground mt-0.5">{reservation.surfboard.shaper}</p>
              )}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {BOARD_TYPE_LABELS[reservation.surfboard.type] || reservation.surfboard.type}
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
            </div>
            <Button asChild variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
              <Link href={`/boards/${reservation.surfboard.id}`} onClick={onClose}>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Separator />

          {/* Dates */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Período</p>
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="h-4 w-4 text-primary shrink-0" />
              <span className="font-medium">
                {format(startDate, "dd 'de' MMMM", { locale: ptBR })}
              </span>
              <span className="text-muted-foreground">→</span>
              <span className="font-medium">
                {format(endDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </span>
            </div>
            <p className="text-xs text-muted-foreground pl-6">
              {nights} dia{nights !== 1 ? "s" : ""} de aluguel
            </p>
          </div>

          <Separator />

          {/* Location */}
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Local</p>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{reservation.pickupLocation.town}, {reservation.pickupLocation.city}</p>
                <p className="text-xs text-muted-foreground">{reservation.pickupLocation.address}</p>
              </div>
            </div>
          </div>

          {/* Pickup instructions */}
          {reservation.status !== "CANCELLED" && (
            <div className="space-y-3">
              <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 space-y-1">
                <p className="text-xs font-semibold text-primary">Retirada</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {reservation.pickupLocation.pickupInstructions}
                </p>
              </div>
              <div className="rounded-lg bg-secondary/50 border border-border p-3 space-y-1">
                <p className="text-xs font-semibold">Devolução</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {reservation.pickupLocation.returnInstructions}
                </p>
              </div>
            </div>
          )}

          <Separator />

          {/* Footer info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>ID: <span className="font-mono">{reservation.id.slice(0, 8)}…</span></span>
            <span>Criada em {format(new Date(reservation.createdAt), "dd/MM/yyyy", { locale: ptBR })}</span>
          </div>

          {/* Cancel section */}
          {canCancel && (
            <>
              <Separator />
              {!showConfirm ? (
                <Button
                  variant="outline"
                  className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => setShowConfirm(true)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar reserva
                </Button>
              ) : (
                <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-destructive">Confirmar cancelamento</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Essa ação não pode ser desfeita. A prancha voltará a ficar disponível.
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
                      {cancelling ? "Cancelando..." : "Sim, cancelar"}
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

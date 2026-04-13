"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CalendarDays,
  CheckCircle2,
  Lock,
  Waves,
  MapPin,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { format, addDays, startOfDay } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import confetti from "canvas-confetti";

interface ReservationModalProps {
  surfboardId: string;
  locationId: string;
  boardName: string;
  boardImage?: string;
  pickupInstructions: string;
  returnInstructions: string;
  unavailableDates: string[];
  hasAccess: boolean;
  isLoggedIn?: boolean;
}

export function ReservationModal({
  surfboardId,
  locationId,
  boardName,
  boardImage,
  pickupInstructions,
  returnInstructions,
  unavailableDates,
  hasAccess,
  isLoggedIn = true,
}: ReservationModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"calendar" | "confirm" | "success">("calendar");
  const [range, setRange] = useState<DateRange | undefined>();
  const [loading, setLoading] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const celebrationFiredRef = useRef(false);

  const today = startOfDay(new Date());
  const disabledDays = [
    { before: addDays(today, 1) },
    ...unavailableDates.map((d) => new Date(d)),
  ];

  const nights =
    range?.from && range?.to
      ? Math.round((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  function handleOpen() {
    setStep("calendar");
    setRange(undefined);
    setCelebrating(false);
    celebrationFiredRef.current = false;
    setOpen(true);
  }

  useEffect(() => {
    if (step !== "success" || celebrationFiredRef.current) return;
    celebrationFiredRef.current = true;
    setCelebrating(true);

    // Wave 1 — gentle spray from bottom-left
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 1 },
        colors: ["#3366FF", "#F5C542", "#ffffff", "#60efff"],
        gravity: 0.8,
        scalar: 0.9,
      });
    }, 300);

    // Wave 2 — gentle spray from bottom-right
    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 1 },
        colors: ["#3366FF", "#F5C542", "#ffffff", "#60efff"],
        gravity: 0.8,
        scalar: 0.9,
      });
    }, 500);

    // Wave 3 — big centre burst (the explosion)
    setTimeout(() => {
      confetti({
        particleCount: 160,
        angle: 90,
        spread: 100,
        origin: { x: 0.5, y: 0.6 },
        colors: ["#3366FF", "#F5C542", "#ffffff", "#60efff", "#a78bfa"],
        gravity: 0.7,
        scalar: 1.1,
        ticks: 200,
      });
    }, 750);

    // Wave 4 — trailing sparkle
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 90,
        spread: 60,
        origin: { x: 0.5, y: 0.5 },
        colors: ["#F5C542", "#ffffff", "#ffd700"],
        gravity: 0.5,
        scalar: 0.7,
        shapes: ["star"],
        ticks: 250,
      });
      setCelebrating(false);
    }, 1200);
  }, [step]);

  async function handleSubmit() {
    if (!range?.from || !range?.to) return;
    setLoading(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surfboardId,
          startDate: range.from.toISOString(),
          endDate: range.to.toISOString(),
          pickupLocationId: locationId,
          liabilityAccepted: true,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao criar reserva.");
      }
      setStep("success");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro ao criar reserva.");
    } finally {
      setLoading(false);
    }
  }

  // ── Trigger button ──────────────────────────────────────────────────────────

  if (!isLoggedIn) {
    return (
      <Button
        className="w-full h-11 font-semibold text-base"
        onClick={() =>
          router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`)
        }
      >
        <Waves className="h-4 w-4 mr-2" />
        Quero essa prancha
      </Button>
    );
  }

  if (!hasAccess) {
    return (
      <Button
        className="w-full h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
        onClick={() => router.push("/#pricing")}
      >
        <Lock className="h-4 w-4 mr-2" />
        Ver planos para reservar
      </Button>
    );
  }

  return (
    <>
      <Button className="w-full h-11 font-semibold text-base" onClick={handleOpen}>
        <Waves className="h-4 w-4 mr-2" />
        Quero essa prancha
      </Button>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          if (!v && step !== "success") setOpen(false);
        }}
      >
        <DialogContent className="max-w-md">

          {/* ── SUCCESS ──────────────────────────────────────── */}
          {step === "success" && (
            <div className="py-2 text-center space-y-5" style={{ animation: "successEntrance 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}>
              <style>{`
                @keyframes successEntrance {
                  from { opacity: 0; transform: scale(0.85) translateY(12px); }
                  to   { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes iconPop {
                  0%   { transform: scale(0); opacity: 0; }
                  60%  { transform: scale(1.25); opacity: 1; }
                  100% { transform: scale(1); }
                }
                @keyframes wavingHand {
                  0%, 100% { transform: rotate(-10deg); }
                  50%      { transform: rotate(14deg); }
                }
              `}</style>

              <div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/30"
                style={{ animation: "iconPop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.1s both" }}
              >
                <span style={{ fontSize: 40, display: "inline-block", transformOrigin: "70% 80%", animation: "wavingHand 0.5s ease-in-out 0.9s 4" }}>
                  🏄
                </span>
              </div>

              <div>
                <p className="text-2xl font-extrabold tracking-tight">Vai nas ondas!</p>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Reserva confirmada. Você vai receber<br />um e-mail com os detalhes de retirada.
                </p>
              </div>

              {range?.from && range?.to && (
                <div className="rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-left space-y-1.5">
                  <p className="font-semibold">{boardName}</p>
                  <p className="text-muted-foreground text-xs">
                    {format(range.from, "dd 'de' MMMM", { locale: ptBR })}
                    {" → "}
                    {format(range.to, "dd 'de' MMMM", { locale: ptBR })}
                    {" · "}
                    {nights} dia{nights !== 1 ? "s" : ""}
                  </p>
                </div>
              )}

              <div className="flex gap-2.5 rounded-xl bg-primary/5 border border-primary/20 px-4 py-3 text-xs text-muted-foreground text-left">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
                <div>
                  <p className="font-semibold text-primary mb-0.5">Instruções de retirada</p>
                  {pickupInstructions}
                </div>
              </div>

              <Button
                className="w-full font-semibold"
                onClick={() => { setOpen(false); router.push("/reservations"); }}
              >
                Ver minhas reservas
              </Button>
            </div>
          )}

          {/* ── CALENDAR ─────────────────────────────────────── */}
          {step === "calendar" && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  Selecione as datas
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex justify-center">
                  <DayPicker
                    mode="range"
                    selected={range}
                    onSelect={setRange}
                    locale={ptBR}
                    disabled={disabledDays}
                    numberOfMonths={1}
                  />
                </div>

                {range?.from && range?.to ? (
                  <div className="rounded-lg bg-secondary px-4 py-2.5 text-sm text-center">
                    <span className="text-muted-foreground">Período: </span>
                    <span className="font-medium">
                      {format(range.from, "dd/MM", { locale: ptBR })} →{" "}
                      {format(range.to, "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      ({nights} dia{nights !== 1 ? "s" : ""})
                    </span>
                  </div>
                ) : (
                  <p className="text-center text-xs text-muted-foreground">
                    Clique no primeiro dia e arraste até o último dia desejado.
                  </p>
                )}

                <Button
                  className="w-full"
                  disabled={!range?.from || !range?.to}
                  onClick={() => setStep("confirm")}
                >
                  Continuar
                </Button>
              </div>
            </>
          )}

          {/* ── CONFIRM ──────────────────────────────────────── */}
          {step === "confirm" && (
            <div className="space-y-5">
              {/* Board image — hero */}
              <div className="relative mx-auto w-full overflow-hidden rounded-2xl bg-secondary" style={{ height: 260 }}>
                {boardImage ? (
                  <Image
                    src={boardImage}
                    alt={boardName}
                    fill
                    className="object-contain p-6"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Waves className="h-16 w-16 text-muted-foreground/30" />
                  </div>
                )}
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-secondary to-transparent" />
              </div>

              {/* Title + board name */}
              <div className="text-center space-y-1 px-1">
                <p className="text-xs font-medium uppercase tracking-widest text-primary">
                  Sua próxima sessão te espera
                </p>
                <h2 className="text-2xl font-bold">{boardName}</h2>
              </div>

              {/* Dates */}
              {range?.from && range?.to && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border bg-card/60 px-4 py-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Retirada
                    </p>
                    <p className="text-lg font-bold leading-tight">
                      {format(range.from, "dd", { locale: ptBR })}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {format(range.from, "MMMM", { locale: ptBR })}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-card/60 px-4 py-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Devolução
                    </p>
                    <p className="text-lg font-bold leading-tight">
                      {format(range.to, "dd", { locale: ptBR })}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {format(range.to, "MMMM", { locale: ptBR })}
                    </p>
                  </div>
                </div>
              )}

              {/* Pickup */}
              <div className="flex gap-2.5 rounded-xl bg-primary/5 border border-primary/20 px-4 py-3 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
                <div>
                  <p className="font-semibold text-primary mb-0.5">Local de retirada</p>
                  {pickupInstructions}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pb-1">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep("calendar")}
                  disabled={loading}
                >
                  Voltar
                </Button>
                <Button
                  className="flex-1 font-semibold"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Confirmando..." : "Confirmar reserva"}
                </Button>
              </div>
            </div>
          )}

        </DialogContent>
      </Dialog>
    </>
  );
}

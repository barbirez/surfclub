"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { DateRange } from "react-day-picker";
import "react-day-picker/style.css";

interface ReservationFormProps {
  surfboardId: string;
  locationId: string;
  boardName: string;
  pickupInstructions: string;
  returnInstructions: string;
  unavailableDates: string[];
  hasAccess: boolean;
}

const LIABILITY_VERSION = "v1.0";

export function ReservationForm({
  surfboardId,
  locationId,
  boardName,
  pickupInstructions,
  returnInstructions,
  unavailableDates,
  hasAccess,
}: ReservationFormProps) {
  const router = useRouter();
  const [range, setRange] = useState<DateRange | undefined>();
  const [liabilityAccepted, setLiabilityAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"calendar" | "disclosure" | "success">("calendar");

  const today = startOfDay(new Date());
  const disabledDays = [
    { before: addDays(today, 1) },
    ...unavailableDates.map((d) => new Date(d)),
  ];

  async function handleSubmit() {
    if (!range?.from || !range?.to) {
      toast.error("Selecione as datas da reserva.");
      return;
    }
    if (!liabilityAccepted) {
      toast.error("Aceite os termos de responsabilidade.");
      return;
    }

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

  if (!hasAccess) {
    return (
      <Card className="border-accent/30 bg-card">
        <CardContent className="pt-6 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
            <CalendarDays className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="font-semibold">Calendário disponível para assinantes</p>
            <p className="text-sm text-muted-foreground mt-1">
              Escolha um plano para verificar disponibilidade e fazer reservas.
            </p>
          </div>
          <Button
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={() => router.push("/#pricing")}
          >
            Ver planos
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === "success") {
    return (
      <Card className="border-green-500/30 bg-card">
        <CardContent className="pt-6 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2 className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <p className="font-semibold text-lg">Reserva confirmada!</p>
            <p className="text-sm text-muted-foreground mt-1">
              Você receberá um e-mail com as instruções de retirada.
            </p>
          </div>
          <div className="rounded-lg bg-secondary p-3 text-left text-sm">
            <p className="font-medium mb-1">Instruções de retirada:</p>
            <p className="text-muted-foreground">{pickupInstructions}</p>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/reservations")}
          >
            Ver minhas reservas
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === "disclosure") {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-5 w-5 text-accent" />
            Termos de Responsabilidade
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {range?.from && range?.to && (
            <div className="rounded-lg bg-secondary px-3 py-2 text-sm">
              <p className="font-medium">{boardName}</p>
              <p className="text-muted-foreground">
                {format(range.from, "dd/MM/yyyy", { locale: ptBR })} →{" "}
                {format(range.to, "dd/MM/yyyy", { locale: ptBR })}
              </p>
            </div>
          )}

          <div className="rounded-lg border border-border bg-background/50 p-3 text-xs text-muted-foreground leading-relaxed max-h-40 overflow-y-auto">
            <p className="font-medium text-foreground mb-2">Termos de uso e responsabilidade ({LIABILITY_VERSION})</p>
            <p>
              Ao confirmar esta reserva, você declara que:
            </p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>É responsável por quaisquer danos causados à prancha durante o período de aluguel.</li>
              <li>Devolverá a prancha na data e local acordados, nas mesmas condições em que a recebeu.</li>
              <li>Utilizará a prancha apenas para o surf recreativo, em condições compatíveis com seu nível de habilidade.</li>
              <li>Não cederá, emprestará ou sublocará a prancha a terceiros.</li>
              <li>Em caso de danos, arcará com os custos de reparo conforme avaliação da WavyClub.</li>
              <li>Em caso de perda ou roubo, arcará com o valor de reposição da prancha.</li>
            </ul>
          </div>

          <div className="rounded-lg bg-secondary/50 p-3 text-sm">
            <p className="font-medium text-xs text-muted-foreground mb-1">Instruções de retirada:</p>
            <p className="text-sm">{pickupInstructions}</p>
          </div>

          <div className="rounded-lg bg-secondary/50 p-3 text-sm">
            <p className="font-medium text-xs text-muted-foreground mb-1">Instruções de devolução:</p>
            <p className="text-sm">{returnInstructions}</p>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-accent/30 bg-accent/5 p-3">
            <Checkbox
              id="liability"
              checked={liabilityAccepted}
              onCheckedChange={(v) => setLiabilityAccepted(v === true)}
              className="mt-0.5"
            />
            <Label htmlFor="liability" className="text-sm leading-relaxed cursor-pointer">
              Li e concordo com os termos de responsabilidade acima. Estou ciente das minhas obrigações como locatário.
            </Label>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setStep("calendar")}
            >
              Voltar
            </Button>
            <Button
              className="flex-1"
              disabled={!liabilityAccepted || loading}
              onClick={handleSubmit}
            >
              {loading ? "Confirmando..." : "Confirmar Reserva"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <CalendarDays className="h-5 w-5 text-primary" />
          Selecione as datas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={setRange}
            locale={ptBR}
            disabled={disabledDays}
            numberOfMonths={1}
            className="rdp-custom"
          />
        </div>

        <div
          className="rounded-lg bg-secondary p-3 text-sm text-center transition-all duration-200"
          style={{
            opacity: range?.from ? 1 : 0,
            transform: range?.from ? "translateY(0)" : "translateY(-4px)",
            pointerEvents: range?.from ? "auto" : "none",
          }}
        >
          {range?.from && !range?.to ? (
            <>
              <span className="text-muted-foreground">De: </span>
              <span className="font-medium">
                {format(range.from, "dd/MM/yyyy", { locale: ptBR })}
              </span>
              <span className="text-muted-foreground ml-1">→ selecione a volta</span>
            </>
          ) : range?.from && range?.to ? (
            <>
              <span className="text-muted-foreground">Período selecionado: </span>
              <span className="font-medium">
                {format(range.from, "dd/MM/yyyy", { locale: ptBR })} →{" "}
                {format(range.to, "dd/MM/yyyy", { locale: ptBR })}
              </span>
            </>
          ) : (
            <span className="text-muted-foreground">Selecione a data de início</span>
          )}
        </div>

        <Button
          className="w-full"
          disabled={!range?.from || !range?.to}
          onClick={() => setStep("disclosure")}
        >
          Continuar para os termos
        </Button>
      </CardContent>
    </Card>
  );
}

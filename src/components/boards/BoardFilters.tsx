"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

const BOARD_TYPES = [
  { value: "SHORTBOARD", label: "Shortboard" },
  { value: "LONGBOARD", label: "Longboard" },
  { value: "FISH", label: "Fish" },
  { value: "FUNBOARD", label: "Funboard" },
  { value: "GUN", label: "Gun" },
  { value: "SUP", label: "SUP" },
  { value: "FOIL", label: "Foil" },
];

const LEVELS = [
  { value: "iniciante", label: "Iniciante" },
  { value: "intermediário", label: "Intermediário" },
  { value: "avançado", label: "Avançado" },
];

export function BoardFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/boards?${params.toString()}`);
    },
    [router, searchParams]
  );

  const hasFilters = ["type", "level", "minVolume", "maxVolume"].some(
    (k) => searchParams.get(k)
  );

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-sm">Filtros</span>
        </div>

        <Select
          value={searchParams.get("type") || "all"}
          onValueChange={(v) => updateParam("type", v)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            {BOARD_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={searchParams.get("level") || "all"}
          onValueChange={(v) => updateParam("level", v)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os níveis</SelectItem>
            {LEVELS.map((l) => (
              <SelectItem key={l.value} value={l.value}>
                {l.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Volume mín (L)"
            className="w-36"
            value={searchParams.get("minVolume") || ""}
            onChange={(e) => updateParam("minVolume", e.target.value)}
          />
          <span className="text-muted-foreground text-sm">–</span>
          <Input
            type="number"
            placeholder="Volume máx (L)"
            className="w-36"
            value={searchParams.get("maxVolume") || ""}
            onChange={(e) => updateParam("maxVolume", e.target.value)}
          />
        </div>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/boards")}
            className="gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            Limpar
          </Button>
        )}
      </div>
    </div>
  );
}

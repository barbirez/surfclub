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
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, X } from "lucide-react";

const BOARD_TYPES = [
  { value: "SHORTBOARD", label: "Shortboard" },
  { value: "LONGBOARD", label: "Longboard" },
  { value: "FISH", label: "Fish" },
  { value: "FUNBOARD", label: "Funboard" },
  { value: "GUN", label: "Gun" },
  { value: "SUP", label: "SUP" },
  { value: "FOIL", label: "Foil" },
];

interface BoardFiltersProps {
  shapers: string[];
  cities: string[];
}

export function BoardFilters({ shapers, cities }: BoardFiltersProps) {
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

  const FILTER_KEYS = ["type", "minVolume", "maxVolume", "minSize", "maxSize", "shaper", "city", "q"];
  const hasFilters = FILTER_KEYS.some((k) => searchParams.get(k));

  return (
    <aside className="w-72 shrink-0 space-y-6 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-sm">Filtros</span>
        </div>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/boards")}
            className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground px-2"
          >
            <X className="h-3.5 w-3.5" />
            Limpar
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground uppercase tracking-wide">Buscar</Label>
        <Input
          placeholder="Nome, tipo ou cidade..."
          className="h-9"
          value={searchParams.get("q") || ""}
          onChange={(e) => updateParam("q", e.target.value || null)}
        />
      </div>

      {/* Board type */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground uppercase tracking-wide">Tipo de prancha</Label>
        <Select
          value={searchParams.get("type") || "all"}
          onValueChange={(v) => updateParam("type", v)}
        >
          <SelectTrigger className="h-9 w-full">
            <SelectValue placeholder="Todos os tipos" />
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
      </div>

      {/* Size range */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground uppercase tracking-wide">Tamanho (pés)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Mín"
            className="h-9"
            step="0.1"
            min="4"
            max="12"
            value={searchParams.get("minSize") || ""}
            onChange={(e) => updateParam("minSize", e.target.value || null)}
          />
          <span className="text-muted-foreground text-sm shrink-0">–</span>
          <Input
            type="number"
            placeholder="Máx"
            className="h-9"
            step="0.1"
            min="4"
            max="12"
            value={searchParams.get("maxSize") || ""}
            onChange={(e) => updateParam("maxSize", e.target.value || null)}
          />
        </div>
      </div>

      {/* Volume range */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground uppercase tracking-wide">Volume (litros)</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Mín"
            className="h-9"
            value={searchParams.get("minVolume") || ""}
            onChange={(e) => updateParam("minVolume", e.target.value || null)}
          />
          <span className="text-muted-foreground text-sm shrink-0">–</span>
          <Input
            type="number"
            placeholder="Máx"
            className="h-9"
            value={searchParams.get("maxVolume") || ""}
            onChange={(e) => updateParam("maxVolume", e.target.value || null)}
          />
        </div>
      </div>

      {/* Brand / Shaper */}
      {shapers.length > 0 && (
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Marca / Shaper</Label>
          <Select
            value={searchParams.get("shaper") || "all"}
            onValueChange={(v) => updateParam("shaper", v)}
          >
            <SelectTrigger className="h-9 w-full">
              <SelectValue placeholder="Todos os shapers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os shapers</SelectItem>
              {shapers.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* City */}
      {cities.length > 0 && (
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Cidade</Label>
          <Select
            value={searchParams.get("city") || "all"}
            onValueChange={(v) => updateParam("city", v)}
          >
            <SelectTrigger className="h-9 w-full">
              <SelectValue placeholder="Todas as cidades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as cidades</SelectItem>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </aside>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState, useEffect, useMemo } from "react";
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
import { SlidersHorizontal, Search, X } from "lucide-react";

const BOARD_TYPES = [
  { value: "SHORTBOARD", label: "Shortboard" },
  { value: "LONGBOARD", label: "Longboard" },
  { value: "FISH", label: "Fish" },
  { value: "FUNBOARD", label: "Funboard" },
  { value: "GUN", label: "Gun" },
  { value: "SUP", label: "SUP" },
  { value: "FOIL", label: "Foil" },
];

interface Spot {
  id: string;
  label: string;
  city: string;
}

interface BoardFiltersProps {
  shapers: string[];
  cities: string[];
  spots: Spot[];
}

function useDebouncedParam(
  key: string,
  searchParams: URLSearchParams,
  pushUrl: (params: URLSearchParams) => void,
  delay = 500
) {
  const [local, setLocal] = useState(searchParams.get(key) || "");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setLocal(searchParams.get(key) || "");
  }, [searchParams, key]);

  const onChange = useCallback(
    (value: string) => {
      setLocal(value);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
        pushUrl(params);
      }, delay);
    },
    [key, searchParams, pushUrl, delay]
  );

  return [local, onChange] as const;
}

export function BoardFilters({ shapers, cities, spots }: BoardFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pushUrl = useCallback(
    (params: URLSearchParams) => {
      router.push(`/boards?${params.toString()}`);
    },
    [router]
  );

  const updateSelect = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Clear spot when city changes
      if (key === "city") {
        params.delete("spot");
      }
      pushUrl(params);
    },
    [searchParams, pushUrl]
  );

  const [q, setQ] = useDebouncedParam("q", searchParams, pushUrl);
  const [minSize, setMinSize] = useDebouncedParam("minSize", searchParams, pushUrl);
  const [maxSize, setMaxSize] = useDebouncedParam("maxSize", searchParams, pushUrl);
  const [minVolume, setMinVolume] = useDebouncedParam("minVolume", searchParams, pushUrl);
  const [maxVolume, setMaxVolume] = useDebouncedParam("maxVolume", searchParams, pushUrl);

  const selectedCity = searchParams.get("city");

  // Filter spots by selected city
  const filteredSpots = useMemo(() => {
    if (selectedCity && selectedCity !== "all") {
      return spots.filter((s) => s.city === selectedCity);
    }
    return spots;
  }, [spots, selectedCity]);

  const FILTER_KEYS = ["type", "minVolume", "maxVolume", "minSize", "maxSize", "shaper", "city", "spot", "q"];
  const hasFilters = FILTER_KEYS.some((k) => searchParams.get(k));

  return (
    <aside className="w-72 shrink-0 sticky top-[5rem] self-start max-h-[calc(100vh-6rem)] overflow-y-auto space-y-6 rounded-xl border border-border bg-card p-5">
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
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Nome, tipo ou cidade..."
            className="h-9 pl-8"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {/* City */}
      {cities.length > 0 && (
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Cidade</Label>
          <Select
            value={searchParams.get("city") || "all"}
            onValueChange={(v) => updateSelect("city", v)}
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

      {/* Spot / Ponto */}
      {filteredSpots.length > 0 && (
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Ponto</Label>
          <Select
            value={searchParams.get("spot") || "all"}
            onValueChange={(v) => updateSelect("spot", v)}
          >
            <SelectTrigger className="h-9 w-full">
              <SelectValue placeholder="Todos os pontos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os pontos</SelectItem>
              {filteredSpots.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Board type */}
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground uppercase tracking-wide">Tipo de prancha</Label>
        <Select
          value={searchParams.get("type") || "all"}
          onValueChange={(v) => updateSelect("type", v)}
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
            value={minSize}
            onChange={(e) => setMinSize(e.target.value)}
          />
          <span className="text-muted-foreground text-sm shrink-0">–</span>
          <Input
            type="number"
            placeholder="Máx"
            className="h-9"
            step="0.1"
            min="4"
            max="12"
            value={maxSize}
            onChange={(e) => setMaxSize(e.target.value)}
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
            value={minVolume}
            onChange={(e) => setMinVolume(e.target.value)}
          />
          <span className="text-muted-foreground text-sm shrink-0">–</span>
          <Input
            type="number"
            placeholder="Máx"
            className="h-9"
            value={maxVolume}
            onChange={(e) => setMaxVolume(e.target.value)}
          />
        </div>
      </div>

      {/* Brand / Shaper */}
      {shapers.length > 0 && (
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Marca / Shaper</Label>
          <Select
            value={searchParams.get("shaper") || "all"}
            onValueChange={(v) => updateSelect("shaper", v)}
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
    </aside>
  );
}

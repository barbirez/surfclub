import { ModifiedClassicLoader } from "@/components/ui/loader";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
        <ModifiedClassicLoader />
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
}

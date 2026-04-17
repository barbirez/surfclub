import { ModifiedClassicLoader } from "@/components/ui/loader";

export default function BrowseLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4 animate-in fade-in duration-300">
        <ModifiedClassicLoader />
        <p className="text-sm text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
}

import { auth } from "@/lib/auth";
import { BrowseHeader } from "@/components/layout/BrowseHeader";

export default async function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-background">
      <BrowseHeader isLoggedIn={!!session} userName={session?.user?.name ?? null} userImage={session?.user?.image ?? null} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

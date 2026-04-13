import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { BrowseHeader } from "@/components/layout/BrowseHeader";
import { isTrialActive, daysLeftInTrial } from "@/lib/subscription";
import { TrialBanner } from "@/components/paywall/TrialBanner";

export default async function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  let showBanner = false;
  let daysLeft = 0;

  if (session?.user?.id) {
    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (user) {
      showBanner = isTrialActive(user);
      daysLeft = daysLeftInTrial(user);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {showBanner && <TrialBanner daysLeft={daysLeft} />}
      <BrowseHeader isLoggedIn={!!session} userName={session?.user?.name ?? null} userImage={session?.user?.image ?? null} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

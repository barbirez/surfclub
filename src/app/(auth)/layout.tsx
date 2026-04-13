import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { AppHeader } from "@/components/layout/AppHeader";
import { TrialBanner } from "@/components/paywall/TrialBanner";
import { daysLeftInTrial, isTrialActive } from "@/lib/subscription";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  const showBanner = isTrialActive(user);
  const daysLeft = daysLeftInTrial(user);

  return (
    <div className="min-h-screen bg-background">
      {showBanner && <TrialBanner daysLeft={daysLeft} />}
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

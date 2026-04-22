import type { User } from "@prisma/client";

export function isTrialActive(user: Pick<User, "plan" | "trialEndsAt">): boolean {
  return user.plan === "TRIAL" && !!user.trialEndsAt && user.trialEndsAt > new Date();
}

export function isSubscribed(
  user: Pick<User, "plan" | "stripeCurrentPeriodEnd">
): boolean {
  return (
    user.plan === "PRO" &&
    !!user.stripeCurrentPeriodEnd &&
    user.stripeCurrentPeriodEnd > new Date()
  );
}

export function hasAccess(
  _user: Pick<User, "plan" | "trialEndsAt" | "stripeCurrentPeriodEnd">
): boolean {
  // Prelaunch: every authenticated user can reserve. Re-enable gating once
  // paid plans launch by restoring `isTrialActive(_user) || isSubscribed(_user)`.
  return true;
}

export function daysLeftInTrial(
  user: Pick<User, "trialEndsAt">
): number {
  if (!user.trialEndsAt) return 0;
  const diff = user.trialEndsAt.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export const PLAN_LIMITS = {
  FREE: {
    canReserve: false,
    maxDaysPerReservation: 0,
    canViewBoards: true,
    canFilter: true,
  },
  TRIAL: {
    canReserve: true,
    maxDaysPerReservation: 30,
    canViewBoards: true,
    canFilter: true,
  },
  PRO: {
    canReserve: true,
    maxDaysPerReservation: 30,
    canViewBoards: true,
    canFilter: true,
  },
} as const;

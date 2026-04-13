import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const reservation = await db.reservation.findUnique({
    where: { id },
    select: { userId: true, status: true, startDate: true },
  });

  if (!reservation) {
    return NextResponse.json({ error: "Reserva não encontrada." }, { status: 404 });
  }

  if (reservation.userId !== session.user.id) {
    return NextResponse.json({ error: "Sem permissão." }, { status: 403 });
  }

  if (reservation.status === "CANCELLED") {
    return NextResponse.json({ error: "Reserva já cancelada." }, { status: 400 });
  }

  if (reservation.status === "RETURNED") {
    return NextResponse.json({ error: "Reserva já devolvida." }, { status: 400 });
  }

  // Cancel and free up availability dates
  const updated = await db.reservation.update({
    where: { id },
    data: { status: "CANCELLED" },
  });

  // Restore availability for those dates
  await db.availability.updateMany({
    where: {
      surfboardId: updated.surfboardId,
      date: { gte: updated.startDate, lte: updated.endDate },
    },
    data: { isAvailable: true },
  });

  return NextResponse.json(updated);
}

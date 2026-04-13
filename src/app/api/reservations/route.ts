import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { reservationSchema } from "@/lib/validations";
import { hasAccess } from "@/lib/subscription";
import { sendReservationConfirmation } from "@/lib/email";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (!hasAccess(user)) {
    return NextResponse.json(
      { error: "You need an active plan to make reservations." },
      { status: 403 }
    );
  }

  const body = await req.json();
  const parsed = reservationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { surfboardId, startDate, endDate, pickupLocationId } = parsed.data;
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Check availability: no overlapping reservations
  const conflict = await db.reservation.findFirst({
    where: {
      surfboardId,
      status: { in: ["PENDING", "CONFIRMED", "ACTIVE"] },
      AND: [
        { startDate: { lte: end } },
        { endDate: { gte: start } },
      ],
    },
  });

  if (conflict) {
    return NextResponse.json(
      { error: "Prancha não disponível para as datas selecionadas." },
      { status: 409 }
    );
  }

  const board = await db.surfboard.findUnique({ where: { id: surfboardId } });
  const location = await db.location.findUnique({ where: { id: pickupLocationId } });

  const reservation = await db.reservation.create({
    data: {
      userId: user.id,
      surfboardId,
      startDate: start,
      endDate: end,
      pickupLocationId,
      status: "CONFIRMED",
    },
  });

  // Create liability acceptance
  await db.liabilityAcceptance.create({
    data: {
      reservationId: reservation.id,
      userId: user.id,
      checkboxVersion: "v1.0",
    },
  });

  // Mark dates unavailable
  const dateRange: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    dateRange.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  await db.availability.createMany({
    data: dateRange.map((date) => ({
      surfboardId,
      date,
      isAvailable: false,
    })),
    skipDuplicates: true,
  });

  if (user.email && board && location) {
    await sendReservationConfirmation({
      to: user.email,
      name: user.name || "Surfista",
      boardName: board.name,
      startDate: format(start, "dd/MM/yyyy", { locale: ptBR }),
      endDate: format(end, "dd/MM/yyyy", { locale: ptBR }),
      pickupInstructions: location.pickupInstructions,
    }).catch(console.error);
  }

  return NextResponse.json(reservation, { status: 201 });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const reservations = await db.reservation.findMany({
    where: { userId: session.user.id },
    include: {
      surfboard: { select: { id: true, name: true, type: true, size: true, volumeLiters: true, images: true, shaper: true } },
      pickupLocation: { select: { city: true, town: true, address: true, pickupInstructions: true, returnInstructions: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reservations);
}

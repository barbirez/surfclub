import { z } from "zod";

export const reservationSchema = z.object({
  surfboardId: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  pickupLocationId: z.string().min(1),
  liabilityAccepted: z.boolean().refine((v) => v === true, {
    message: "Você precisa aceitar os termos de responsabilidade.",
  }),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

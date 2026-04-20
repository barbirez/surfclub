import { Resend } from "resend";

function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY!);
}

export async function sendReservationConfirmation({
  to,
  name,
  boardName,
  startDate,
  endDate,
  pickupInstructions,
}: {
  to: string;
  name: string;
  boardName: string;
  startDate: string;
  endDate: string;
  pickupInstructions: string;
}) {
  const resend = getResend();
  await resend.emails.send({
    from: "WavyClub <noreply@wavyclub.com>",
    to,
    subject: `Reserva confirmada — ${boardName}`,
    html: `
      <h2>Olá, ${name}!</h2>
      <p>Sua reserva da prancha <strong>${boardName}</strong> foi confirmada.</p>
      <ul>
        <li><strong>De:</strong> ${startDate}</li>
        <li><strong>Até:</strong> ${endDate}</li>
      </ul>
      <h3>Instruções de Retirada</h3>
      <p>${pickupInstructions}</p>
      <p>Boas ondas! 🏄</p>
      <p>— Equipe WavyClub</p>
    `,
  });
}

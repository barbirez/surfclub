import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";

function getStripe(): Stripe {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { typescript: true });
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (typeof session.subscription === "string") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription, {
          expand: ["latest_invoice"],
        });
        const invoice = subscription.latest_invoice as Stripe.Invoice | null;
        const periodEnd = invoice?.period_end
          ? new Date(invoice.period_end * 1000)
          : null;
        await db.user.updateMany({
          where: { stripeCustomerId: session.customer as string },
          data: {
            plan: "PRO",
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0]?.price.id,
            stripeCurrentPeriodEnd: periodEnd,
          },
        });
      }
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      const periodEnd = invoice.period_end
        ? new Date(invoice.period_end * 1000)
        : null;
      if (periodEnd) {
        await db.user.updateMany({
          where: { stripeCustomerId: invoice.customer as string },
          data: { stripeCurrentPeriodEnd: periodEnd },
        });
      }
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription & { latest_invoice?: Stripe.Invoice };
      const invoice = typeof sub.latest_invoice === "object" ? sub.latest_invoice : null;
      const periodEnd = invoice?.period_end
        ? new Date(invoice.period_end * 1000)
        : null;
      await db.user.updateMany({
        where: { stripeCustomerId: sub.customer as string },
        data: {
          stripeSubscriptionId: sub.id,
          stripePriceId: sub.items.data[0]?.price.id,
          ...(periodEnd && { stripeCurrentPeriodEnd: periodEnd }),
        },
      });
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await db.user.updateMany({
        where: { stripeCustomerId: sub.customer as string },
        data: {
          plan: "FREE",
          stripeSubscriptionId: null,
          stripePriceId: null,
          stripeCurrentPeriodEnd: null,
        },
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}

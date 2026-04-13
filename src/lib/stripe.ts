import Stripe from "stripe";

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      typescript: true,
    });
  }
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export async function createCheckoutSession(
  userId: string,
  userEmail: string,
  stripeCustomerId?: string | null
): Promise<string> {
  const s = getStripe();

  let customerId = stripeCustomerId;
  if (!customerId) {
    const customer = await s.customers.create({ email: userEmail });
    customerId = customer.id;
    const { db } = await import("@/lib/db");
    await db.user.update({ where: { id: userId }, data: { stripeCustomerId: customerId } });
  }

  const session = await s.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: process.env.STRIPE_PRICE_ID_PRO!, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
  });

  return session.url!;
}

export async function createCustomerPortalSession(
  stripeCustomerId: string
): Promise<string> {
  const s = getStripe();
  const session = await s.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`,
  });
  return session.url;
}

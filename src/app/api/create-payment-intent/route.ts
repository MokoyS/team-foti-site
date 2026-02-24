import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe non configuré. Définissez STRIPE_SECRET_KEY." },
      { status: 503 }
    );
  }
  try {
    const { amount } = await request.json();
    if (!amount || amount < 50) {
      return NextResponse.json(
        { error: "Montant invalide (minimum 0,50 €)." },
        { status: 400 }
      );
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement." },
      { status: 500 }
    );
  }
}

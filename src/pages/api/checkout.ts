import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";
import { ShoppingCart } from "@/context/ShoppingContext";

type RequestBody = {
  shoppingCart: ShoppingCart
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shoppingCart } = req.body as RequestBody;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed!" });
  }

  if (!shoppingCart) {
    return res.status(400).json({ error: "Shopping cart is required!" });
  }

  const success_url = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancel_url = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url,
    cancel_url,
    mode: 'payment',
    line_items: shoppingCart.items.map(item => {
      return {
        price: item.product.defaultPriceId,
        quantity: item.amount
      }
    })
  });

  return res.status(201).json(checkoutSession);
}
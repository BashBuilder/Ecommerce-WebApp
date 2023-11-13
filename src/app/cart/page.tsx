import { getCart } from "@/assets/lib/db/cart";
import CartEntry from "./CartEntry";
import { SetProductQuantity } from "./actions";
import { FormatPrice } from "@/lib/format";
// import { prisma } from "@/assets/lib/db/prisma";

export const metadata = {
  title: "Your Cart - Timazon",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartEntry
          key={cartItem.id}
          cartItem={cartItem}
          SetProductQuantity={SetProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Your Cart is empty</p>}

      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {FormatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-[200px] ">Checkout</button>
      </div>
    </div>
  );
}

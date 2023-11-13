"use client";

import { ShoppingCart } from "@/assets/lib/db/cart";
import { FormatPrice } from "@/lib/format";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

interface ShoppingCartButtonPros {
  cart: ShoppingCart | null;
}

export default function ShoppingCartButton({ cart }: ShoppingCartButtonPros) {
  function CloseDropdown() {
    const element = document.activeElement as HTMLElement;
    if (element) element.blur();
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle ">
        <div className="indicator">
          <ShoppingCartIcon />
          <span className="badge badge-sm indicator-item">
            {cart?.size || 0}
          </span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="cart dropdown-content card-compact mt-3 w-52 bg-base-100 shadow-sm z-50 rounded-lg"
      >
        <div className="card-body">
          <span className="text-lg font-bold">{cart?.size || 0} items</span>
          <span className="text-info">
            Subtotal: {FormatPrice(cart?.subtotal || 0)}
          </span>
          <div className="card-actions">
            <Link
              href="/cart"
              className="btn btn-primary btn-block"
              onClick={CloseDropdown}
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

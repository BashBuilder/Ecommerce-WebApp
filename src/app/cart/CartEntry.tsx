"use client";

import { CartItemWithProduct } from "@/assets/lib/db/cart";
import { FormatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  SetProductQuantity: (oroductId: string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, quantity },
  SetProductQuantity,
}: CartEntryProps) {
  const quantityOptions: JSX.Element[] = [];
  const [isPending, startTransition] = useTransition();

  for (let i = 0; i <= 99; i++)
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );

  return (
    <div>
      <div className="flex flex-wrap ">
        <div className="flex flex-wrap items-center gap-3">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={200}
            height={200}
            className="rounded-lg"
          />
          <div className=" min-w-[200px]">
            <Link href={"/products" + product.id} className="font-bold">
              {product.name}
            </Link>
            <div> Price: {FormatPrice(product.price)} </div>
            <div className="flex my-1 items-center gap-2 ">
              Quantity :
              <select
                className="select select-bordered w-full max-w-[80px]"
                defaultValue={quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.currentTarget.value);
                  startTransition(async () => {
                    await SetProductQuantity(product.id, newQuantity);
                  });
                }}
              >
                <option value={0}>0 Remove</option>
                {quantityOptions}
              </select>
            </div>
            <div className="flex items-center gap-3">
              Total: {FormatPrice(product.price * quantity)}
              {isPending && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
}

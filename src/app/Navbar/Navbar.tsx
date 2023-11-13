import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/pris.png";
import { redirect } from "next/navigation";
import { getCart } from "@/assets/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Search } from "lucide-react";

async function SearchProduct(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const cart = await getCart();

  return (
    <div className="bg-base-100">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case ">
            <Image src={logo} alt="Timazon logo" height={60} width={40} />
            Timazon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={SearchProduct}>
            <div className="form-control relative ">
              <input
                type="text"
                placeholder="Search"
                name="searchQuery"
                className=" input input-bordered w-full min-w-[100px] pr-10 "
              />

              <button className="absolute top-1/2 -translate-y-1/2 right-2 ">
                <Search className="text-neutral-500" size={30} />
              </button>
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
}

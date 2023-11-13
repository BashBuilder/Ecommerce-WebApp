import { prisma } from "@/assets/lib/db/prisma";
import FormSubmitBtn from "@/components/FormSubmitBtn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

//components/formSubmitBtn.tex

export const metadata = {
  title: "Add Product - Timazon",
};

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);
  if (!session) {
    // the callbackurl is to redirect the user back to a specific page because this method does not redirect a user by default after a login session
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("All field required");
  }

  // for (let i = 0; i < 10; i++)
  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // the callbackurl is to redirect the user back to a specific page because this method does not redirect a user by default after a login session
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold ">Add Product</h1>
      <form action={addProduct}>
        <input
          className="mb-3 w-full input input-bordered "
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        <textarea
          required
          name="description"
          placeholder="description"
          className="textarea-bordered textarea mb-3 w-full "
        />
        <input
          className="mb-3 w-full input input-bordered "
          type="url"
          name="imageUrl"
          placeholder="Image Url"
          required
        />
        <input
          className="mb-3 w-full input input-bordered "
          type="number"
          name="price"
          placeholder="Price"
          required
        />
        <FormSubmitBtn className=" btn-block">Add Product</FormSubmitBtn>
      </form>
    </div>
  );
}

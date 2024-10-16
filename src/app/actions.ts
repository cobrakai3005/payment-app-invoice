"use server";
import { db } from "@/db";
import { Customers, Invoices } from "@/db/schema";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export type TStatus = "open" | "paid" | "void" | "uncollectible";
export async function createAction(formData: FormData) {
  const { userId, orgId } = auth();
  if (!userId) {
    return;
  }
  const value = Math.floor(parseFloat(String(formData.get("value"))) * 100);
  const description = formData.get("description") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const [customer] = await db
    .insert(Customers)
    .values({
      name,
      email,
      userId,
      organizationId: orgId || null,
    })
    .returning({
      id: Invoices.id,
    });
  const results = await db
    .insert(Invoices)
    .values({
      value,
      description,
      userId,
      customerId: customer.id,
      status: "open",
      organizationId: orgId || null,
    })
    .returning({
      id: Invoices.id,
    });
  console.log(results);
  redirect(`/invoices/${results[0].id}`);
}

export async function updateStatus(formData: FormData) {
  const { userId, orgId } = auth();
  if (!userId) {
    return;
  }
  const id = parseInt(formData.get("id") as string);
  const status = formData.get("status") as TStatus;

  if (orgId) {
    await db
      .update(Invoices)
      .set({ status })
      .where(and(eq(Invoices.id, id), eq(Invoices.organizationId, orgId)));
  } else {
    await db
      .update(Invoices)
      .set({ status })
      .where(
        and(
          eq(Invoices.id, id),
          eq(Invoices.userId, userId),
          isNull(Invoices.organizationId)
        )
      );
  }

  revalidatePath(`/invoices/${id}`, "page");
}

export async function deleteAction(formData: FormData) {
  const { userId, orgId } = auth();
  if (!userId) {
    return;
  }
  const id = parseInt(formData.get("id") as string);

  if (orgId) {
    await db
      .delete(Invoices)
      .where(and(eq(Invoices.id, id), eq(Invoices.organizationId, orgId)));
  } else {
    await db
      .delete(Invoices)
      .where(
        and(
          eq(Invoices.id, id),
          eq(Invoices.userId, userId),
          isNull(Invoices.organizationId)
        )
      );
  }

  redirect("/dashboard");
}

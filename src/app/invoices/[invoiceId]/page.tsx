import { notFound } from "next/navigation";
import { Customers, Invoices } from "@/db/schema";
import { db } from "@/db/index";
import { and, eq, isNull } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import Container from "@/components/container";
import StatusDropDown from "@/components/status-dropdown";
import DeleteDialogComponent from "@/components/delete-dialog-comp";

export const AVAILABEL_STATUS = [
  {
    id: "open",
    label: "Open",
  },
  {
    id: "paid",
    label: "Paid",
  },
  {
    id: "void",
    label: "Void",
  },
  {
    id: "uncollectible",
    label: "Uncollectible",
  },
];

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const { userId, orgId } = auth();
  if (!userId) return;
  const invoiceId = parseInt(params.invoiceId);
  if (isNaN(invoiceId)) {
    throw new Error("Invalid invoice ID");
  }
  let result;
  if (orgId) {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Customers.id, Invoices.customerId))
      .where(
        and(eq(Invoices.id, invoiceId), eq(Invoices.organizationId, orgId))
      )
      .limit(1);
  } else {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Customers.id, Invoices.customerId))
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.userId, userId),
          isNull(Invoices.organizationId)
        )
      )
      .limit(1);
  }

  if (!result) notFound();

  const invoices = {
    ...result.invoices,
    customer: result.customers,
  };

  return (
    <main className="w-full   mx-auto my-12">
      <Container>
        <div className="flex justify-between">
          <h1 className="flex items-center gap-4 text-3xl font-bold">
            Invoices
            <Badge
              className={cn(
                "rounded-full bg-green-500 capitalize",
                invoices.status === "open" && "bg-blue-500",
                invoices.status === "paid" && "bg-green-500",
                invoices.status === "void" && "bg-zinc-500",
                invoices.status === "uncollectible" && "bg-red-500"
              )}
            >
              {invoices.status}
            </Badge>
          </h1>

          <div className="flex gap-3">
            <StatusDropDown invoiceId={invoiceId} />
            <DeleteDialogComponent invoiceId={invoiceId} />
          </div>
        </div>

        <p className="text-3xl mb-3">${(invoices.value / 100).toFixed(2)}</p>
        <p className="text-lg mb-3">{invoices.description}</p>

        <h2 className="font-bold text-lg mb-8">Billing Details</h2>
        <ul className="grid gap-2">
          <li className="flex gap-0 items-center">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Id
            </strong>
            <span>{invoiceId}</span>
          </li>
          <li className="flex gap-0 items-center">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>
            <span> {new Date(invoices.createTs).toLocaleDateString()}</span>
          </li>
          <li className="flex gap-0 items-center">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>
            <span>{invoices.customer.name}</span>
          </li>
          <li className="flex gap-0 items-center">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
            <span>{invoices.customer.email}</span>
          </li>
        </ul>
      </Container>
    </main>
  );
}

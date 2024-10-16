import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import { Customers, Invoices } from "@/db/schema";
import { db } from "@/db/index";
import { cn } from "@/lib/utils";
import Container from "@/components/container";
import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";

export default async function Dashboard() {
  const { userId, orgId } = auth();
  if (!userId) {
    return;
  }
  let results;
  if (orgId) {
    results = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Customers.id, Invoices.customerId))
      .where(eq(Invoices.organizationId, orgId));
  } else {
    results = await db
      .select()
      .from(Invoices)
      .innerJoin(Customers, eq(Customers.id, Invoices.customerId))
      .where(and(eq(Invoices.userId, userId), isNull(Invoices.organizationId)));
  }

  const invoices = results.map(({ invoices, customers }) => {
    return { ...invoices, customers: customers };
  });
  return (
    <main className="  my-12">
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p>
            <Button variant="outline" className="inline-flex gap-2" asChild>
              <Link href={"/invoices/new"}>
                <CirclePlus className="h-4 w-4" />
                Create Invoice
              </Link>
            </Button>
          </p>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="p-3 w-[100px] text-left">Dates</TableHead>
              <TableHead className="p-3 text-left">Customer</TableHead>
              <TableHead className="p-3 text-left">Email</TableHead>
              <TableHead className="p-3 text-center">Status</TableHead>
              <TableHead className="p-3 text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((result) => (
              <TableRow key={result.id}>
                <TableCell className="p-0 font-medium text-left">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="font-semibold p-3 block"
                  >
                    {new Date(result.createTs).toLocaleDateString()}
                  </Link>
                </TableCell>
                <TableCell className="p-0 text-left">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="font-semibold p-3 block "
                  >
                    {result.customers.name}
                  </Link>
                </TableCell>
                <TableCell className="p-0p-3 block text-left">
                  <Link href={`/invoices/${result.id}`} className="p-3 block">
                    {result.customers.email}
                  </Link>
                </TableCell>
                <TableCell className="p-0 text-center">
                  <Link href={`/invoices/${result.id}`} className="p-3 block">
                    <Badge
                      className={cn(
                        "rounded-full bg-green-500 capitalize",
                        result.status === "open" && "bg-blue-500",
                        result.status === "paid" && "bg-green-500",
                        result.status === "void" && "bg-zinc-500",
                        result.status === "uncollectible" && "bg-red-500"
                      )}
                    >
                      {result.status}
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell className="p-0 text-right">
                  <Link href={`/invoices/${result.id}`} className="p-3 block ">
                    ${(result.value / 100).toFixed(2)}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </main>
  );
}

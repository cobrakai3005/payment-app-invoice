import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AVAILABEL_STATUS } from "@/app/invoices/[invoiceId]/page";
import { Button } from "./ui/button";
import { updateStatus } from "@/app/actions";

export default function StatusDropDown({ invoiceId }: { invoiceId: number }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>Change Status</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {AVAILABEL_STATUS?.map((status) => (
          <DropdownMenuItem key={status.id}>
            <form action={updateStatus}>
              <input type="hidden" name="id" value={invoiceId} />
              <input type="hidden" name="status" value={status.id} />
              <button>{status.label}</button>
            </form>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

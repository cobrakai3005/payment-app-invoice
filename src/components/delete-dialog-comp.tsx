import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteAction } from "@/app/actions";
import { Ellipsis, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import DeleteBtn from "./delete-btn";

export default function DeleteDialogComponent({
  invoiceId,
}: {
  invoiceId: number;
}) {
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            <span className="sr-only"> More Options</span>
            <Ellipsis className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <button className="flex gap-2">
                <Trash2 />
                Delete Invoice
              </button>
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this invoice?</AlertDialogTitle>
          <AlertDialogDescription className="text-[14px] text-slate-600">
            This action cannot be undone. This will permanently delete your
            invoice.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <form action={deleteAction}>
            <input type="hidden" name="id" value={invoiceId} />

            <div className="flex gap-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <DeleteBtn />
              </AlertDialogAction>
            </div>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

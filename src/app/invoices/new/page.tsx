"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createAction } from "@/app/actions";
import { SyntheticEvent, useState } from "react";
import SubmitBtn from "@/components/submit-btn";
import Container from "@/components/container";

export default function Invoices() {
  const [state, setState] = useState("ready");
  const handleOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (state === "pending") return;
    setState("pending");
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    await createAction(formData);
  };
  return (
    <main className="my-8">
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Create Invoice</h1>
        </div>

        <form onSubmit={handleOnSubmit} className="grid gap-4 max-w-xs">
          <div>
            <Label className="block mb-2 font-semibold text-sm" htmlFor="name">
              Billing Name
            </Label>
            <Input name="name" id="name" type="text" />
          </div>
          <div>
            <Label className="block mb-2 font-semibold text-sm" htmlFor="email">
              Billing Email
            </Label>
            <Input name="email" id="email" type="email" />
          </div>
          <div>
            <Label className="block mb-2 font-semibold text-sm" htmlFor="value">
              Value
            </Label>
            <Input name="value" id="value" type="text" />
          </div>
          <div>
            <Label
              className="block mb-2 font-semibold text-sm"
              htmlFor="description"
            >
              Description
            </Label>
            <Textarea id="description" name="description" />
          </div>
          <div>
            <SubmitBtn />
          </div>
        </form>
      </Container>
    </main>
  );
}

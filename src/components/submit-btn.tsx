"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader as LoadingCircle } from "lucide-react";

export default function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-full relative font-semibold">
      <span className={pending ? "text-transparent" : ""}>Submit</span>
      {pending && (
        <span className="absolute w-full h-full flex items-center justify-center text-gray-400">
          <LoadingCircle className="animate-spin" size={24} />
        </span>
      )}
    </Button>
  );
}
// 1:13:43

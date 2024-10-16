"use client";
import React from "react";
import { Button } from "./ui/button";
import { Loader as LoadingCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function DeleteBtn() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant={"destructive"} className="flex gap-2">
      <span className={pending ? "text-transparent" : ""}>Delete Invoice</span>
      {pending && (
        <span className="absolute w-full h-full flex items-center justify-center text-gray-400">
          <LoadingCircle className="animate-spin" size={24} />
        </span>
      )}
    </Button>
  );
}

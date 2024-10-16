"use client";
import React from "react";
import NextError from "next/error";

/*************  ✨ Codeium Command ⭐  *************/
/**
/******  52586752-c8dc-4138-a23b-28ed4f591ca4  *******/
export default function Error({ error }: { error: Error }) {
  return (
    <div>
      <NextError statusCode={500} title={error.message} />
      <div>Error {error.message}</div>
    </div>
  );
}

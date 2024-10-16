import React from "react";
import Container from "./container";

export default function Footer() {
  return (
    <footer className="mt-6 mb-8">
      <Container className="flex justify-between gap-4">
        <p className="text-sm ">
          Invoices &copy; {new Date().getFullYear()}. All rights reserve
        </p>
        <p className="text-sm ">
          Created by himanshu with nextjs, xata and clerk
        </p>
      </Container>
    </footer>
  );
}

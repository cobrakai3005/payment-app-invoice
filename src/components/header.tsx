import React from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  OrganizationSwitcher,
} from "@clerk/nextjs";
import Container from "./container";
import Link from "next/link";

export default function Header() {
  return (
    <header className="mt-8 mb-12">
      <Container>
        <div className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-5">
            <p className="font-bold text-2xl md:text-3xl text-slate-900">
              <Link href="/dashboard">Invoice app</Link>
            </p>
            <span className="text-slate-500 ml-1">/</span>
            <SignedIn>
              <OrganizationSwitcher afterCreateOrganizationUrl={"/dashboard"} />
            </SignedIn>
          </div>
          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </Container>
    </header>
  );
}

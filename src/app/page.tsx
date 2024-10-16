import { Button } from "@/components/ui/button";

import Link from "next/link";
import Container from "@/components/container";

export default async function Home() {
  return (
    <main className="h-full flex justify-center items-center">
      <Container className="px-3 flex flex-col items-center gap-7">
        <h1 className="text-[80px] leading-[60px] tracking-tighter font-bold text-slate-700 whitespace-nowrap">
          Exchange money with our app.
        </h1>
        <p className="">
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </p>
      </Container>
    </main>
  );
}

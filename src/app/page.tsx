import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SignedOut from "@/components/auth/SignedOut";
import SignedIn from "@/components/auth/SignedIn";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between py-3">
          <Link href="/" className="text-2xl font-bold">
            TTodo
          </Link>
          <nav className="flex gap-4">
            <SignedOut>
              <Button asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button asChild>
                <Link href="/u">Dashboard</Link>
              </Button>
            </SignedIn>
          </nav>
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="max-w-xs"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <Card>
                <CardHeader>
                  <CardTitle>First Steps →</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg">
                    Just the basics - Everything you need to know to set up your
                    database and authentication.
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link
              className="max-w-xs"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Documentation →</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg">
                    Learn more about Create T3 App, the libraries it uses, and
                    how to deploy it.
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 p-4 shadow">
              <p className="text-center text-2xl">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Button asChild>
                <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
                  {session ? "Sign out" : "Sign in"}
                </Link>
              </Button>
            </div>
          </div>

          {session?.user && <LatestPost />}
        </div>
      </main>
    </HydrateClient>
  );
}

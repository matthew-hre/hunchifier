"use client";

import { FaLightbulb } from "react-icons/fa";
import { FiAlertTriangle, FiGithub } from "react-icons/fi";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";

import { useState } from "react";
import Header from "@/components/header/Header";

export default function SignUpFormClient({
  searchParams,
  signInWithGithub,
  signUp,
}: {
  searchParams: { message: string };
  signInWithGithub: () => void;
  signUp: (formData: FormData) => void;
}) {
  const [emailLoading, setEmailLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();
    setEmailLoading(true);
    await signUp(new FormData(e.target));
    setEmailLoading(false);
  };

  const handleGithubSubmit = async (e: any) => {
    e.preventDefault();
    setGithubLoading(true);
    await signInWithGithub();
    setGithubLoading(false);
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen py-2 space-y-2">
        <div className="flex flex-col items-center justify-center w-20 h-20 rounded-full bg-primary">
          <FaLightbulb className="w-10 h-10 text-secondary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Hunchifier</h1>
        <p className="text-md text-muted-foreground pb-6 md:pb-12">
          Born out of a hatred for Miro
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
        <div className="grid gap-6 w-full max-w-sm pt-2">
          <form onSubmit={handleEmailSubmit} className="space-y-2">
            <Input
              type="email"
              name="email"
              placeholder="name@example.com"
              required
            />

            <Input type="password" name="password" placeholder="••••••••" />
            {emailLoading ? (
              <Button disabled className="w-full">
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Signing up...
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            )}
            {searchParams.message && (
              <p className="text-sm text-red-500 w-full text-center pt-2">
                <FiAlertTriangle className="inline-block w-4 h-4 mr-2" />
                {searchParams.message}
              </p>
            )}
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <form onSubmit={handleGithubSubmit}>
            {githubLoading ? (
              <Button disabled variant="outline" className="w-full">
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Authenticating...
              </Button>
            ) : (
              <Button variant="outline" type="submit" className="w-full">
                <FiGithub className="w-4 h-4 mr-2" /> Github
              </Button>
            )}
          </form>
          <p className="text-sm text-muted-foreground text-center w-full">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary underline underline-offset-4 hover:no-underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </main>
      <div className="absolute bottom-2 w-full text-center left-0">
        <Separator />
        <p className="text-sm text-muted-foreground pt-2">
          An open source project by{" "}
          <a
            className="font-medium text-primary underline underline-offset-4 hover:no-underline"
            href="https://matthew-hre.com"
          >
            Matthew Hrehirchuk
          </a>
        </p>
      </div>
    </>
  );
}

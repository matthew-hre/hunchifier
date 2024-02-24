"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Loader2 } from "lucide-react";

import { useState, useEffect } from "react";

export default function DeeperHunchFormClient({
  createDeeperHunch,
  originalHunch,
}: {
  createDeeperHunch: (formData: FormData) => void;
  originalHunch: any;
}) {
  const [loading, setLoading] = useState(false);

  // set the initial values of the form to the original hunch
  const initialProblem = originalHunch.possible_problem;
  const initialSolution = originalHunch.possible_solution;
  const initialUsers = originalHunch.possible_client;

  const handleCreateDeeperHunch = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await createDeeperHunch(new FormData(e.target));
    setLoading(false);
  };

  return (
    <form onSubmit={handleCreateDeeperHunch} className="space-y-4 h-auto mb-16">
      <div className="flex flex-col">
        <Label htmlFor="problem" className="mb-4">
          <h2 className="text-lg">Expand on your problem</h2>
          <p className="text-sm text-muted-foreground">
            Let&apos;s dive deeper into the problem you are trying to solve.
          </p>
        </Label>
        <Textarea
          id="problem"
          name="problem"
          placeholder={initialProblem}
          required
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="solution" className="mb-4">
          <h2 className="text-lg">Expand on your solution</h2>
          <p className="text-sm text-muted-foreground">
            Now, let&apos;s flesh out the solution you are proposing.
          </p>
        </Label>
        <Textarea
          id="solution"
          name="solution"
          placeholder={initialSolution}
          required
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="users" className="mb-4">
          <h2 className="text-lg">Who are the users?</h2>
          <p className="text-sm text-muted-foreground">
            Let&apos;s more deeply identify the users of this solution.
          </p>
        </Label>
        <Textarea id="users" name="users" placeholder={initialUsers} required />
      </div>
      {loading ? (
        <Button
          disabled
          className="w-[calc(100%-2rem)] fixed bottom-4 sm:w-full sm:relative sm:bottom-0"
        >
          <Loader2 className="animate-spin w-4 h-4 mr-2" />
          Creating Deeper Hunch...
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-[calc(100%-2rem)] fixed bottom-4 sm:w-full sm:relative sm:bottom-0"
        >
          Create Deeper Hunch
        </Button>
      )}
    </form>
  );
}

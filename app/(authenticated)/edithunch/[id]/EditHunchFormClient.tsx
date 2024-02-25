"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Loader2 } from "lucide-react";

import { useState, useEffect } from "react";

export default function EditHunchFormClient({
  updateHunch,
  originalHunch,
  deeperHunch,
}: {
  updateHunch: (formData: FormData) => void;
  originalHunch: any;
  deeperHunch: any;
}) {
  const [loading, setLoading] = useState(false);

  // set the initial values of the form to the original hunch
  const initialProblem = originalHunch.possible_problem;
  const initialSolution = originalHunch.possible_solution;
  const initialUsers = originalHunch.possible_client;

  const deeperHunchProblem = deeperHunch[0]?.problem || "";
  const deeperHunchSolution = deeperHunch[0]?.solution || "";
  const deeperHunchClient = deeperHunch[0]?.client || "";

  useEffect(() => {
    const problemInput = document.getElementById("problem") as HTMLInputElement;
    const solutionInput = document.getElementById(
      "solution"
    ) as HTMLInputElement;
    const usersInput = document.getElementById("users") as HTMLInputElement;

    const deeperProblemInput = document.getElementById(
      "deeperProblem"
    ) as HTMLInputElement;

    const deeperSolutionInput = document.getElementById(
      "deeperSolution"
    ) as HTMLInputElement;

    const deeperUsersInput = document.getElementById(
      "deeperUsers"
    ) as HTMLInputElement;

    problemInput.value = initialProblem;
    solutionInput.value = initialSolution;
    usersInput.value = initialUsers;

    if (deeperHunch) {
      deeperProblemInput.value = deeperHunchProblem;
      deeperSolutionInput.value = deeperHunchSolution;
      deeperUsersInput.value = deeperHunchClient;
    }
  }, [
    initialProblem,
    initialSolution,
    initialUsers,
    deeperHunchProblem,
    deeperHunchSolution,
    deeperHunchClient,
    deeperHunch,
  ]);

  const handleUpdateHunch = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await updateHunch(new FormData(e.target));
    setLoading(false);
  };

  console.log(deeperHunch);

  return (
    <form onSubmit={handleUpdateHunch} className="space-y-4 h-auto mb-16">
      <div className="flex flex-col">
        <Label htmlFor="problem" className="mb-4">
          <h2 className="text-lg">Possible Problem</h2>
          <p className="text-sm text-muted-foreground">
            What is the problem you are trying to solve?
          </p>
        </Label>
        <Textarea
          id="problem"
          name="problem"
          placeholder="Possible Problem"
          required
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="solution" className="mb-4">
          <h2 className="text-lg">Possible Solution</h2>
          <p className="text-sm text-muted-foreground">
            What is the solution you are proposing?
          </p>
        </Label>
        <Textarea
          id="solution"
          name="solution"
          placeholder="Possible Solution"
          required
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="users" className="mb-4">
          <h2 className="text-lg">Possible Users</h2>
          <p className="text-sm text-muted-foreground">
            Who are the users of this solution?
          </p>
        </Label>
        <Textarea
          id="users"
          name="users"
          placeholder="Possible Users"
          required
        />
      </div>
      {deeperHunch && deeperHunch.length > 0 ? (
        <>
          <div className="flex flex-col">
            <Label htmlFor="problem" className="mb-4">
              <h2 className="text-lg">Expand on your problem</h2>
              <p className="text-sm text-muted-foreground">
                Let&apos;s dive deeper into the problem you are trying to solve.
              </p>
            </Label>
            <Textarea
              id="deeperProblem"
              name="deeperProblem"
              placeholder={deeperHunchProblem}
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
              id="deeperSolution"
              name="deeperSolution"
              placeholder={deeperHunchSolution}
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
            <Textarea
              id="deeperUsers"
              name="deeperUsers"
              placeholder={deeperHunchClient}
              required
            />
          </div>
        </>
      ) : null}
      {loading ? (
        <Button
          disabled
          className="w-[calc(100%-2rem)] fixed bottom-4 sm:w-full sm:relative sm:bottom-0"
        >
          <Loader2 className="animate-spin w-4 h-4 mr-2" />
          Updating Hunch...
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-[calc(100%-2rem)] fixed bottom-4 sm:w-full sm:relative sm:bottom-0"
        >
          Update Hunch
        </Button>
      )}
    </form>
  );
}

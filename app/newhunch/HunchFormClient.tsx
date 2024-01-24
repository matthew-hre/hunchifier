"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Loader2 } from "lucide-react";

import { useState } from "react";

export default function HunchFormClient({
  createHunch,
}: {
  createHunch: (formData: FormData) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleCreateHunch = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await createHunch(new FormData(e.target));
    setLoading(false);
  };

  return (
    <form onSubmit={handleCreateHunch} className="space-y-4 h-auto mb-16">
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
      {loading ? (
        <Button
          disabled
          className="w-[calc(100%-2rem)] fixed bottom-4 sm:w-full sm:relative sm:bottom-0"
        >
          <Loader2 className="animate-spin w-4 h-4 mr-2" />
          Creating Hunch...
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-[calc(100%-2rem)] fixed bottom-4 sm:w-full sm:relative sm:bottom-0"
        >
          Create Hunch
        </Button>
      )}
    </form>
  );
}

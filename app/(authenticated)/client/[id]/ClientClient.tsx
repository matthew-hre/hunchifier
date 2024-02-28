"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { Loader2 } from "lucide-react";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ClientClient({
  createDiscovery,
  createPersona,
}: {
  createDiscovery: (formData: FormData) => void;
  createPersona: (formData: FormData) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleCreateDiscovery = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await createDiscovery(new FormData(e.target));
    setLoading(false);
  };

  const handleCreatePersona = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await createPersona(new FormData(e.target));
    setLoading(false);
  };

  return (
    <Tabs defaultValue="discovery" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="discovery" className="flex-1">
          Client Discovery
        </TabsTrigger>
        <TabsTrigger value="persona" className="flex-1">
          Client Persona
        </TabsTrigger>
      </TabsList>
      <TabsContent value="discovery">
        <h1 className="text-xl mt-4 mb-1 font-semibold">Customer Discovery</h1>
        <p className="text-sm mb-4">
          Talk to someone who has the problem you are trying to solve, and see
          if your solution actually solves their problem. What did you learn?
        </p>
        <form
          onSubmit={handleCreateDiscovery}
          className="space-y-4 h-auto mb-16"
        >
          <div className="flex flex-col">
            <Label htmlFor="problem" className="mb-4">
              <h2 className="text-lg">Customer Problem</h2>
              <p className="text-sm text-muted-foreground">
                Is the problem you are trying to solve actually a problem?
              </p>
            </Label>
            <Textarea
              id="problem"
              name="problem"
              placeholder="Possible Problem"
              rows={6}
              required
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="solution" className="mb-4">
              <h2 className="text-lg">Customer Solution</h2>
              <p className="text-sm text-muted-foreground">
                Does your solution actually solve the problem? How do you know?
              </p>
            </Label>
            <Textarea
              id="solution"
              name="solution"
              placeholder="Possible Solution"
              rows={6}
              required
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="notes" className="mb-4">
              <h2 className="text-lg">Notes</h2>
              <p className="text-sm text-muted-foreground">
                Are there any other notes you want to add about the client? Any
                important takeaways from your conversations?
              </p>
            </Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Notes"
              rows={6}
              required
            />
          </div>
          {loading ? (
            <Button
              disabled
              className="w-[calc(100%-2rem)] fixed bottom-4 sm:w-full sm:relative sm:bottom-0"
            >
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              Creating Customer Discovery...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-[calc(100%-2rem)] fixed bottom-4 sm:w-full sm:relative sm:bottom-0"
            >
              Create Customer Discovery
            </Button>
          )}
        </form>
      </TabsContent>
      <TabsContent value="persona">
        <h1 className="text-xl mt-4 mb-1 font-semibold">Customer Persona</h1>
        <p className="text-sm mb-4">
          Who is this person? What do they care about? What frustrations and
          pains are they trying to address as part of their problem? What are
          they trying to accomplish by solving the problem?
        </p>
        <form onSubmit={handleCreatePersona} className="space-y-4 h-auto mb-16">
          <div className="flex flex-col">
            <Label htmlFor="description" className="mb-4">
              <h2 className="text-lg">User Description</h2>
              <p className="text-sm text-muted-foreground">
                Give a high-level description of the user. How old are they?
                Where do they live? What do they do for a living? How much do
                they make? How educated are they?
              </p>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="User Description"
              required
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="psycho" className="mb-4">
              <h2 className="text-lg">Psychographic Information</h2>
              <p className="text-sm text-muted-foreground">
                What are the user&apos;s interests, hobbies, and values? What
                are their goals and aspirations? How tech savvy are they? What
                kind of lifestyle do they lead?
              </p>
            </Label>
            <Textarea
              id="psycho"
              name="psycho"
              placeholder="Psychographic Information"
              required
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="pains" className="mb-4">
              <h2 className="text-lg">Pains</h2>
              <p className="text-sm text-muted-foreground">
                What are the user&apos;s frustrations and pains? How are they a
                result of the problem?
              </p>
            </Label>
            <Textarea id="pains" name="pains" placeholder="Pains" required />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="jobs" className="mb-4">
              <h2 className="text-lg">Jobs to be Done</h2>
              <p className="text-sm text-muted-foreground">
                What is the user trying to accomplish by solving the problem?
                What is the product being hired to do?
              </p>
              <h3 className="text-lg mt-4 mb-2">Types of Jobs</h3>
              <ul className="list-inside space-y-2">
                <li className="font-normal leading-6 text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Functional Jobs:
                  </span>{" "}
                  Practical, functional tasks - e.g. purchasing a smart phone
                  helps someone stay connected on the go
                </li>
                <li className="font-normal leading-6 text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Emotional Jobs:
                  </span>{" "}
                  Fulfilling emotional or social needs - e.g. purchasing a smart
                  phone helps you feel connected and socially relevant
                </li>
                <li className="font-normal leading-6 text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Social Jobs:
                  </span>{" "}
                  How solving the problem affects the users&apos; relationships
                  - e.g. purchasing a smart phone helps users keep up with
                  friends and family
                </li>
                <li className="font-normal leading-6 text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Progress Jobs:
                  </span>{" "}
                  Achieving progress in the lives by solving the problem - e.g.
                  purchasing smart phone increases productivity
                </li>
                <li className="font-normal leading-6 text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    Situational Jobs:
                  </span>{" "}
                  The circumstances or situations in which users need the
                  product or service - e.g. purchasing a smart phone is helpful
                  when you have a long commute to work and want to stay in touch
                </li>
              </ul>
            </Label>
            <Textarea
              id="jobs"
              name="jobs"
              placeholder="Jobs to be Done"
              required
            />
          </div>
          {loading ? (
            <Button
              disabled
              className="w-[calc(100%-1rem)] fixed bottom-4 sm:w-full sm:relative sm:bottom-0"
            >
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
              Creating Customer Persona...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-[calc(100%-1rem)] fixed bottom-4 sm:w-full sm:relative sm:bottom-0"
            >
              Create Customer Persona
            </Button>
          )}
        </form>
      </TabsContent>
    </Tabs>
  );
}

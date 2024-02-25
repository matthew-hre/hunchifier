import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiTrash } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { FiStar } from "react-icons/fi";

import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Hunch({ hunch }: any) {
  const deleteHunch = async () => {
    "use server";

    const supabase = createClient();

    const { error } = await supabase
      .from("hunches_ext")
      .delete()
      .eq("hunchID", hunch.id);

    if (error) {
      console.error(error);
      return;
    }

    const { error: error2 } = await supabase
      .from("hunches")
      .delete()
      .eq("id", hunch.id);

    if (error2) {
      console.error(error);
      return;
    }

    return redirect("/app");
  };

  const getTimestamp = () => {
    // if there's no "last updated" date, return "created at" date
    if (!hunch.updated_at) {
      return "Created at " + formatDateTime(hunch.created_at);
    }

    return "Last updated at " + formatDateTime(hunch.updated_at);
  };

  const getDeeperHunch = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("hunches_ext")
      .select("id, problem, solution, client")
      .eq("hunchID", hunch.id);

    if (error) {
      console.error(error);
      return;
    }

    return data[0];
  };

  const deeperHunch = await getDeeperHunch();

  return (
    <Card
      className={`relative ${
        deeperHunch ? "border-yellow-400 border-2 shadow-yellow-400" : ""
      }`}
    >
      <CardHeader className="pb-4">
        <CardDescription>{getTimestamp()}</CardDescription>
        <form action={deleteHunch} className="absolute right-2 top-1 ">
          <Button
            type="submit"
            className="rounded-full w-10 h-10 p-2"
            variant="ghost"
          >
            <FiTrash />
          </Button>
        </form>
        <Link
          href={`/edithunch/${hunch.id}`}
          className="absolute right-14 top-1"
        >
          <Button
            type="submit"
            className="rounded-full w-10 h-10 p-2"
            variant="ghost"
          >
            <FiEdit />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-2">
          <p
            className={`${
              deeperHunch ? "text-xl" : "text-lg"
            } font-semibold text-primary`}
          >
            Possible Problem
          </p>
          <p className="text-md text-muted-foreground break-words">
            {hunch.possible_problem}
          </p>
          {
            // if there's a deeper hunch, show it
            deeperHunch ? (
              <div className="mt-2 mb-4">
                <p className="text-lg font-semibold text-primary">
                  Deeper Problem
                </p>
                <p className="text-md text-muted-foreground break-words">
                  {deeperHunch.problem}
                </p>
              </div>
            ) : null
          }
        </div>
        <div className="mb-2">
          <p
            className={`${
              deeperHunch ? "text-xl" : "text-lg"
            } font-semibold text-primary`}
          >
            Possible Solution
          </p>
          <p className="text-md text-muted-foreground break-words">
            {hunch.possible_solution}
          </p>
          {
            // if there's a deeper hunch, show it
            deeperHunch ? (
              <div className="mt-2 mb-4">
                <p className="text-lg font-semibold text-primary">
                  Deeper Solution
                </p>
                <p className="text-md text-muted-foreground break-words">
                  {deeperHunch.solution}
                </p>
              </div>
            ) : null
          }
        </div>
        <div className="mb-2">
          <p
            className={`${
              deeperHunch ? "text-xl" : "text-lg"
            } font-semibold text-primary`}
          >
            Possible Client
          </p>
          <p className="text-md text-muted-foreground break-words">
            {hunch.possible_client}
          </p>
          {
            // if there's a deeper hunch, show it
            deeperHunch ? (
              <div className="mt-2">
                <p className="text-lg font-semibold text-primary">
                  Deeper Client
                </p>
                <p className="text-md text-muted-foreground break-words">
                  {deeperHunch.client}
                </p>
              </div>
            ) : null
          }
        </div>
      </CardContent>
      {deeperHunch ? null : (
        <CardFooter className="pb-2">
          <div className="flex flex-row justify-between">
            <Link href={`/deeper/${hunch.id}`}>
              <Button
                variant="link"
                className="text-muted-foreground pt-0 pl-0 group"
              >
                <p className="text-muted-foreground flex flex-row items-center justify-between">
                  <FiStar className="mr-2" />
                  Looking to go deeper?
                </p>
              </Button>
            </Link>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

function formatDateTime(date: string) {
  const dateObj = new Date(date);
  const localDate = dateObj.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return localDate;
}

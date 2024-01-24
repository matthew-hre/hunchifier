import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiTrash } from "react-icons/fi";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Hunch({ hunch }: any) {
  const deleteHunch = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase
      .from("hunches")
      .delete()
      .eq("id", hunch.id);

    if (error) {
      console.error(error);
      return;
    }

    return redirect("/");
  };

  return (
    <Card className="relative">
      <CardHeader className="pb-4">
        <CardDescription>{formatDateTime(hunch.created_at)}</CardDescription>
        <form action={deleteHunch} className="absolute right-2 top-1 ">
          <Button
            type="submit"
            className="rounded-full w-10 h-10 p-2"
            variant="ghost"
          >
            <FiTrash />
          </Button>
        </form>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <p className="text-lg font-semibold text-primary">Possible Problem</p>
          <p className="text-md text-muted-foreground break-words">
            {hunch.possible_problem}
          </p>
        </div>
        <div className="mb-2">
          <p className="text-lg font-semibold text-primary">
            Possible Solution
          </p>
          <p className="text-md text-muted-foreground break-words">
            {hunch.possible_solution}
          </p>
        </div>
        <div className="mb-2">
          <p className="text-lg font-semibold text-primary">Possible Client</p>
          <p className="text-md text-muted-foreground break-words">
            {hunch.possible_client}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function formatDateTime(date: string) {
  const dateObj = new Date(date);
  const localDate = dateObj.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return localDate;
}

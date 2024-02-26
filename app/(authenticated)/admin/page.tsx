import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import { getUserId } from "@/lib/supabase/utils";
import { redirect } from "next/navigation";

import Link from "next/link";

export default async function AdminPanel() {
  const supabase = createClient();

  const userId = await getUserId();

  let { data: profiles, error } = await supabase
    .from("user_permissions")
    .select("admin")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    return;
  }

  if (!profiles || !profiles[0]?.admin) {
    redirect("/app");
  }

  const getAllHunches = async () => {
    const { data, error } = await supabase
      .from("detailed_hunches")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  const getAllUsers = async () => {
    const { data, error } = await supabase.from("user_hunch_count").select("*");

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  return (
    <div className="absolute top-0 left-0 p-12 w-full flex flex-col items-center min-h-screen">
      <div className="flex flex-col items-center w-full">
        <header className="flex items-center justify-center w-full mt-8 px-4 py-2 border-b border-secondary">
          <p className="text-primary">Hunchifier Users</p>
        </header>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>

            <TableHead>Hunches Created</TableHead>
            <TableHead>Hunches Deepened</TableHead>
            <TableHead>Clients Discovered</TableHead>
            <TableHead className="text-right">Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {await getAllUsers().then((users: any) => {
            return users?.map((user: any) => {
              return (
                <TableRow key={user.id} className="hover:bg-secondary">
                  <TableCell className="break-words max-w-64 align-top font-semibold">
                    <Link
                      href={`/admin/${user.user_id}`}
                      className="text-primary hover:underline"
                    >
                      {user.first_name} {user.last_name}
                    </Link>
                  </TableCell>
                  <TableCell className="break-words max-w-64 align-top">
                    {user.hunch_count}
                  </TableCell>
                  <TableCell className="break-words max-w-64 align-top">
                    {user.extended_count}
                  </TableCell>
                  <TableCell className="break-words max-w-64 align-top">
                    {user.discovery_count}
                  </TableCell>
                  <TableCell className="text-right">{user.email}</TableCell>
                </TableRow>
              );
            });
          })}
        </TableBody>
      </Table>
      <div className="flex flex-col items-center w-full">
        <header className="flex items-center justify-center w-full mt-8 px-4 py-2 border-b border-secondary">
          <p className="text-primary">Hunchifier Hunches</p>
        </header>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Problem</TableHead>
            <TableHead>Solution</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="text-right">Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {await getAllHunches().then((hunches) => {
            return hunches?.map((hunch) => {
              return (
                <TableRow key={hunch.id} className="hover:bg-secondary">
                  <TableCell className="break-words max-w-64 align-top font-semibold">
                    <Link
                      href={`/admin/${hunch.user_id}`}
                      className="text-primary hover:underline"
                    >
                      {hunch.first_name} {hunch.last_name}
                    </Link>
                  </TableCell>
                  <TableCell className="break-words max-w-64 align-top">
                    {hunch.possible_problem}
                  </TableCell>
                  <TableCell className="break-words max-w-64 align-top">
                    {hunch.possible_solution}
                  </TableCell>
                  <TableCell className="break-words max-w-64 align-top">
                    {hunch.possible_client}
                  </TableCell>
                  <TableCell className="text-right align-top">
                    {formatDateTime(hunch.created_at)}
                  </TableCell>
                </TableRow>
              );
            });
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function formatDateTime(date: Date) {
  const d = new Date(date);
  const localTime = d.toLocaleTimeString("en-US");
  return `${d.toLocaleDateString()} ${localTime}`;
}

import { Card, CardFooter } from "@/components/ui/card";
import {
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

import { FiHelpCircle, FiStar, FiUsers } from "react-icons/fi";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createClient } from "@/lib/supabase/server";
import { getUserId } from "@/lib/supabase/utils";

export default async function AdminHunch({
  hunch,
  className,
}: {
  hunch: any;
  className?: string;
}) {
  const discovery = await getDiscovery(hunch.deeper_id);
  const personas = await getPersonas(hunch.deeper_id);

  return (
    <Card
      className={`w-full ${
        hunch.deeper_id ? "border-yellow-400 border-2 shadow-yellow-400" : ""
      } ${className}`}
    >
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Problem</TableHead>
            <TableHead>Solution</TableHead>
            <TableHead>Client</TableHead>
          </TableRow>
        </TableHeader>
        <TableRow key={hunch.id} className="hover:bg-secondary">
          <TableCell className="break-words w-1/3 align-top">
            {hunch.possible_problem}
          </TableCell>
          <TableCell className="break-words w-1/3 align-top">
            {hunch.possible_solution}
          </TableCell>
          <TableCell className="break-words flex-1 align-top">
            {hunch.possible_client}
          </TableCell>
        </TableRow>
      </Table>
      <Accordion
        type="single"
        collapsible
        className={!hunch.deeper_problem ? "hidden" : ""}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger
            className={`font-medium text-muted-foreground text-sm mx-4`}
          >
            <FiStar size={18} className="mr-2" />
            Deeper Hunch
          </AccordionTrigger>
          <AccordionContent>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Deeper Problem</TableHead>
                  <TableHead>Deeper Solution</TableHead>
                  <TableHead>Deeper Client</TableHead>
                </TableRow>
              </TableHeader>
              <TableRow key={hunch.id} className="hover:bg-secondary">
                <TableCell className="break-words w-1/3 align-top">
                  {hunch.deeper_problem}
                </TableCell>
                <TableCell className="break-words w-1/3 align-top">
                  {hunch.deeper_solution}
                </TableCell>
                <TableCell className="break-words w-1/3 align-top">
                  {hunch.deeper_client}
                </TableCell>
              </TableRow>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion
        type="single"
        collapsible
        className={!discovery?.length ? "hidden" : ""}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger
            className={`font-medium text-muted-foreground text-sm mx-4`}
          >
            <FiHelpCircle size={18} className="mr-2" />
            Customer Discovery
          </AccordionTrigger>
          <AccordionContent>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Customer Problem</TableHead>
                  <TableHead>Customer Solution</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              {discovery?.map((d: any) => (
                <TableRow key={d.id} className="hover:bg-secondary">
                  <TableCell className="break-words w-1/3 align-top">
                    {d.problem}
                  </TableCell>
                  <TableCell className="break-words w-1/3 align-top">
                    {d.solution}
                  </TableCell>
                  <TableCell className="break-words w-1/3 align-top">
                    {d.notes}
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion
        type="single"
        collapsible
        className={!personas?.length ? "hidden" : ""}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger
            className={`font-medium text-muted-foreground text-sm mx-4`}
          >
            <FiUsers size={18} className="mr-2" />
            Personas
          </AccordionTrigger>
          <AccordionContent>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>User Description</TableHead>
                  <TableHead>Psychographic Info</TableHead>
                  <TableHead>Pains</TableHead>
                  <TableHead>Jobs to be Done</TableHead>
                </TableRow>
              </TableHeader>
              {personas?.map((p: any) => (
                <TableRow key={p.id} className="hover:bg-secondary">
                  <TableCell className="break-words w-1/4 align-top">
                    {p.user_description}
                  </TableCell>
                  <TableCell className="break-words w-1/4 align-top">
                    {p.psycho_info}
                  </TableCell>
                  <TableCell className="break-words w-1/4 align-top">
                    {p.pains}
                  </TableCell>
                  <TableCell className="break-words w-1/4 align-top">
                    {p.jobs_to_be_done}
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <CardFooter className="pl-4 pb-4">
        <p className="text-muted-foreground text-xs mt-4">
          Created at {formatDateTime(hunch.created_at)}
        </p>
      </CardFooter>
    </Card>
  );
}

async function getDiscovery(deeper_id: any) {
  if (!deeper_id) {
    return [];
  }

  const supabase = createClient();
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("discovery")
    .select("*")
    .eq("extHunchID", deeper_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  return data;
}

async function getPersonas(deeper_id: any) {
  if (!deeper_id) {
    return [];
  }

  const supabase = createClient();
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("personas")
    .select("*")
    .eq("deeperID", deeper_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  return data;
}

function formatDateTime(date: Date) {
  const d = new Date(date);
  const localTime = d.toLocaleTimeString("en-US");
  return `${d.toLocaleDateString()} ${localTime}`;
}

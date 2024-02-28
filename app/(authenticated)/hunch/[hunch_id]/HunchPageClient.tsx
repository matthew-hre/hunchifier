import {
  FiHelpCircle,
  FiStar,
  FiUser,
  FiPlus,
  FiEdit,
  FiUsers,
} from "react-icons/fi";
import { FaLightbulb } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function HunchPageClient({
  hunch,
  timestamp,
  deeperHunch,
  discoveries,
  personas,
}: {
  hunch: any;
  timestamp: string;
  deeperHunch?: any;
  discoveries?: any;
  personas?: any;
}) {
  return (
    <div className="mb-20 md:mb-0 space-y-2">
      <div className="flex flex-row items-center space-x-2 justify-center pb-4 px-2 pt-0 fixed bottom-0 left-0 z-10 w-full sm:static sm:p-0 bg-gradient-to-t from-background">
        {!deeperHunch ? (
          <Card className="flex-1">
            <Link href={`/deeper/${hunch.id}`}>
              <button
                type="submit"
                className="w-full flex flex-row items-center justify-center p-4 hover:bg-secondary transition-colors duration-200"
              >
                <FiStar size={20} />
                <p className="text-primary ml-2">Go Deeper</p>
              </button>
            </Link>
          </Card>
        ) : (
          <Card className="flex-1">
            <Link href={`/client/${deeperHunch.id}`}>
              <button
                type="submit"
                className="w-full flex flex-row items-center justify-center p-4 hover:bg-secondary transition-colors duration-200"
              >
                <FiUser size={20} />
                <FiPlus size={20} />
                <p className="text-primary ml-2">Add Client</p>
              </button>
            </Link>
          </Card>
        )}
        <Card className="flex-1">
          <Link href={`/edithunch/${hunch.id}`}>
            <button
              type="submit"
              className="w-full flex flex-row items-center justify-center p-4 hover:bg-secondary transition-colors duration-200"
            >
              <FiEdit size={20} />
              <p>
                <span className="text-primary ml-2">Edit Hunch</span>
              </p>
            </button>
          </Link>
        </Card>
      </div>
      <OriginalHunch hunch={hunch} />
      {deeperHunch && <DeeperHunch deeperHunch={deeperHunch} />}
      {discoveries && discoveries.length > 0 && (
        <Card className="relative">
          <CardHeader className="pb-0 space-y-0 flex flex-row space-x-2 items-center">
            <FaLightbulb size={28} />
            <p className="text-2xl font-semibold text-primary">Discoveries</p>
          </CardHeader>
          <CardContent className="pb-2 divide-y divide-solid divide-muted-background space-y-2">
            {discoveries.map((discovery: any) => (
              <div key={discovery.id} className="mb-2 pt-4">
                <p className="text-xs text-muted-foreground">
                  {formatDateTime(discovery.created_at)}
                </p>
                <div className="mb-2">
                  <p className="text-lg font-semibold text-primary">
                    Customer Problem
                  </p>
                  <p className="text-md text-muted-foreground break-words">
                    {discovery.problem}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-lg font-semibold text-primary">
                    Customer Solution
                  </p>
                  <p className="text-md text-muted-foreground break-words">
                    {discovery.solution}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-lg font-semibold text-primary">Notes</p>
                  <p className="text-md text-muted-foreground break-words">
                    {discovery.notes}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      {personas && personas.length > 0 && (
        <Card className="relative">
          <CardHeader className="pb-0 space-y-0 flex flex-row space-x-2 items-center">
            <FiUsers size={28} />
            <p className="text-2xl font-semibold text-primary">Personas</p>
          </CardHeader>
          <CardContent className="pb-2 divide-y divide-solid divide-muted-background space-y-2">
            {personas.map((persona: any) => (
              <div key={persona.id} className="mb-2 pt-4">
                <p className="text-xs text-muted-foreground">
                  {formatDateTime(persona.created_at)}
                </p>
                <div className="mb-2">
                  <p className="text-lg font-semibold text-primary">
                    User Description
                  </p>
                  <p className="text-md text-muted-foreground break-words">
                    {persona.user_description}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-lg font-semibold text-primary">
                    Psychographic Information
                  </p>
                  <p className="text-md text-muted-foreground break-words">
                    {persona.psycho_info}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-lg font-semibold text-primary">Pains</p>
                  <p className="text-md text-muted-foreground break-words">
                    {persona.pains}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-lg font-semibold text-primary">
                    Jobs to be Done
                  </p>
                  <p className="text-md text-muted-foreground break-words">
                    {persona.jobs_to_be_done}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

const OriginalHunch = ({ hunch }: { hunch: any }) => {
  return (
    <Card className="relative">
      <CardHeader className="pb-4 space-y-0 flex flex-row space-x-2 items-center">
        <FiHelpCircle size={28} />
        <p className="text-2xl font-semibold text-primary">Original Hunch</p>
      </CardHeader>
      <CardContent className="pb-2">
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
};

const DeeperHunch = ({ deeperHunch }: { deeperHunch: any }) => {
  return (
    <Card className="relative">
      <CardHeader className="pb-4 space-y-0 flex flex-row space-x-2 items-center">
        <FiStar size={28} />
        <p className="text-2xl font-semibold text-primary">Deeper Hunch</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-2">
          <p className="text-lg font-semibold text-primary">Problem</p>
          <p className="text-md text-muted-foreground break-words">
            {deeperHunch.problem}
          </p>
        </div>
        <div className="mb-2">
          <p className="text-lg font-semibold text-primary">Solution</p>
          <p className="text-md text-muted-foreground break-words">
            {deeperHunch.solution}
          </p>
        </div>
        <div className="mb-2">
          <p className="text-lg font-semibold text-primary">Client</p>
          <p className="text-md text-muted-foreground break-words">
            {deeperHunch.client}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

function formatDateTime(date: Date) {
  const d = new Date(date);
  const localTime = d.toLocaleTimeString("en-US");
  return `${d.toLocaleDateString()} ${localTime}`;
}

"use client";

import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";

import { ResponsivePie } from "@nivo/pie";

export default function TinderClient({
  getExistingStats,
  getRandomHunch,
  rateHunch,
}: {
  getExistingStats: any;
  getRandomHunch: any;
  rateHunch: any;
}) {
  const [goodIdeaCount, setGoodIdeaCount] = useState(0);
  const [funnyIdeaCount, setFunnyIdeaCount] = useState(0);
  const [badIdeasCount, setBadIdeasCount] = useState(0);
  const [gptCount, setGptCount] = useState(0);
  const [existsCount, setExistsCount] = useState(0);
  const [whatCount, setWhatCount] = useState(0);

  const totalHunchCount = 869;

  const [possibleProblem, setPossibleProblem] = useState("");
  const [possibleSolution, setPossibleSolution] = useState("");
  const [possibleClient, setPossibleClient] = useState("");
  const [currentId, setCurrentId] = useState(0);

  const [hunchAuthor, setHunchAuthor] = useState("");

  const handleGoodIdea = () => {
    setGoodIdeaCount(goodIdeaCount + 1);
    rateHunch(currentId, "good");
    getNewHunch();
  };

  const handleFunnyIdea = () => {
    setFunnyIdeaCount(funnyIdeaCount + 1);
    rateHunch(currentId, "funny");
    getNewHunch();
  };

  const handleBadIdea = () => {
    setBadIdeasCount(badIdeasCount + 1);
    rateHunch(currentId, "bad");
    getNewHunch();
  };

  const handleGpt = () => {
    setGptCount(gptCount + 1);
    rateHunch(currentId, "gpt");
    getNewHunch();
  };

  const handleExists = () => {
    setExistsCount(existsCount + 1);
    rateHunch(currentId, "exists");
    getNewHunch();
  };

  const handleWhat = () => {
    setWhatCount(whatCount + 1);
    rateHunch(currentId, "what");
    getNewHunch();
  };

  const getNewHunch = async () => {
    setPossibleProblem("Loading new hunch...");
    setPossibleSolution("");
    setPossibleClient("");
    setHunchAuthor("");

    const hunch = await getRandomHunch();
    const data = hunch[0];

    setPossibleProblem(data.possible_problem);
    setPossibleSolution(data.possible_solution);
    setPossibleClient(data.possible_client);
    setHunchAuthor(data.first_name + " " + data.last_name);
    setCurrentId(data.id);
  };

  const setExistingStats = async () => {
    const stats = await getExistingStats();

    setGoodIdeaCount(stats.good_ratings);
    setFunnyIdeaCount(stats.funny_ratings);
    setBadIdeasCount(stats.bad_ratings);
    setGptCount(stats.gpt_ratings);
    setExistsCount(stats.exists_ratings);
    setWhatCount(stats.what_ratings);
  };

  useEffect(() => {
    getNewHunch();

    setExistingStats();
    // eslint-disable-next-line
  }, []);

  const graphData = [
    {
      id: "bad",
      label: "Bad Idea",
      value: badIdeasCount,
      color: "#ec4899",
      bgcolor: "bg-pink-500",
      hovercolor: "hover:bg-pink-200 hover:text-pink-800",
      onClick: handleBadIdea,
    },
    {
      id: "Funny Idea",
      label: "Funny Idea",
      value: funnyIdeaCount,
      color: "#eab308",
      bgcolor: "bg-yellow-500",
      hovercolor: "hover:bg-yellow-200 hover:text-yellow-800",
      onClick: handleFunnyIdea,
    },

    {
      id: "Good Idea",
      label: "Good Idea",
      value: goodIdeaCount,
      color: "#22c55e",
      bgcolor: "bg-green-500",
      hovercolor: "hover:bg-green-200 hover:text-green-800",
      onClick: handleGoodIdea,
    },
    {
      id: "GPD'd Idea",
      label: "Obviously GPT'd",
      value: gptCount,
      color: "#3b82f6",
      bgcolor: "bg-blue-500",
      hovercolor: "hover:bg-blue-200 hover:text-blue-800",
      onClick: handleGpt,
    },
    {
      id: "Existing Idea",
      label: "Already Exists",
      value: existsCount,
      color: "#14b8a6",
      bgcolor: "bg-teal-500",
      hovercolor: "hover:bg-teal-200 hover:text-teal-800",
      onClick: handleExists,
    },
    {
      id: "...what?",
      label: "...what?",
      value: whatCount,
      color: "#f97316",
      bgcolor: "bg-orange-500",
      hovercolor: "hover:bg-orange-200 hover:text-orange-800",
      onClick: handleWhat,
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen gap-2 mx-2">
      <Card className="flex flex-col items-center justify-center w-full mt-16">
        <CardHeader>
          <p className="text-xl font-semibold text-primary">
            {badIdeasCount +
              funnyIdeaCount +
              goodIdeaCount +
              gptCount +
              existsCount +
              whatCount}{" "}
            out of {totalHunchCount} hunches voted on!
          </p>
        </CardHeader>
      </Card>
      <div className="flex flex-row w-full gap-x-2 flex-1">
        <Card className="min-h-64 w-[32rem] hidden lg:block">
          {badIdeasCount + funnyIdeaCount + goodIdeaCount + gptCount > 0 ? (
            <ResponsivePie
              data={graphData}
              colors={(d) => d.data.color}
              margin={{ top: 96, bottom: 96, left: 96, right: 96 }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-2xl font-semibold text-primary">
                No votes yet
              </p>
            </div>
          )}
        </Card>
        <Card className={`relative flex-1 overflow-y-auto`}>
          <CardHeader className="pb-4">
            <CardDescription>Made by {hunchAuthor}</CardDescription>
          </CardHeader>
          <CardContent className="pb-8 max-h-[calc(100vh-22rem)]">
            <div className="mb-2">
              <p className={`text-lg font-semibold text-primary`}>
                Possible Problem
              </p>
              <p className="text-md text-muted-foreground break-words">
                {possibleProblem}
              </p>
            </div>
            <div className="mb-2">
              <p className={`text-lg font-semibold text-primary`}>
                Possible Solution
              </p>
              <p className="text-md text-muted-foreground break-words">
                {possibleSolution}
              </p>
            </div>
            <div className="mb-2">
              <p className={`text-lg font-semibold text-primary`}>
                Possible Client
              </p>
              <p className="text-md text-muted-foreground break-words">
                {possibleClient}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="flex flex-wrap justify-center gap-2 py-4 w-full mt-auto mb-2">
        {graphData.map((button) => (
          <VoteButton
            key={button.id}
            style={`${button.bgcolor} ${button.hovercolor} text-white p-6`}
            onClick={button.onClick}
          >
            {button.label}
          </VoteButton>
        ))}
      </Card>
    </div>
  );
}

const VoteButton = ({ onClick, style, children }: any) => {
  return (
    <Button className={style} variant="outline" onClick={onClick}>
      {children}
    </Button>
  );
};

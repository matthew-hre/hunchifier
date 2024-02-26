"use client";

import { FiEdit, FiTrash, FiStar } from "react-icons/fi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function HunchClient({
  deleteHunch,
  timestamp,
  hunch,
  deeperHunch,
}: {
  deleteHunch: any;
  timestamp: string;
  hunch: any;
  deeperHunch?: any;
}) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteWithWait = async (event: any) => {
    setDeleting(true);
    deleteHunch().then(() => {
      setOpen(false);
      setDeleting(false);
    });
    event.preventDefault();
  };

  return (
    <Card
      className={`relative ${
        deeperHunch ? "border-yellow-400 border-2 shadow-yellow-400" : ""
      }`}
    >
      <CardHeader className="pb-4">
        <CardDescription>{timestamp}</CardDescription>
        <div className="absolute right-2 top-1">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className="rounded-full w-10 h-10 p-2 hover:bg-secondary flex flex-col items-center justify-center">
              <FiTrash />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this hunch. Your idea will be lost forever, like... tears...
                  in rain.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                {deleting ? (
                  <AlertDialogCancel disabled>Cancel</AlertDialogCancel>
                ) : (
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                )}
                {deleting ? (
                  <AlertDialogAction disabled>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Deleting...
                  </AlertDialogAction>
                ) : (
                  <AlertDialogAction onClick={handleDeleteWithWait}>
                    Delete
                  </AlertDialogAction>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

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

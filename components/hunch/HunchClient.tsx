"use client";

import { FiEdit, FiTrash, FiStar, FiMaximize2, FiUser } from "react-icons/fi";
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
  const [hidden, setHidden] = useState(false);

  const handleDeleteWithWait = async (event: any) => {
    setDeleting(true);
    deleteHunch(hunch.id).then(() => {
      setOpen(false);
      setDeleting(false);
      setHidden(true);
    });
    event.preventDefault();
  };

  if (hidden) {
    return null;
  }

  return (
    <Card
      className={`relative ${
        deeperHunch ? "border-yellow-400 border-2 shadow-yellow-400" : ""
      }`}
    >
      <CardHeader className="pb-4 space-y-0">
        {deeperHunch ? (
          <FiStar
            className="text-yellow-500 absolute top-4 right-4"
            size={32}
          />
        ) : null}
        <CardDescription>{timestamp}</CardDescription>
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
      <CardFooter className="pb-2">
        {deeperHunch ? (
          <div className="flex flex-row justify-between">
            <Link href={`/client/${deeperHunch.id}`}>
              <Button
                variant="link"
                className="text-muted-foreground pt-0 pl-0 group"
              >
                <p className="text-muted-foreground flex flex-row items-center justify-between">
                  <FiUser className="mr-2" />
                  Add a client discovery?
                </p>
              </Button>
            </Link>
          </div>
        ) : (
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
        )}
        <div className="absolute right-2 bottom-2">
          <DeleteAlert
            open={open}
            setOpen={setOpen}
            deleting={deleting}
            handleDeleteWithWait={handleDeleteWithWait}
          />
        </div>
        <Link
          href={`/edithunch/${hunch.id}`}
          className="absolute right-14 bottom-2"
        >
          <Button
            type="submit"
            className="rounded-full w-10 h-10 p-2"
            variant="ghost"
          >
            <FiEdit />
          </Button>
        </Link>
        <Link
          href={`/hunch/${hunch.id}`}
          className="absolute right-[6.5rem] bottom-2"
        >
          <Button
            type="submit"
            className="rounded-full w-10 h-10 p-2"
            variant="ghost"
          >
            <FiMaximize2 />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

function DeleteAlert({
  open,
  setOpen,
  deleting,
  handleDeleteWithWait,
}: {
  open: boolean;
  setOpen: any;
  deleting: boolean;
  handleDeleteWithWait: any;
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="rounded-full w-10 h-10 p-2 hover:bg-secondary flex flex-col items-center justify-center">
        <FiTrash />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            hunch. Your idea will be lost forever, like... tears... in rain.
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
  );
}

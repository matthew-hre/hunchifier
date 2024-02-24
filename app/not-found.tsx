import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center min-h-screen mt-4">
      <h1 className="text-3xl font-bold font-md">404</h1>
      <p>
        Page not found.{" "}
        <Link
          href="/app"
          className="text-md text-primary underline underline-offset-4 hover:no-underline"
        >
          Back to home
        </Link>
      </p>
    </div>
  );
}

import { redirect } from "next/navigation";

export default async function Root() {
  return redirect("/app");
}

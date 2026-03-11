import { redirect } from "next/navigation";

// Root → redirect to docs
export default function Home() {
  redirect("/docs");
}

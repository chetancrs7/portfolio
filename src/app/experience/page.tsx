import { redirect } from "next/navigation";

// Experience now lives as a section on the About page.
export default function ExperiencePage() {
  redirect("/about");
}

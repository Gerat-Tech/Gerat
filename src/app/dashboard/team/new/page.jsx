import React from "react";
import TeamMemberEditor from "../components/TeamMemberEditor";

export const metadata = {
  title: "New Team Member // Gerat Mission Control",
  description: "Register a new engineer, creative director, or advisor to the roster",
};

export default function NewTeamMemberPage() {
  return <TeamMemberEditor />;
}

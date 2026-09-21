import React from "react";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getCurrentUser, ROLES, SYSTEM_PRESET_USERS } from "@/lib/auth";
import UsersSettingsClientView from "./components/UsersSettingsClientView";

export const metadata = {
  title: "User & Role Governance · Gerat Mission Control",
  description: "Provision team accounts, assign RBAC roles, and manage credentials without external domain dependencies",
};

export default async function UsersSettingsPage() {
  const currentUser = await getCurrentUser();

  // Super Admin authorization guard
  if (!currentUser || currentUser.role !== ROLES.SUPER_ADMIN) {
    redirect("/dashboard/settings");
  }

  let users = [];
  try {
    users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        title: true,
        avatarUrl: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    console.warn("UsersSettingsPage: unable to fetch users:", error.message);
  }

  if (users.length === 0) {
    users = SYSTEM_PRESET_USERS.map((p) => ({
      id: p.id,
      email: p.email,
      name: p.name,
      role: p.role,
      title: p.title,
      avatarUrl: null,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  }

  return (
    <UsersSettingsClientView
      initialUsers={JSON.parse(JSON.stringify(users))}
      currentUser={JSON.parse(JSON.stringify(currentUser))}
    />
  );
}

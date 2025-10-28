"use client";

import OwnerProfilePage from "./profile";
import withRoleGuard from "@/lib/roleGuard";

export default withRoleGuard(OwnerProfilePage, "owner");

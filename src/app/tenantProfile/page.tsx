"use client";

import TenantProfilePage from "./profile";
import withRoleGuard from "@/lib/roleGuard";

export default withRoleGuard(TenantProfilePage, "tenant");

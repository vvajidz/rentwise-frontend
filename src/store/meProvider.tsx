// ✅ components/auth/ClientAuthSync.tsx
"use client";

import { useAuthSync } from "@/store/me";

export default function ClientAuthSync() {
  useAuthSync();
  return null; // Just mounts the hook silently
}

"use client";
import AuthDialog from "./AuthDialog";

export default function AuthButtons() {
  return (
    <div className="inline-flex rounded-md overflow-hidden border border-gray-900 shadow">
      <AuthDialog
        asChild
        triggerClass="px-4 py-2 bg-gray-900 text-white hover:bg-gray-700 text-base transition-colors"
      >
        <span>Get Started</span>
      </AuthDialog>

      <AuthDialog
        asChild
        triggerClass="px-4 py-2 bg-white text-gray-900 hover:bg-gray-900 hover:text-white text-base transition-colors border-l border-gray-900"
      >
        <span>Sign In</span>
      </AuthDialog>
    </div>
  );
}

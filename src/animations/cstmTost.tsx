"use client";

import { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "12px",
          background: "#fffefc",  // cream
          color: "#1a1e2e",      // deep navy text
          border: "1px solid #d4af37", // subtle gold border
        },
        success: {
          iconTheme: {
            primary: "#d4af37", // gold
            secondary: "#fffefc",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444", // red for error
            secondary: "#fffefc",
          },
        },
      }}
    />
  );
}

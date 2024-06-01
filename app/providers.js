// app/providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";

import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
      <Toaster
        containerStyle={{
          fontSize: "13px",
        }}
        position="top-center"
      />
    </SessionProvider>
  );
}

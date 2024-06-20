// app/providers.tsx
"use client";
import { SessionProvider, useSession } from "next-auth/react";

import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import Content from "./content";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <Content>{children}</Content>
      </NextUIProvider>
      <Toaster
        containerStyle={{
          fontSize: "13px",
        }}
        position="top-center"
      />
    </SessionProvider>
  );
}

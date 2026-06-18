import "./globals.css";

import {
  AnchoredToastProvider,
  ToastProvider,
} from "@tinji/ui/components/toast";
import { fontHeading, fontMono, fontSans } from "@tinji/ui/fonts";
import { ThemeProvider } from "@tinji/ui/shared/theme-provider";
import type { Metadata } from "next";
import { AppCommand } from "@/components/app/app-command";
import { DebugProvider } from "@/components/debug-context";

export const metadata: Metadata = {
  description: "ui.tinji.dev - the everything but AI company",
  metadataBase: new URL("https://ui.tinji.dev"),
  title: "ui.tinji.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontHeading.variable} ${fontSans.variable} ${fontMono.variable} relative bg-sidebar font-sans text-foreground antialiased`}
      >
        <ThemeProvider>
          <ToastProvider position="bottom-center">
            <AnchoredToastProvider>
              <DebugProvider>
                <AppCommand />
                {children}
              </DebugProvider>
            </AnchoredToastProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

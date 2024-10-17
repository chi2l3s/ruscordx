import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { link } from "fs";

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Ruscord",
  description: "Game calling application",
  icons: {
    icon: '/static/icon.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
      <body className={cn(
        nunito.className,
        "bg-white dark:bg-[#313338]"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          storageKey="ruscord-theme"
        >
          <SocketProvider>
            <ModalProvider />
            <QueryProvider>
              {children}
            </QueryProvider>
          </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}

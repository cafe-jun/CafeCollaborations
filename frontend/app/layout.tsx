"use client";
import { Inter } from "next/font/google";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import ReactQueryProviders from "@/hooks/useReactQuery";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
          },
        },
      })
  );
  return (
    <html lang="ko">
      <body>
        <ReactQueryProviders>
          <SessionProvider>
            <ChakraProvider>
              <Container maxW="1290px" px={[4, 6, 8]}>
                <Header />
                {children}
              </Container>
            </ChakraProvider>
          </SessionProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}

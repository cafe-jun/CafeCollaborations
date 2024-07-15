"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SessionProvider>
          <ChakraProvider>
            <Container maxW="1290px" px={[4, 6, 8]}>
              <Header />
              {children}
            </Container>
          </ChakraProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

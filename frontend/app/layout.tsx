"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "마케팅을 도워줘",
//   description: "마케팅을 도와줘 홈페이지 입니다.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SessionProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

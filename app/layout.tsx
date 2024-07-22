import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavLayout from "./NavLayout";
import { Container } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Language Games",
  description: "A site for playing games in different languages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ backgroundColor: "rgba(243, 246, 249, 0.6)" }}
      >
        <NavLayout>
          <Container>{children}</Container>
        </NavLayout>
      </body>
    </html>
  );
}

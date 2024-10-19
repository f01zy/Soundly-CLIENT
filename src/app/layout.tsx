import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/base.scss";
import { Providers } from "@/components/Wrappers/Providers";
import Layout from "@/components/Wrappers/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Home | Soundly`,
  description: "Unique web application for listening to a huge amount of music in a unique format",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  )
}
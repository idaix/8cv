import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "./providers";
const gfont = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Infinite CV",
  description:
    "8cv or Infinite CV is the ideal platform to build your portfolio, share your projects, and provide your links and CV. It offers a seamless way to showcase your skills and connect with potential opportunities.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={gfont.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

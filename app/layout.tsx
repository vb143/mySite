import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ContentProtection } from "@/components/providers/content-protection";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vaibhav Lutade - Portfolio",
  description: "Full-stack developer, blogger, and creative technologist. Explore my journey through code, projects, and life adventures.",
  keywords: ["developer", "portfolio", "blog", "projects", "full-stack", "web development"],
  authors: [{ name: "Vaibhav Lutade" }],
  creator: "Vaibhav Lutade",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Vaibhav Lutade - Portfolio",
    description: "Full-stack developer, blogger, and creative technologist",
    siteName: "Vaibhav Lutade Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav Lutade - Portfolio",
    description: "Full-stack developer, blogger, and creative technologist",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ContentProtection>
            {children}
          </ContentProtection>
        </ThemeProvider>
      </body>
    </html>
  );
}

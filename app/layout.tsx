import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Space_Mono, Inter, Bebas_Neue } from "next/font/google"

const mono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
})

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${mono.variable} ${sans.variable} ${bebasNeue.variable}`}
    >
      <body className="bg-white text-black antialiased dark:bg-neutral-950 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

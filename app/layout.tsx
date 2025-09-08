import "./globals.css"
import { Space_Mono, Inter, Bebas_Neue } from "next/font/google"
import InteractiveGridBackground from "./components/InteractiveGridBackground"

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
    <html lang="en" className={`${mono.variable} ${sans.variable} ${bebasNeue.variable}`}>
      <body>
        <InteractiveGridBackground />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}


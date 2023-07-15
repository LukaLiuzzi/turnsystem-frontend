import { UserProvider } from "@/contexts/UserContext"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sistema de turnos",
  description: "Creado por Luka Liuzzi",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <UserProvider>
        <body suppressHydrationWarning>{children}</body>
      </UserProvider>
    </html>
  )
}

import type { Metadata } from "next";
import AuthProvider from "./providers/auth-provider";
import { roboto } from "./fonts";
import "./styles/globals.css"


export const metadata: Metadata = {
  title: "System Invoicing",
  description: "Gestión de facturas sencilla y eficiente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${roboto.variable} ${roboto.className} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

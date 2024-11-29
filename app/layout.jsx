import localFont from "next/font/local";
import "./globals.css";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TanstackProvider from "@/providers/TanstackProvider";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "AnimalAtlas",
  description: "Simple and straightforward",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>
          {children}
        </TanstackProvider>
        <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}

import { Inter } from "next/font/google"
import "./globals.css";
import Head from "./head";

const inter = Inter({ subsets: ['latin']})

export const metadata = {
  title: "TopLoggerPlus",
};

export default function RootLayout({ children }) {

  const navbar = (
    <div className="flex justify-between items-center">
      <div>
      </div>
      <div>
        Hello2
      </div>
    </div>
  )

  return (
    <html lang="en">
      <Head/>
      <body className={'w-full max-w-[600px] mx-auto text-sm text-base min-h-screen text-gray-100 bg-zinc-900 ' + inter.className}>
        {navbar}
        {children}
      </body>
    </html>
  );
}

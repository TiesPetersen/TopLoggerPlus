import { Inter } from "next/font/google"
import "./globals.css";
import Head from "./head";
import Navbar from "@/components/Navbar";
import { LocalProvider } from "@/context/localContext";
import BottomInfo from "@/components/BottomInfo";
import { ToploggerProvider } from "@/context/toploggerContext";

const inter = Inter({ subsets: ['latin']})

export const metadata = {
  title: "TopLoggerPlus",
  description: "More features, useful tools, and games for TopLogger.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <Head/>
      <body className={'w-full max-w-[600px] mx-auto text-base min-h-screen text-gray-100 bg-zinc-900 ' + inter.className}>
        <LocalProvider>
          <ToploggerProvider>
            <Navbar/>
            {children}
            <BottomInfo/>
          </ToploggerProvider>
        </LocalProvider>
      </body>
    </html>
  );
}

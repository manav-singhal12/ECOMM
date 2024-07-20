import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Looks-Home Page",
  description: "Find best styling products from here",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <header className="w-full">
          <Navbar />
        </header>
        
        <main className="flex-grow p-4">
          {children}
        </main>
        
        <footer className="w-full">
          <Footer />
        </footer>
      </body>
    </html>
  );
}

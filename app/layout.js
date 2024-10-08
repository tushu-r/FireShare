import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "ShareFiles",
  description: "Upload , Share And Enjoy . Only Small File Allowed ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={outfit.className}>
           {children}
      </body>
    </html>
    </ClerkProvider>
  );
}

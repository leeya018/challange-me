import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="border-b sticky top-0 bg-white/70 backdrop-blur z-50">
          <nav className="mx-auto max-w-5xl flex items-center justify-between p-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src="/my_challaegs_logo.png"
                alt="My Challenges Logo"
                width={32}
                height={32}
                priority
              />
              <span>My Challenges</span>
            </Link>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl p-6">{children}</main>
      </body>
    </html>
  );
}

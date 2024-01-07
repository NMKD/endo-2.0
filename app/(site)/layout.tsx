// app/layout.tsx
import "@/styles/globals.css";
import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className={fontSans.variable}>
        <Providers>
          <div className="container">{children}</div>
        </Providers>
      </body>
    </html>
  );
}

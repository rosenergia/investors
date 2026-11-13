import "./globals.css";
import "./intake.css";
import "./atlas.css";
import "./journal.css";
export const metadata = {
  title: "investors.com.tr · Slovenya Brifing Masası",
  description:
    "Türk üreticiler için Avrupa’da sektör geliştirme. Tekstil, çelik, enerji, gıda, makine ve iklimlendirmede hedef pazarlar, alıcı kanalları ve firma başvurusu.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}

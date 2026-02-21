import { Google_Sans_Code, Zen_Kaku_Gothic_New } from "next/font/google";

export const ZenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-zen-kaku-gothic-new",
  subsets: ["latin"],
});

export const GoogleSansCode = Google_Sans_Code({
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-google-sans-code",
  subsets: ["latin"],
  adjustFontFallback: false,
});

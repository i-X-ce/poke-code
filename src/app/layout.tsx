import type { Metadata } from "next";
import "./globals.css";
import Side from "../components/Side";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import CustomThemeProvider from "../components/CustomThemeProvider";
import AppTitle from "../components/AppTitle";
import CommonSection from "../components/CommonSection";
import CommonFooter from "../components/CommonFooter";
import SnackbarProviderWrapper from "../components/SnackbarProviderWrapper";
import DialogController from "../components/DialogController";
import { Box } from "@mui/material";
import { PROJECT_NAME } from "@/lib/constant/projectName";

const metadataBase = (() => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (!siteUrl) {
    return new URL("http://localhost:3000");
  }

  try {
    return new URL(siteUrl);
  } catch {
    return new URL("http://localhost:3000");
  }
})();

export const metadata: Metadata = {
  title: PROJECT_NAME,
  description: "初代ポケモンのコードを共有するためのサイト",
  metadataBase,
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <AppRouterCacheProvider>
          <CustomThemeProvider>
            <SnackbarProviderWrapper>
              <AppTitle />
              <CommonSection>
                <Box position={"relative"} display={"flex"} gap={4}>
                  <Side />
                  <Box flex={1} minWidth={0}>
                    {children}
                  </Box>
                </Box>
              </CommonSection>
              <CommonFooter />
              <DialogController />
            </SnackbarProviderWrapper>
          </CustomThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

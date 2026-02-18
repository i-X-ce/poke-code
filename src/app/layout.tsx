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
import isDevelopment from "@/lib/util/isDevelopment";
import { PATH } from "@/lib/constant/paths";

const metadataBase = (() => {
  const siteUrl = isDevelopment ? "http://localhost:3000" : PATH.GITHUB_PAGES;
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
  title: {
    default: PROJECT_NAME,
    template: "%s - " + PROJECT_NAME,
  },
  description: "初代ポケモンのコードを共有するためのサイト",
  metadataBase,
  icons: {
    icon: "/favicon.svg",
  },
  robots: "index, follow",
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

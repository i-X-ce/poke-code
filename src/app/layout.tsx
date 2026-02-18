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

export const metadata: Metadata = {
  title: PROJECT_NAME,
  description: "初代ポケモンのコードを共有するためのサイト",
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
                  <Box flex={1}>{children}</Box>
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

"use client";
import { GOOGLE_ANALYTICS_ID } from "@/lib/constant/userSetting";
import isDevelopment from "@/lib/util/isDevelopment";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ReactGA from "react-ga4";

if (typeof window !== "undefined" && !isDevelopment) {
  ReactGA.initialize(GOOGLE_ANALYTICS_ID);
}

const GoogleAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (isDevelopment) return;

    ReactGA.send({
      hitType: "pageview",
      page: pathname,
    });
  }, [pathname]);

  return null;
};

export default GoogleAnalytics;

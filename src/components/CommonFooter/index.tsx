import { commonStyles } from "@/lib/util/commonStyle";
import { GitHub, Twitter, YouTube } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

const LINKS: IconLinkProps[] = [
  {
    href: "https://youtube.com/channel/UCqMBNDLJeljK0eFKpHcMjEw?si=QZRs54nKO-P6mRpM",
    icon: <YouTube />,
    label: "YouTube",
  },
  {
    href: "https://x.com/i_c_e_i_c_e_",
    icon: <Twitter />,
    label: "Twitter",
  },
  {
    href: "https://github.com/i-X-ce",
    icon: <GitHub />,
    label: "GitHub",
  },
];

function CommonFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Box
        component={"footer"}
        sx={{
          mt: "100px",
          borderTop: `1px solid`,
          borderTopColor: "divider",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"end"}
          gap={2}
          sx={{
            maxWidth: commonStyles.maxWidth,
            marginX: "auto",
            py: 4,
            px: 2,
          }}
        >
          {LINKS.map((link) => (
            <IconLink key={link.href} {...link} />
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          bgcolor: "action.hover",
        }}
      >
        <Box
          sx={{
            textAlign: "end",
            maxWidth: commonStyles.maxWidth,
            marginX: "auto",
            p: 2,
            pb: {
              xs: 8,
              md: 2,
            },
          }}
        >
          <Typography color={"textSecondary"}>
            Build with Next.js | © {currentYear} i-X-ce
          </Typography>
        </Box>
      </Box>
    </>
  );
}

interface IconLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

const IconLink = ({ href, icon, label }: IconLinkProps) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={1}
        sx={{ textDecoration: "none", color: "text.secondary" }}
      >
        {icon}
        <Typography>{label}</Typography>
      </Stack>
    </Link>
  );
};

export default CommonFooter;

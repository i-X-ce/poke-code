"use client";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import CustomMarkdownCodeComponent from "./CustomMarkdownCodeComponent";
import rehypeRaw from "rehype-raw";
import { GoogleSansCode } from "@/lib/util/fonts";
import { useParams, usePathname } from "next/navigation";
import { PATH, withBasePath } from "@/lib/constant/paths";

interface CustomMarkdownProps {
  children?: string;
}
function CustomMarkdown({ children }: CustomMarkdownProps) {
  const pathname = usePathname();
  const params = useParams();

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ children }) => (
          <>
            <Typography
              variant="h3"
              fontWeight={"500"}
              paddingTop={6}
              gutterBottom
              color="textPrimary"
            >
              {children}
            </Typography>
            <Divider />
          </>
        ),
        h2: ({ children }) => (
          <>
            <Typography
              variant="h4"
              fontWeight={"500"}
              paddingTop={5}
              gutterBottom
              color="textPrimary"
            >
              {children}
            </Typography>
            <Divider />
          </>
        ),
        h3: ({ children }) => (
          <>
            <Typography
              variant="h5"
              fontWeight={"500"}
              paddingTop={3}
              gutterBottom
              color="textPrimary"
            >
              {children}
            </Typography>
            <Divider />
          </>
        ),
        h4: ({ children }) => (
          <Typography
            variant="h6"
            paddingTop={2}
            gutterBottom
            color="textPrimary"
          >
            {children}
          </Typography>
        ),
        h5: ({ children }) => (
          <Typography
            variant="h6"
            fontWeight={"400"}
            paddingTop={1}
            gutterBottom
            color="textPrimary"
          >
            {children}
          </Typography>
        ),
        h6: ({ children }) => (
          <Typography
            variant="h6"
            fontWeight={"400"}
            paddingTop={1}
            gutterBottom
            color="textPrimary"
          >
            {children}
          </Typography>
        ),
        p: ({ children }) => (
          <Typography variant="body1" gutterBottom color="textPrimary">
            {children}
          </Typography>
        ),
        a: ({ href, children }) => (
          <Typography
            component={"a"}
            href={href}
            color="primary"
            sx={{ textDecoration: "underline" }}
          >
            {children}
          </Typography>
        ),
        strong: ({ children }) => (
          <Typography component={"span"} fontWeight={"bold"}>
            {children}
          </Typography>
        ),
        ul: ({ children }) => (
          <Typography
            component={"ul"}
            sx={{ paddingLeft: 3, paddingTop: 1, paddingBottom: 1 }}
          >
            {children}
          </Typography>
        ),
        ol: ({ children }) => (
          <Typography
            component={"ol"}
            sx={{ paddingLeft: 3, paddingTop: 1, paddingBottom: 1 }}
          >
            {children}
          </Typography>
        ),
        li: ({ children }) => (
          <Typography variant="body1" component={"li"} color="textPrimary">
            {children}
          </Typography>
        ),
        hr: () => <Divider sx={{ marginY: 2 }} />,
        code: ({ children, node }) => {
          const isInline =
            node?.position?.start.line === node?.position?.end.line;

          return (
            <Typography
              component={"span"}
              variant="body1"
              color="textSecondary"
              border={isInline ? "1px solid var(--bc-gray)" : "none"}
              sx={{
                fontFamily: GoogleSansCode.style.fontFamily,
                paddingX: isInline ? 1 : 0,
                borderRadius: 1,
              }}
            >
              {children}
            </Typography>
          );
        },
        pre: ({ children }) => (
          <CustomMarkdownCodeComponent>{children}</CustomMarkdownCodeComponent>
        ),
        blockquote: ({ children }) => (
          <Typography
            component={"blockquote"}
            my={1}
            ml={3}
            mr={0}
            p={1.5}
            borderLeft={"2px solid var(--bc-gray)"}
          >
            {children}
          </Typography>
        ),
        img: ({ src, alt }) => {
          const id = Array.isArray(params.id) ? params.id[0] : params.id;
          const preStr = pathname.includes("create")
            ? PATH.IMAGES()
            : PATH.IMAGES(id);
          const fullSrc =
            typeof src === "string" && src.startsWith("http")
              ? src
              : withBasePath(`${preStr}${src}`);

          return (
            <img
              src={fullSrc}
              alt={alt}
              style={{
                boxShadow: "var(--sh-regular)",
                maxWidth: "100%",
                minWidth: "40%",
              }}
            />
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
}

export default CustomMarkdown;

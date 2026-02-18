import { readCode } from "@/service/server/codes";
import type { CodePageProps } from "./page";
import { ImageResponse } from "next/og";
import { codeSize } from "@/lib/util/codeDataFormat";
import { sortVersions } from "@/lib/util/versionType";
import { PROJECT_NAME } from "@/lib/constant/projectName";

export { generateStaticParams } from "./page";

export const alt = "コードのオープングラフ画像";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const runtime = "nodejs";

export const dynamic = "force-static";

export const preferredRegion = "auto";

export const memory = "512mb";

export const timeout = 10;

export const maxDuration = 10;

export const name = "opengraph-image";

export default async function Image({ params }: CodePageProps) {
  const { id } = await params;
  const { data } = await readCode(id);

  if (!data) {
    return new Response("Code not found", { status: 404 });
  }

  const { title, detail, tags, date, blocks, content } = data;
  const versions = sortVersions(content.flatMap((c) => c.versions));
  const codeStr = blocks.flatMap((b) => b.code).join("");

  const displayDate = new Date(date).toLocaleDateString();

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        backgroundColor: "#fff",
        display: "flex",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "80px",
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 0",
          justifyContent: "space-between",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            transform: "rotate(90deg)",
            fontSize: "12px",
            letterSpacing: "0.2em",
            whiteSpace: "nowrap",
            paddingLeft: "40px",
            color: "#9ca3af",
          }}
        >
          {PROJECT_NAME}
        </div>
        <div
          style={{
            display: "flex",
            width: "4px",
            height: "128px",
            backgroundColor: "#374151",
          }}
        />
        <div
          style={{
            display: "flex",
            transform: "rotate(90deg)",
            fontSize: "12px",
            letterSpacing: "0.2em",
          }}
        >
          {codeSize(blocks)} B
        </div>
      </div>

      <div
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* IDとバージョン */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              padding: "30px 80px",
              borderBottom: "1px solid #e5e7eb",
              color: "#9ca3af",
            }}
          >
            {/* ID */}
            <div style={{ display: "flex", letterSpacing: "0.1em" }}>
              [{id}]
            </div>

            <p>{"- - - - - "}</p>

            {/* バージョン */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                minWidth: 0,
              }}
            >
              {versions.map((c, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {i > 0 && <span style={{ margin: "0 8px" }}> | </span>}
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* タイトルと詳細 */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            margin: "20px 80px",
          }}
        >
          {/* タイトル*/}
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              lineHeight: 1.1,
              display: "block",
              width: "100%",
              minWidth: 0,
              maxWidth: "100%",
              color: "#000",
              letterSpacing: "-0.02em",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              margin: "20px 0",
              paddingRight: "40px",
            }}
          >
            {title}
          </h1>
          {/* 詳細 */}
          <p
            style={{
              fontSize: "20px",
              color: "#6b7280",
              lineHeight: 2,
            }}
          >
            {detail}
          </p>
        </div>

        {/* タグと日付 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "0 80px 80px",
          }}
        >
          {/* タグ */}
          <div
            style={{
              display: "flex",
              flex: 1,
              flexWrap: "wrap",
              gap: "12px",
              fontSize: "14px",
            }}
          >
            {tags.map((tag, i) => {
              const longLength = 10;
              const isLong = tag.length > longLength;
              const displayTag = isLong
                ? `${tag.slice(0, longLength)}...`
                : tag;
              return (
                <span
                  key={i}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#f3f4f6",
                    color: "#1f2937",
                    fontWeight: 500,
                  }}
                >
                  #{displayTag}
                </span>
              );
            })}
          </div>

          {/* 日付 */}
          <div
            style={{
              display: "flex",
              fontSize: "14px",
              fontFamily: "monospace",
              color: "#9ca3af",
              flexShrink: 0,
            }}
          >
            {displayDate}
          </div>
        </div>
      </div>
    </div>,
  );
}

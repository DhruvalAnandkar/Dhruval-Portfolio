import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dhruval Anandkar — Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #064e3b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700 }}>Dhruval Anandkar</div>
        <div style={{ fontSize: 32, color: "#6ee7b7", marginTop: 20 }}>
          CS (Honors) @ Ashland University
        </div>
        <div style={{ fontSize: 28, color: "#94a3b8", marginTop: 10 }}>
          Data Engineering · Full-Stack · AI/ML
        </div>
      </div>
    ),
    { ...size }
  );
}

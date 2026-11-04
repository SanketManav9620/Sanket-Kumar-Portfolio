import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 92,
          background: "linear-gradient(135deg, #162032 0%, #18191f 50%, #0d0e10 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F5EBE0",
          fontWeight: 900,
          fontFamily: "system-ui, -apple-system, sans-serif",
          borderRadius: 40,
          border: "8px solid #B23A5B",
          letterSpacing: "-2px",
          boxShadow: "0 0 50px rgba(178, 58, 91, 0.5)",
        }}
      >
        <span style={{ color: "#F5EBE0" }}>S</span>
        <span style={{ color: "#D45476" }}>K</span>
      </div>
    ),
    {
      ...size,
    }
  );
}

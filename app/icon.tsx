import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "linear-gradient(135deg, #162032 0%, #18191f 50%, #0d0e10 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F5EBE0",
          fontWeight: 900,
          fontFamily: "system-ui, -apple-system, sans-serif",
          borderRadius: 7,
          border: "2px solid #B23A5B",
          letterSpacing: "-0.5px",
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

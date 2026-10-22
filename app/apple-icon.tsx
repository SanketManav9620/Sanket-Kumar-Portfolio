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
          fontSize: 88,
          background: "linear-gradient(135deg, #001b1e 0%, #003135 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0FA4AF",
          fontWeight: 900,
          fontFamily: "monospace",
          borderRadius: 36,
          border: "6px solid #0FA4AF",
          boxShadow: "0 0 40px rgba(15, 164, 175, 0.4)",
        }}
      >
        SK
      </div>
    ),
    {
      ...size,
    }
  );
}

import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation for high-DPI favicon
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "#001b1e",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0FA4AF",
          fontWeight: 800,
          fontFamily: "monospace",
          borderRadius: 8,
          border: "2px solid #0FA4AF",
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

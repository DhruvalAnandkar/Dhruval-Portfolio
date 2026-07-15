import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Tab favicon — slate D with emerald systems nodes */
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0f172a",
                    borderRadius: 8,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        width: 20,
                        height: 20,
                        borderRadius: 999,
                        background: "rgba(16,185,129,0.25)",
                    }}
                />
                <span
                    style={{
                        color: "#f8fafc",
                        fontSize: 19,
                        fontWeight: 800,
                        fontFamily: "system-ui, sans-serif",
                        letterSpacing: -1.2,
                        lineHeight: 1,
                        marginTop: -2,
                    }}
                >
                    D
                </span>
                <div
                    style={{
                        position: "absolute",
                        bottom: 5,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <div style={{ width: 3, height: 3, borderRadius: 999, background: "#10b981" }} />
                    <div style={{ width: 6, height: 1.5, background: "#10b981", borderRadius: 1 }} />
                    <div style={{ width: 3.5, height: 3.5, borderRadius: 999, background: "#34d399" }} />
                    <div style={{ width: 6, height: 1.5, background: "#10b981", borderRadius: 1 }} />
                    <div style={{ width: 3, height: 3, borderRadius: 999, background: "#10b981" }} />
                </div>
            </div>
        ),
        { ...size }
    );
}

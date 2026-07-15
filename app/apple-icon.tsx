import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — slate D + emerald systems accent */
export default function AppleIcon() {
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
                    borderRadius: 40,
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: -20,
                        right: -20,
                        width: 90,
                        height: 90,
                        borderRadius: 999,
                        background: "rgba(16,185,129,0.22)",
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    <span
                        style={{
                            color: "#f8fafc",
                            fontSize: 100,
                            fontWeight: 800,
                            fontFamily: "system-ui, sans-serif",
                            letterSpacing: -5,
                            lineHeight: 1,
                        }}
                    >
                        D
                    </span>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginTop: -8,
                        }}
                    >
                        <div style={{ width: 12, height: 12, borderRadius: 999, background: "#10b981" }} />
                        <div style={{ width: 28, height: 3, background: "#10b981", borderRadius: 2 }} />
                        <div style={{ width: 14, height: 14, borderRadius: 999, background: "#34d399" }} />
                        <div style={{ width: 28, height: 3, background: "#10b981", borderRadius: 2 }} />
                        <div style={{ width: 12, height: 12, borderRadius: 999, background: "#10b981" }} />
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}

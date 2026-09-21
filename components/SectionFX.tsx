"use client";

import SideMarginLife from "./SideMarginLife";

type Tone = "meadow" | "sky" | "mist" | "bloom" | "map";

/**
 * Per-section atmosphere — wash + soft clouds + haze on every screen.
 * Map/full get rays + motes for a richer sky.
 */
export default function SectionFX({
    tone = "sky",
    rails = "compact",
}: {
    tone?: Tone;
    rails?: false | "compact" | "full" | "map";
}) {
    const rich = rails === "map" || rails === "full";

    return (
        <>
            <div className={`section-atm section-atm-${tone}`} aria-hidden>
                <div className="section-atm-wash" />
                <div className="section-atm-glow" />
                <span className="section-atm-cloud section-atm-cloud-a" />
                <span className="section-atm-cloud section-atm-cloud-b" />
                {rich && (
                    <>
                        <div className="section-atm-rays" />
                        <div className="section-atm-motes" />
                    </>
                )}
                <div className="section-atm-haze" />
            </div>
            {rails && (
                <SideMarginLife
                    tone={rails === "map" ? "map" : "meadow"}
                    compact={rails === "compact"}
                />
            )}
        </>
    );
}

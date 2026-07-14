"use client";

import SideMarginLife from "./SideMarginLife";

type Tone = "meadow" | "sky" | "mist" | "bloom" | "map";

/**
 * Local hero-echo atmosphere + professional side rails for every mid-page section.
 * Pure CSS motion — no opacity gating on content.
 */
export default function SectionFX({
    tone = "sky",
    rails = "compact",
}: {
    tone?: Tone;
    /** false = no rails; "compact" | "full" | "map" */
    rails?: false | "compact" | "full" | "map";
}) {
    return (
        <>
            <div className={`section-atm section-atm-${tone}`} aria-hidden>
                <div className="section-atm-wash" />
                <div className="section-atm-rays" />
                <span className="section-atm-cloud section-atm-cloud-a" />
                <span className="section-atm-cloud section-atm-cloud-b" />
                <div className="section-atm-motes" />
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

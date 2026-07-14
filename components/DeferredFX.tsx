"use client";

import { useEffect, useState } from "react";
import { useSiteReady } from "./IntroExperience";
import SiteAtmosphere from "./SiteAtmosphere";
import SmoothScroll from "./SmoothScroll";
import CursorGlow from "./CursorGlow";
import EliteCursor from "./EliteCursor";
import ScrollTheatre from "./ScrollTheatre";

/**
 * Smooth scroll + atmosphere after intro. Hero paints first.
 */
export default function DeferredFX() {
    const ready = useSiteReady();
    const [fx, setFx] = useState(false);

    useEffect(() => {
        if (!ready) return;
        const id = window.setTimeout(() => setFx(true), 60);
        return () => window.clearTimeout(id);
    }, [ready]);

    if (!ready) return null;

    return (
        <>
            <SmoothScroll />
            <ScrollTheatre />
            {fx && (
                <>
                    <SiteAtmosphere />
                    <CursorGlow />
                    <EliteCursor />
                </>
            )}
        </>
    );
}

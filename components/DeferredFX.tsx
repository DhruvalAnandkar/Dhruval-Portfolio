"use client";

import { useEffect, useState } from "react";
import { useSiteReady } from "./IntroExperience";
import SiteAtmosphere from "./SiteAtmosphere";
import SmoothScroll from "./SmoothScroll";
import ScrollTheatre from "./ScrollTheatre";

/**
 * Atmosphere + hash-link helper after intro.
 * Lenis wheel smoothing removed (caused scroll rubber-band lag).
 * CursorGlow removed — spring glow fought the 1:1 cursor.
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
            {fx && <SiteAtmosphere />}
        </>
    );
}

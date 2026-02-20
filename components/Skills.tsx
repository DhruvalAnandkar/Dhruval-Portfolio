"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Database, BarChart3, BrainCircuit } from "lucide-react";

/* ─────────────────────────────────────────────────────────
   INLINE SVG BRAND MARKS (Simple Icons paths)
   All render at 16×16. Parent supplies colour via fill-current.
   ───────────────────────────────────────────────────────── */

const BrandSVG: Record<string, React.ReactElement> = {
    Java: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 0 .07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832 0 6.836-2.274-2.053-3.943-3.858-2.824-5.543 1.644-2.474 6.197-3.673 5.189-7.623M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0 0 .553.457 3.393.639" />
        </svg>
    ),
    Python: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.89S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.402 3.35-3.402h5.766s3.24.052 3.24-3.13V3.13S18.28 0 11.914 0Zm-3.2 1.814a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM20.11 6.07h-2.03v2.867s.109 3.402-3.35 3.402H8.965s-3.24-.052-3.24 3.13v5.27S5.24 24 11.606 24c6.367 0 5.987-2.656 5.987-2.656l-.007-2.752H11.77v-.826h8.13S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-.487Zm-2.51 13.302a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Z" />
        </svg>
    ),
    C: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.599 6.454a6 6 0 0 0-8.187 8.093l-3.595 3.596a1 1 0 0 0 1.414 1.414l3.596-3.595a6 6 0 0 0 8.093-8.187l-2.131 2.132a3 3 0 1 1-4.243 4.244 3 3 0 0 1 4.243-4.244l.81-.81z" />
        </svg>
    ),
    TypeScript: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
        </svg>
    ),
    "Node.js": (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.998.016a1.336 1.336 0 0 0-.672.18L2.154 5.588a1.345 1.345 0 0 0-.672 1.166v10.49c0 .48.258.925.672 1.165l9.172 5.393a1.336 1.336 0 0 0 1.344 0l9.172-5.393c.413-.24.672-.685.672-1.165V6.754c0-.482-.259-.926-.672-1.166L12.67.196a1.336 1.336 0 0 0-.672-.18zm-.187 4.693 5.252 9.1-1.875 1.082-1.234-2.14-2.094 3.625h-4.16l4.11-7.124-1.875-3.25 1.876-1.093zm3.063.313 1.875 1.094-3.72 6.443-1.875-1.088 3.72-6.449z" />
        </svg>
    ),
    FastAPI: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0C5.376 0 0 5.376 0 12c0 6.623 5.376 12 12 12 6.623 0 12-5.377 12-12 0-6.624-5.377-12-12-12zm-.624 21.624v-7.624H6.756L13.5 2.376v7.624h4.956l-7.08 11.624z" />
        </svg>
    ),
    PostgreSQL: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.79 1.82.125 3.555-.063 6.3.017 8.209c.133 2.885.729 4.907 1.798 6.033.56.594 1.189.907 1.847.962.602.05 1.178-.156 1.64-.619.511.544 1.257.758 1.997.756a3.95 3.95 0 0 0 1.085-.164c.013.083.025.165.037.245.16 1.06.276 1.857.325 2.38.05.526.072 1.091.23 1.61.158.516.474 1.06 1.188 1.215.323.07.726.07 1.216-.02.485-.093.859-.306 1.023-.672.085-.195.133-.423.149-.686.28-.22.645-.567.988-1.274.265-.544.355-1.092.47-1.87l.093-.695c.015-.105.04-.21.066-.31a5.6 5.6 0 0 0 2.54-.584c.622-.35 1.272-.99 1.55-1.83.526.214 1.04.17 1.466-.046.55-.276.956-.834 1.089-1.537.264-1.404-.174-2.96-1.135-4.025a5.08 5.08 0 0 0-1.802-1.21A13.993 13.993 0 0 0 19.086.022C18.468-.016 17.8.005 17.128 0z" />
        </svg>
    ),
    MySQL: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.274.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 0 0-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 0 0-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017.08c-.69.007-1.217-.144-1.58-.452-.362-.31-.544-.75-.544-1.322 0-.587.185-1.043.554-1.38.375-.337.907-.506 1.6-.506.217 0 .42.014.61.04v-1.006c-.19-.02-.388-.03-.593-.03-.34 0-.645.04-.917.118l-.012-.016.132-.57c.36-.096.754-.143 1.18-.143 1.028 0 1.542.49 1.542 1.47v3.33c-.337.087-.692.13-1.067.13zm3.44-.08h-.928V13.12h.927v5.575zm5.14 0h-1.03l-1.544-2.965h-.014c.023.37.033.755.033 1.15v1.815h-.855v-5.575h1.03l1.534 2.951h.013c-.02-.35-.027-.717-.027-1.104v-1.847h.86v5.575zm3.753-.08c-.692.007-1.22-.144-1.58-.452-.363-.31-.544-.75-.544-1.322 0-.587.184-1.043.553-1.38.376-.337.907-.506 1.601-.506.217 0 .42.014.61.04v-1.006a6.07 6.07 0 0 0-.593-.03c-.34 0-.645.04-.917.118l-.012-.016.132-.57c.36-.096.754-.143 1.18-.143 1.03 0 1.544.49 1.544 1.47v3.33c-.338.087-.693.13-1.068.13zm-1.335-.903c.26.14.578.22.958.22l.123-.012v-2.33c-.17-.03-.342-.044-.518-.044-.445 0-.79.12-1.037.358-.245.237-.368.568-.368.995 0 .374.082.659.244.856.173.198.375.326.598.326v-.37z" />
        </svg>
    ),
    Azure: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.05 4.24L6.56 18.05l-2.49.03L9.03 9.65 5.4 8.88zm.87.03l4.49 12.95-11.41 1.96 7.64-1.34 2.57-4.36-2.93-3.81z" />
        </svg>
    ),
    Docker: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.454-.338-1.496-.523-2.287-.364-.31-1.032-1.13-1.928-2.37-2.517l-.488-.237-.239.482c-.295.607-.46 1.286-.493 1.972-.108 1.151.38 2.048 1.108 2.702-1.074.455-2.298.502-2.336.504H.186a.186.186 0 0 0-.186.186c-.023 1.814.199 3.622.932 5.283.74 1.69 1.866 2.942 3.345 3.694 1.658.843 4.334 1.326 7.355 1.326 1.43.016 2.866-.102 4.28-.35 1.96-.37 3.856-1.098 5.345-2.428 1.168-1.04 2.039-2.37 2.666-4.049.13.03.557.109.634.13.705.165 1.386.063 1.896-.407.316-.293.484-.71.467-1.138-.02-.44-.244-.87-.574-1.14z" />
        </svg>
    ),
    Kubernetes: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.002.004.487.607zm-.833-2.9a.905.905 0 0 0 .059-.295c0-.047-.005-.093-.014-.138L6.55 9.927a5.184 5.184 0 0 0-.268 3.052l2.889-.493-.001-.004.201-.961zm1.32-1.39a.903.903 0 0 0 .225-.183l2.434-.486a5.16 5.16 0 0 0-2.36-2.197l-.3 2.866zm2.779 2.283c.014-.093.022-.187.022-.283 0-.151-.017-.299-.049-.442l-2.574.438.003.004-.434.598.001.005 1.858 1.384a5.188 5.188 0 0 0 1.173-1.704zm-2.01 2.725l-1.858-1.369v-.001l-.638.218-1.044 2.479a5.171 5.171 0 0 0 3.54-1.327zm.584-4.004l.34-.047 1.052-2.495a5.168 5.168 0 0 0-3.546-.028l1.121 2.465.022-.009.39.078.621.036zM12 2.4l.023.001C16.564 2.4 20.4 6.236 20.4 10.8c0 .358-.021.71-.064 1.055l.001-.006c-.011.077-.028.146-.05.213l.003-.009c-.013.039-.031.072-.053.102l.001-.001a.4.4 0 0 1-.317.167H2.08a.4.4 0 0 1-.317-.167l-.001-.001a.442.442 0 0 1-.052-.102l.001.003a1.302 1.302 0 0 1-.05-.213l-.001.006A9.332 9.332 0 0 1 1.6 10.8C1.6 6.236 5.436 2.4 10 2.4H12zm0-2.4A12 12 0 1 0 12 24 12 12 0 0 0 12 0z" />
        </svg>
    ),
    Git: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.393V8.835c-.217-.077-.424-.212-.608-.396-.541-.541-.674-1.337-.404-1.996L7.882 3.686 1.202 10.366c-.604.603-.604 1.582 0 2.187l10.48 10.477c.604.604 1.582.604 2.186 0l9.678-9.678c.604-.603.604-1.582 0-2.188z" />
        </svg>
    ),
    "Power BI": (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 21a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 4.5 3H6v18zm7.5 0H9.75V7.5H12zm4.5 0h-2.25V3H16.5zm3.75 0V9h-1.5v12z" />
        </svg>
    ),
    Tableau: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5 1.5v4h-4v1h4v4h1v-4h4v-1h-4v-4h-1zm-8 7v3H.5v1h3v3h1v-3h3v-1h-3V8.5h-1zm15 0v3h-3v1h3v3h1v-3h3v-1h-3V8.5h-1zm-7.5 7v3H8v1h3v3h1v-3h3v-1h-3v-3h-1z" />
        </svg>
    ),
    Excel: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.17 1.5H8.25a.83.83 0 0 0-.83.83V6H2.83A.83.83 0 0 0 2 6.83v10.34c0 .46.37.83.83.83H7.42v4.17c0 .46.37.83.83.83h12.92c.46 0 .83-.37.83-.83V2.33a.83.83 0 0 0-.83-.83zM8.25 3.17h12.08v4.16H8.25zm0 5.83H9.9l1.83 2.99 1.83-2.99h1.65l-2.64 4.17L15.38 17h-1.65l-1.99-3.19L9.75 17H8.1l2.56-4-2.41-4zm4.17 7.17h7.66v2.66h-7.66zm0 4.33h7.66v2.67h-7.66z" />
        </svg>
    ),
    TensorFlow: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.43 5.311l-6.168-3.564V2.378L20.65 4.756v5.178L12.42 14.9v5.178l-2.484 1.434V14.9l9.24-5.311.004 2.978z" />
        </svg>
    ),
    "Scikit-learn": (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 13.5h-2v-5l-3 3-3-3v5H5V9h2l3 3 3-3h2v6.5z" />
        </svg>
    ),
    Pandas: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.505.44v7.475l-4.53 2.617V3.06zm0 9.072v5.234l-4.53-2.617zm0 6.83v7.213l-4.53-2.617v-7.213zm5.02-13.44v7.213l4.53-2.617V3.062zm0 8.81v5.234l4.53-2.617zm0 6.83v7.213l4.53-2.617v-7.213zM12 6.234l4.53 2.617L12 11.469 7.47 8.851z" />
        </svg>
    ),
    LangChain: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 2a8 8 0 1 1 0 16A8 8 0 0 1 12 4zm-1 3v2H9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v2h2v-2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2V7h-2zm0 4H9v2h2v-2zm4 0h-2v2h2v-2z" />
        </svg>
    ),
    OpenCV: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 4a8 8 0 0 1 6.928 4H5.072A8 8 0 0 1 12 4zM5.072 16A8 8 0 0 0 12 20a8 8 0 0 0 6.928-4H5.072z" />
        </svg>
    ),
};

/* ─────────────────────────────────────────────────────────
   PILLAR DATA — 4 role-targeted categories
   ───────────────────────────────────────────────────────── */

const pillars = [
    {
        id: "swe",
        category: "Software Engineering & Backend",
        Icon: Code2,
        accent: "For SWE / Full-Stack roles",
        skills: ["Java", "Python", "C", "TypeScript", "Node.js", "FastAPI"],
    },
    {
        id: "data",
        category: "Data Engineering & Infra",
        Icon: Database,
        accent: "For Data Engineer roles",
        skills: ["PostgreSQL", "MySQL", "Azure", "Docker", "Kubernetes", "Git"],
    },
    {
        id: "bi",
        category: "Business Intelligence & Analytics",
        Icon: BarChart3,
        accent: "Internship Specialization",
        skills: ["Power BI", "Tableau", "Excel"],
    },
    {
        id: "ai",
        category: "AI & Machine Learning",
        Icon: BrainCircuit,
        accent: "For AI / ML roles",
        skills: ["TensorFlow", "Scikit-learn", "Pandas", "LangChain", "OpenCV"],
    },
];

/* ─────────────────────────────────────────────────────────
   SKILL CHIP
   ───────────────────────────────────────────────────────── */

function SkillChip({ name, delay }: { name: string; delay: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const icon = BrandSVG[name];
    const [hovered, setHovered] = useState(false);

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.38, delay }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ scale: 1.05, y: -2 }}
            className={`
        inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold
        cursor-default select-none transition-all duration-200
        ${hovered
                    ? "bg-emerald-50 border border-emerald-200 text-[#10b981]"
                    : "bg-slate-50 border border-slate-100 text-slate-700"
                }
      `}
        >
            {icon && (
                <span className={`transition-colors duration-200 ${hovered ? "text-[#10b981]" : "text-slate-400"}`}>
                    {icon}
                </span>
            )}
            {name}
        </motion.span>
    );
}

/* ─────────────────────────────────────────────────────────
   PILLAR CARD — individual 3D-tilting card
   ───────────────────────────────────────────────────────── */

function PillarCard({
    pillar,
    cardDelay,
    isInView: parentInView,
}: {
    pillar: (typeof pillars)[0];
    cardDelay: number;
    isInView: boolean;
}) {
    const { Icon, category, accent, skills } = pillar;
    const [glowing, setGlowing] = useState(false);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const springCfg = { stiffness: 180, damping: 20, mass: 0.5 };
    const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [5, -5]), springCfg);
    const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-5, 5]), springCfg);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        rawX.set((e.clientX - rect.left) / rect.width - 0.5);
        rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={parentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: cardDelay, ease: [0.22, 1, 0.36, 1] }}
            className="perspective"
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMove}
                onMouseEnter={() => setGlowing(true)}
                onMouseLeave={() => { rawX.set(0); rawY.set(0); setGlowing(false); }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                animate={{
                    boxShadow: glowing
                        ? "0 0 0 1.5px rgba(16,185,129,0.4), 0 20px 60px rgba(16,185,129,0.08), 0 8px 24px rgba(0,0,0,0.06)"
                        : "0 2px 8px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.06)",
                }}
                transition={{ boxShadow: { duration: 0.3 } }}
                className="glass rounded-3xl p-6 lg:p-7 h-full"
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-6">
                    <div>
                        <div className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl mb-3 transition-colors duration-300 ${glowing ? "bg-emerald-50 text-[#10b981]" : "bg-slate-100 text-slate-500"}`}>
                            <Icon size={20} />
                        </div>
                        <p className="font-extrabold text-slate-900 text-sm leading-snug">{category}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shrink-0 transition-all duration-300 ${glowing ? "bg-emerald-50 text-[#10b981] border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"}`}>
                        {accent}
                    </span>
                </div>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, si) => (
                        <SkillChip key={skill} name={skill} delay={cardDelay + si * 0.04} />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────
   SECTION
   ───────────────────────────────────────────────────────── */

export default function Skills() {
    const headerRef = useRef(null);
    const isInView = useInView(headerRef, { once: true, margin: "-60px" });

    return (
        <section id="skills" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header — staggered fade-in */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="text-[#10b981] text-sm font-semibold tracking-widest uppercase mb-3">
                        Expertise
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-3">
                        Tech Stack
                    </h2>
                    <p className="text-slate-500 text-lg max-w-xl">
                        Four targeted pillars — optimized for Data Engineering, BI, AI/ML, and Software Engineering roles.
                    </p>
                </motion.div>

                {/* 2×2 grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {pillars.map((pillar, gi) => (
                        <PillarCard
                            key={pillar.id}
                            pillar={pillar}
                            cardDelay={gi * 0.09}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

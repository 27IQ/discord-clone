import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
// Optional (recommended). Install: npm i -D @tailwindcss/forms
// import forms from "@tailwindcss/forms";

export default {
    content: ["./src/**/*.{html,ts}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                d: {
                    bg: "#0f1116",
                    base: "#1e2128",
                    surface: "#2b2f38",
                    surface2: "#313640",
                    border: "#3a3f4b",
                    text: "#f2f3f5",
                    muted: "#b5bac1",
                    subtle: "#8b8f98",
                    brand: "#5865f2",
                    brand2: "#4752c4",
                    success: "#23a55a",
                    danger: "#f23f43",
                    warn: "#f0b132",
                },
            },

            fontFamily: {
                sans: [
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "Segoe UI",
                    "Roboto",
                    "Helvetica",
                    "Arial",
                    "Apple Color Emoji",
                    "Segoe UI Emoji",
                ],
            },

            borderRadius: {
                d: "12px",
                "d-sm": "10px",
                "d-lg": "16px",
                pill: "999px",
            },

            boxShadow: {
                d: "0 8px 24px rgba(0,0,0,0.35)",
                "d-sm": "0 4px 14px rgba(0,0,0,0.30)",
            },

            ringColor: {
                d: "rgba(88, 101, 242, 0.55)",
            },
        },
    },

    plugins: [
        // forms, // optional
        plugin(({ addBase, addComponents, theme }) => {
            addBase({
                ":root": { colorScheme: "dark" },
                "html, body": { height: "100%" },
                body: {
                    backgroundColor: theme("colors.d.bg"),
                    color: theme("colors.d.text"),
                    fontFamily: theme("fontFamily.sans").join(", "),
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                },
                a: { color: theme("colors.d.brand") },
                "a:hover": { color: theme("colors.d.brand2") },
                "*": { borderColor: theme("colors.d.border") },
                "::selection": { background: "rgba(88,101,242,0.35)" },
            });

            addComponents({
                /* App / surfaces */
                ".d-app": {
                    backgroundColor: theme("colors.d.bg"),
                    color: theme("colors.d.text"),
                },
                ".text-d-danger": {
                    color: theme("colors.d.danger"),
                },
                ".text-d-warn": {
                    color: theme("colors.d.warn"),
                },
                ".d-surface": {
                    backgroundColor: theme("colors.d.base"),
                    border: `1px solid ${theme("colors.d.border")}`,
                    borderRadius: theme("borderRadius.d"),
                },
                ".d-card": {
                    backgroundColor: theme("colors.d.surface"),
                    border: `1px solid ${theme("colors.d.border")}`,
                    borderRadius: theme("borderRadius.d"),
                    boxShadow: theme("boxShadow.d-sm"),
                },
                ".d-divider": {
                    height: "1px",
                    backgroundColor: theme("colors.d.border"),
                    opacity: "0.9",
                },

                /* Buttons */
                ".d-btn": {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontWeight: "600",
                    borderRadius: theme("borderRadius.d-sm"),
                    padding: "0.55rem 0.9rem",
                    transition:
                        "background-color 120ms ease, transform 120ms ease, opacity 120ms ease, filter 120ms ease",
                    userSelect: "none",
                },
                ".d-btn:active": { transform: "translateY(1px)" },
                ".d-btn:focus-visible": {
                    outline: "none",
                    boxShadow: `0 0 0 3px ${theme("ringColor.d")}`,
                },

                ".d-square-btn": {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontWeight: "600",
                    borderRadius: theme("borderRadius.d-lg"),
                    margin: "4px",
                    transition:
                        "background-color 120ms ease, transform 120ms ease, opacity 120ms ease, filter 120ms ease",
                    userSelect: "none",
                },
                ".d-square-btn:active": { transform: "translateY(1px)" },
                ".d-square-btn:focus-visible": {
                    outline: "none",
                    boxShadow: `0 0 0 3px ${theme("ringColor.d")}`,
                },

                ".d-btn-surface": {
                    backgroundColor: theme("colors.d.surface"),
                    color: "white",
                },
                ".d-btn-surface:hover": { backgroundColor: theme("colors.d.brand2") },

                ".d-btn-primary": {
                    backgroundColor: theme("colors.d.brand"),
                    color: "white",
                },
                ".d-btn-primary:hover": { backgroundColor: theme("colors.d.brand2") },

                ".d-btn-secondary": {
                    backgroundColor: theme("colors.d.surface2"),
                    color: theme("colors.d.text"),
                },
                ".d-btn-secondary:hover": { filter: "brightness(1.08)" },

                ".d-btn-danger": {
                    backgroundColor: theme("colors.d.danger"),
                    color: "white",
                },
                ".d-btn-danger:hover": { filter: "brightness(0.95)" },

                /* Inputs */
                ".d-input": {
                    width: "100%",
                    backgroundColor: theme("colors.d.base"),
                    color: theme("colors.d.text"),
                    border: `1px solid ${theme("colors.d.border")}`,
                    borderRadius: theme("borderRadius.d-sm"),
                    padding: "0.6rem 0.75rem",
                    outline: "none",
                },
                ".d-input::placeholder": { color: theme("colors.d.subtle") },
                ".d-input:focus-visible": {
                    boxShadow: `0 0 0 3px ${theme("ringColor.d")}`,
                    borderColor: theme("colors.d.brand"),
                },

                /* Channel-like list item */
                ".d-item": {
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.45rem 0.6rem",
                    borderRadius: theme("borderRadius.d-sm"),
                    color: theme("colors.d.muted"),
                    cursor: "pointer",
                    transition: "background-color 120ms ease, color 120ms ease",
                },
                ".d-item:hover": {
                    backgroundColor: theme("colors.d.surface2"),
                    color: theme("colors.d.text"),
                },
                ".d-item[aria-selected='true']": {
                    backgroundColor: theme("colors.d.surface2"),
                    color: theme("colors.d.text"),
                    boxShadow: "inset 2px 0 0 " + theme("colors.d.brand"),
                },

                /* Pills / badges / mentions */
                ".d-pill": {
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    borderRadius: theme("borderRadius.pill"),
                    padding: "0.15rem 0.5rem",
                    backgroundColor: theme("colors.d.surface2"),
                    color: theme("colors.d.text"),
                    fontSize: "0.75rem",
                    fontWeight: "600",
                },
                ".d-badge": {
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "1.25rem",
                    height: "1.25rem",
                    padding: "0 0.35rem",
                    borderRadius: theme("borderRadius.pill"),
                    backgroundColor: theme("colors.d.danger"),
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    lineHeight: "1",
                },
                ".d-mention": {
                    display: "inline-flex",
                    alignItems: "center",
                    borderRadius: theme("borderRadius.d-sm"),
                    padding: "0.05rem 0.35rem",
                    backgroundColor: "rgba(88,101,242,0.18)",
                    color: theme("colors.d.text"),
                },

                /* Scrollbars */
                ".d-scroll": {
                    scrollbarColor: `${theme("colors.d.border")} transparent`,
                },
                ".d-scroll::-webkit-scrollbar": { width: "10px", height: "10px" },
                ".d-scroll::-webkit-scrollbar-thumb": {
                    background: theme("colors.d.border"),
                    borderRadius: "999px",
                    border: "2px solid transparent",
                    backgroundClip: "content-box",
                },
                ".d-scroll::-webkit-scrollbar-track": { background: "transparent" },
            });
        }),
    ]
} satisfies Config;

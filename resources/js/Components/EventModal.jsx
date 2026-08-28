import React, { useEffect } from "react";
import { Link } from "@inertiajs/react";

const DS = {
    display: "'Cormorant Garamond', Georgia, serif",
    body: "'EB Garamond', Georgia, serif",
};

function getCatStyle(category) {
    const lower = (category || "").toLowerCase();
    if (lower.includes("theatre") || lower.includes("th\u00e9\u00e2tre"))
        return { bg: "#C52034", light: "rgba(197,32,52,0.15)" };
    if (lower.includes("concert"))
        return { bg: "#97D2D4", light: "rgba(151,210,212,0.15)" };
    if (lower.includes("exposition"))
        return { bg: "#E8A317", light: "rgba(232,163,23,0.15)" };
    return { bg: "#707070", light: "rgba(112,112,112,0.15)" };
}

export default function EventModal({ event, onClose }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    if (!event) return null;

    const cat = getCatStyle(event.category);

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
            style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", animation: "ev-fadein 180ms ease" }}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <style>{`
                @keyframes ev-fadein  { from{opacity:0} to{opacity:1} }
                @keyframes ev-slideup { from{opacity:0;transform:translateY(28px) scale(0.96)} to{opacity:1;transform:none} }
            `}</style>

            <div
                className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
                style={{ backgroundColor: "#0D1117", animation: "ev-slideup 240ms cubic-bezier(0.34,1.4,0.64,1)" }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full text-white transition-colors"
                    style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.12)" }}
                    aria-label="Fermer"
                >
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>

                {/* Modal Header */}
                <div className="px-6 pt-6 pb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest"
                        style={{ fontFamily: DS.body, backgroundColor: cat.light, color: cat.bg, border: `1px solid ${cat.bg}40` }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: cat.bg, display: "inline-block" }} />
                        {event.category}
                    </span>
                </div>

                {/* Scrollable body */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                    <h2 className="text-white leading-tight" style={{ fontFamily: DS.display, fontSize: "clamp(24px,5vw,36px)", fontWeight: 300 }}>
                        {event.title}
                    </h2>

                    {/* Metadata */}
                    <div className="flex flex-col gap-3" style={{ fontFamily: DS.body }}>
                        <MetaRow icon={<CalIcon />} text={event.fullDate} />
                        {event.time     && <MetaRow icon={<ClockIcon />}  text={event.time} />}
                        {event.location && <MetaRow icon={<PinIcon />}    text={event.location} />}
                    </div>

                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />

                    {/* Description */}
                    {event.description ? (
                        <div className="text-slate-300 leading-relaxed space-y-3" style={{ fontFamily: DS.body, fontSize: "17px" }}>
                            {event.description.split("\n").map((p, i) => p.trim() ? <p key={i}>{p}</p> : null)}
                        </div>
                    ) : (
                        <p className="text-slate-500 italic" style={{ fontFamily: DS.body }}>
                            Aucune description disponible pour cet événement.
                        </p>
                    )}
                </div>

                {/* Footer */}
                <div className="flex-shrink-0 flex items-center justify-between gap-4 px-6 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", backgroundColor: "#0D1117" }}>
                    <button onClick={onClose} className="text-slate-400 hover:text-white text-sm transition-colors" style={{ fontFamily: DS.body }}>
                        ← Retour au calendrier
                    </button>
                    <Link
                        href={route("agenda.show", event.id)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                        style={{ fontFamily: DS.body, backgroundColor: "#97D2D4", color: "#0D1117" }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#7BBDBE"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = "#97D2D4"}
                    >
                        Voir la page complète
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

/* ── Helper sub-components ───────────────────────────── */
function MetaRow({ icon, text }) {
    return (
        <div className="flex items-center gap-3 text-base" style={{ color: "#CBD5E1" }}>
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-[#97D2D4]"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {icon}
            </span>
            {text}
        </div>
    );
}

function CalIcon() {
    return (
        <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.5"/>
            <line x1="16" y1="2" x2="16" y2="6" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="8"  y1="2" x2="8"  y2="6" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="3"  y1="10" x2="21" y2="10" strokeWidth="1.5"/>
        </svg>
    );
}
function ClockIcon() {
    return (
        <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" strokeWidth="1.5"/>
            <polyline points="12 7 12 12 15 15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}
function PinIcon() {
    return (
        <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21s-7-6.75-7-12a7 7 0 1 1 14 0c0 5.25-7 12-7 12z"/>
            <circle cx="12" cy="9" r="2.5" strokeWidth="1.5"/>
        </svg>
    );
}

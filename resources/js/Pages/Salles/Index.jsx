import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import useTranslation from "@/hooks/useTranslation";

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

export default function SallesIndex({ salles = [] }) {
    const { t } = useTranslation();
    const [activeGallery, setActiveGallery] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const getImage = (salle) => {
        if (salle.image && (salle.image.startsWith("http") || salle.image.startsWith("/storage"))) {
            return salle.image;
        }
        if (salle.images_salle && Array.isArray(salle.images_salle) && salle.images_salle.length > 0) {
            let firstImg = salle.images_salle[0];
            return firstImg.startsWith("http") || firstImg.startsWith("/storage") ? firstImg : "/storage/" + firstImg;
        }
        return null;
    };

    return (
        <PublicLayout>
            <Head title={`${t("Nos Salles")} - ${t("Centre Culturel")} Lixus`} />
            <style>{`
                .salles-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
                .salle-card-pad { padding: 16px; }
                .salle-card-img { height: 220px; }
                @media (min-width: 600px) {
                    .salles-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (min-width: 1024px) {
                    .salles-grid { grid-template-columns: repeat(3, 1fr); }
                    .salle-card-pad { padding: 24px; }
                    .salle-card-img { height: 240px; }
                }
            `}</style>

            {/* Hero */}
            <section style={{ position: "relative", backgroundColor: "#000", overflow: "hidden", padding: "60px 0" }}>
                <div className="container-lad" style={{ position: "relative", zIndex: 1 }}>
                    <p style={{ fontFamily: DS.body, fontSize: "12px", fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase", color: "#97D2D4", marginBottom: "16px" }}>
                        {t("Centre Culturel")} Lixus
                    </p>
                    <h1 style={{ fontFamily: DS.display, fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 300, color: "#FFFFFF", lineHeight: 1.2, marginBottom: "20px" }}>
                        {t("Nos Espaces & Salles")}
                    </h1>
                    <p style={{ fontFamily: DS.body, fontSize: "18px", fontWeight: 300, color: "rgba(255,255,255,0.7)", maxWidth: "520px", lineHeight: "1.6", marginBottom: "32px" }}>
                        {t("Des espaces modulables et equipes pour donner vie a vos evenements culturels, artistiques et associatifs.")}
                    </p>
                    <Link href={route("reservations.create")} className="btn-lad-cta" style={{ textDecoration: "none" }}>
                        {t("Reserver une salle")}
                    </Link>
                </div>
            </section>

            {/* Salles Grid */}
            <section className="bg-white" style={{ padding: "60px 0" }}>
                <div className="container-lad">
                    {salles.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "60px 0", color: "#9D9D9D" }}>
                            <p style={{ fontFamily: DS.display, fontSize: "24px", fontWeight: 300 }}>{t("Aucune salle disponible pour le moment.")}</p>
                        </div>
                    ) : (
                        <div className="salles-grid">
                            {salles.map((salle) => {
                                const img = getImage(salle);
                                const imgCount = (salle.images_salle && Array.isArray(salle.images_salle) ? salle.images_salle.length : 0) + (salle.image ? 1 : 0);
                                return (
                                    <article key={salle.id} style={{ backgroundColor: "#FFFFFF", display: "flex", flexDirection: "column", border: "1px solid #EDEDED", overflow: "hidden", cursor: "pointer" }}
                                        onClick={() => window.location.href = route("salles.show", salle.id)}
                                        onMouseEnter={e => e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.10)"}
                                        onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>

                                        {/* Image */}
                                        <div className="salle-card-img" style={{ overflow: "hidden", backgroundColor: "#EDEDED", cursor: "pointer", position: "relative" }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                let images = [];
                                                if (img) images.push(img);
                                                if (salle.images_salle && Array.isArray(salle.images_salle)) {
                                                    salle.images_salle.forEach(i => {
                                                        const url = i.startsWith("http") || i.startsWith("/storage") ? i : "/storage/" + i;
                                                        if (!images.includes(url)) images.push(url);
                                                    });
                                                }
                                                if (images.length > 0) {
                                                    setActiveGallery({ salle, images });
                                                    setCurrentImageIndex(0);
                                                }
                                            }}>
                                            {img ? (
                                                <img src={img} alt={salle.nom_salle}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 400ms ease" }}
                                                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                                                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
                                            ) : (
                                                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#9D9D9D", gap: "8px" }}>
                                                    <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    <span style={{ fontFamily: DS.body, fontSize: "13px" }}>{t("Aucune image")}</span>
                                                </div>
                                            )}
                                            {imgCount > 0 && (
                                                <div style={{ position: "absolute", bottom: "12px", right: "12px", backgroundColor: "rgba(0,0,0,0.7)", color: "#FFF", padding: "4px 10px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "5px", backdropFilter: "blur(4px)" }}>
                                                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    <span style={{ fontFamily: DS.body, fontSize: "12px", fontWeight: 400 }}>{imgCount}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Body */}
                                        <div className="salle-card-pad" style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                                            {/* Top grows */}
                                            <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                                                <div style={{ marginBottom: "12px" }}>
                                                    <h3 style={{ fontFamily: DS.display, fontSize: "22px", fontWeight: 300, color: "#000000", lineHeight: 1.2 }}>
                                                        {t(salle.nom_salle)}
                                                    </h3>
                                                </div>

                                                {salle.description && (
                                                    <p style={{ fontFamily: DS.body, fontSize: "14px", fontWeight: 300, color: "#707070", lineHeight: "21px", marginBottom: "16px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                                        {salle.description}
                                                    </p>
                                                )}

                                                {salle.equipements && Array.isArray(salle.equipements) && salle.equipements.filter(Boolean).length > 0 && (
                                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "auto", marginBottom: "4px" }}>
                                                        {salle.equipements.filter(Boolean).slice(0, 3).map((eq, j) => (
                                                            <span key={j} style={{ fontFamily: DS.body, fontSize: "11px", fontWeight: 300, color: "#707070", backgroundColor: "#F8F9FA", border: "1px solid #EDEDED", padding: "2px 8px", letterSpacing: "0.05em" }}>
                                                                {t(eq)}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Bottom */}
                                            <div>
                                                {salle.capacite > 0 && (
                                                    <div style={{ borderTop: "1px solid #EDEDED", paddingTop: "14px", marginTop: "16px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        <span style={{ fontFamily: DS.body, fontSize: "11px", color: "#9D9D9D", textTransform: "uppercase", letterSpacing: "0.1em" }}>{t("Capacite")}</span>
                                                        <span style={{ fontFamily: DS.body, fontSize: "13px", color: "#000000", fontWeight: 400 }}>{salle.capacite} {t("personnes")}</span>
                                                    </div>
                                                )}
                                                <button onClick={(e) => { e.stopPropagation(); window.location.href = route("reservations.create"); }} className="btn-lad-primary" style={{ textAlign: "center", color: "#FFFFFF", display: "block", width: "100%", cursor: "pointer", border: "none" }}>
                                                    {t("Reserver cette salle")}
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Band */}
            <section style={{ backgroundColor: "#000000", padding: "60px 0", textAlign: "center" }}>
                <div className="container-lad">
                    <div style={{ width: "32px", height: "1px", backgroundColor: "#97D2D4", margin: "0 auto 24px" }} />
                    <h2 style={{ fontFamily: DS.display, fontSize: "36px", fontWeight: 300, color: "#FFFFFF", marginBottom: "16px" }}>
                        {t("Votre evenement merite le meilleur ecrin")}
                    </h2>
                    <p style={{ fontFamily: DS.body, fontSize: "16px", fontWeight: 300, color: "#9D9D9D", maxWidth: "480px", margin: "0 auto 32px" }}>
                        {t("Remplissez une demande de reservation en quelques minutes. Notre equipe vous contactera sous 48h.")}
                    </p>
                    <Link href={route("reservations.create")} className="btn-lad-cta" style={{ textDecoration: "none" }}>
                        {t("Faire une demande de reservation")}
                    </Link>
                </div>
            </section>

            {/* Lightbox */}
            {activeGallery && (
                <div style={{ position: "fixed", inset: 0, zIndex: 9999, backgroundColor: "rgba(0,0,0,0.95)", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px", color: "#FFF" }}>
                        <h3 style={{ fontFamily: DS.display, fontSize: "24px", fontWeight: 300, margin: 0 }}>
                            {t(activeGallery.salle.nom_salle)}
                        </h3>
                        <button onClick={() => setActiveGallery(null)} style={{ color: "#FFF", background: "none", border: "none", cursor: "pointer", padding: "8px" }}>
                            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div style={{ flexGrow: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
                        <button onClick={() => setCurrentImageIndex(p => p === 0 ? activeGallery.images.length - 1 : p - 1)}
                            style={{ position: "absolute", left: "24px", zIndex: 10, color: "#FFF", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <img src={activeGallery.images[currentImageIndex]} alt="" style={{ maxHeight: "75vh", maxWidth: "85vw", objectFit: "contain", boxShadow: "0 10px 40px rgba(0,0,0,0.5)" }} />
                        <button onClick={() => setCurrentImageIndex(p => p === activeGallery.images.length - 1 ? 0 : p + 1)}
                            style={{ position: "absolute", right: "24px", zIndex: 10, color: "#FFF", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                    <div style={{ padding: "24px", display: "flex", gap: "12px", justifyContent: "center", overflowX: "auto", backgroundColor: "#000" }}>
                        {activeGallery.images.map((img, idx) => (
                            <div key={idx} onClick={() => setCurrentImageIndex(idx)}
                                style={{ width: "80px", height: "60px", cursor: "pointer", flexShrink: 0, border: currentImageIndex === idx ? "2px solid #97D2D4" : "2px solid transparent", opacity: currentImageIndex === idx ? 1 : 0.4, transition: "all 200ms ease" }}>
                                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}

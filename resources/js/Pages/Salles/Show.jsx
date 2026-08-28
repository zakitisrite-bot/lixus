import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import useTranslation from '@/hooks/useTranslation';

const DS = {
    display: "'Cormorant Garamond', Georgia, serif",
    body: "'EB Garamond', Georgia, serif",
};

export default function SallesShow({ salle }) {
    const { t } = useTranslation();
    const [activeImg, setActiveImg] = useState(null);

    const normalise = (src) =>
        src && (src.startsWith('http') || src.startsWith('/storage')) ? src : '/storage/' + src;

    const heroSrc = salle.image
        ? normalise(salle.image)
        : salle.images_salle?.length
        ? normalise(salle.images_salle[0])
        : '/images/centre-culturel-lixus.webp';

    const gallery = [];
    if (salle.image) gallery.push(normalise(salle.image));
    (salle.images_salle || []).forEach((img) => {
        const u = normalise(img);
        if (!gallery.includes(u)) gallery.push(u);
    });

    const equipment = (salle.equipements || []).filter(Boolean);
    const prev = () => setActiveImg((i) => (i === 0 ? gallery.length - 1 : i - 1));
    const next = () => setActiveImg((i) => (i === gallery.length - 1 ? 0 : i + 1));

    return (
        <PublicLayout>
            <Head title={`${t(salle.nom_salle)} — Centre Culturel Lixus`} />

            <style>{`
                .show-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 40px;
                    max-width: 1160px;
                    margin: 0 auto;
                    padding: 60px 24px 80px;
                }
                @media (min-width: 1024px) {
                    .show-grid { grid-template-columns: 1fr 360px; gap: 56px; }
                }
                .show-sidebar {
                    position: relative;
                }
                @media (min-width: 1024px) {
                    .show-sidebar { position: sticky; top: 100px; align-self: start; }
                }
                .gal-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 6px;
                    margin-top: 20px;
                }
                @media (min-width: 640px) { .gal-grid { grid-template-columns: repeat(3, 1fr); } }
                .gal-item {
                    position: relative; overflow: hidden;
                    cursor: zoom-in; background: #f0f0f0;
                }
                .gal-item::after { content: ''; display: block; padding-bottom: 68%; }
                .gal-item img {
                    position: absolute; inset: 0;
                    width: 100%; height: 100%; object-fit: cover;
                    transition: transform 450ms ease;
                }
                .gal-item:hover img { transform: scale(1.07); }

                .lb-overlay {
                    position: fixed; inset: 0; z-index: 99999;
                    background: rgba(0,0,0,0.96);
                    display: flex; flex-direction: column;
                }
                .lb-btn {
                    position: absolute; top: 50%; transform: translateY(-50%);
                    background: rgba(255,255,255,0.08); border: none; border-radius: 50%;
                    width: 50px; height: 50px;
                    display: flex; align-items: center; justify-content: center;
                    color: #fff; cursor: pointer; transition: background 200ms;
                }
                .lb-btn:hover { background: rgba(255,255,255,0.18); }
            `}</style>

            {/* ══ HERO ═══════════════════════════════════════════════════ */}
            <section style={{
                position: 'relative',
                height: '52vh',
                minHeight: '340px',
                backgroundColor: '#000',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end',
                paddingBottom: '48px',
            }}>
                <img src={heroSrc} alt={salle.nom_salle}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.05) 60%)' }} />
                <div className="container-lad" style={{ position: 'relative', zIndex: 1 }}>
                    <Link href={route('salles.index')}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: DS.body, fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#97D2D4', textDecoration: 'none', marginBottom: '12px', transition: 'color 200ms' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={e => e.currentTarget.style.color = '#97D2D4'}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t('Nos Salles')}
                    </Link>
                    <h1 style={{ fontFamily: DS.display, fontSize: 'clamp(38px, 5vw, 68px)', fontWeight: 300, color: '#fff', lineHeight: 1.05, margin: 0 }}>
                        {t(salle.nom_salle)}
                    </h1>
                </div>
            </section>

            {/* ══ CONTENT GRID ═══════════════════════════════════════════ */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* ── LEFT ─────────────────────────────── */}
                    <div className="lg:col-span-8">
                        {/* Description */}
                        <section className="mb-12">
                            <h2 style={{ fontFamily: DS.display }} className="text-3xl font-light text-gray-900 mb-6 pb-4 border-b border-gray-200">
                                {t('À propos de cet espace')}
                            </h2>
                            {salle.description ? (
                                <div style={{ fontFamily: DS.body }} className="text-gray-600 text-lg leading-relaxed font-light">
                                    {salle.description.split('\n').map((para, i) =>
                                        para.trim() ? <p key={i} className="mb-4">{para}</p> : null
                                    )}
                                </div>
                            ) : (
                                <p style={{ fontFamily: DS.body }} className="text-gray-400 italic text-base">
                                    {t('Aucune description disponible.')}
                                </p>
                            )}
                        </section>

                        {/* Gallery */}
                        {gallery.length > 0 && (
                            <section>
                                <h2 style={{ fontFamily: DS.display }} className="text-3xl font-light text-gray-900 mb-6 pb-4 border-b border-gray-200">
                                    {t('Galerie photos')}
                                    <span style={{ fontFamily: DS.body }} className="text-sm font-light text-gray-400 ml-3">
                                        {gallery.length} {t('photo(s)')}
                                    </span>
                                </h2>
                                <div className="grid gap-4 grid-cols-2">
                                    {gallery.map((img, idx) => (
                                        <div key={idx} 
                                             className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-zoom-in group bg-gray-100" 
                                             onClick={() => setActiveImg(idx)}>
                                            <img src={img} alt={`Photo ${idx + 1}`} loading="lazy" 
                                                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* ── RIGHT: Sticky Info Card ───────────── */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 bg-slate-900 rounded-3xl p-8 shadow-2xl">
                            <h3 style={{ fontFamily: DS.display }} className="text-2xl font-light text-white mb-6 border-b border-slate-800 pb-4">
                                {t('Fiche technique')}
                            </h3>

                            {/* Capacité */}
                            {salle.capacite > 0 && (
                                <div className="mb-8 pb-8 border-b border-slate-800">
                                    <p style={{ fontFamily: DS.body }} className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-3">
                                        {t('Capacité')}
                                    </p>
                                    <div className="flex items-baseline gap-2">
                                        <span style={{ fontFamily: DS.display }} className="text-5xl font-light text-white leading-none">
                                            {salle.capacite}
                                        </span>
                                        <span style={{ fontFamily: DS.body }} className="text-lg text-[#97D2D4]">
                                            {t('personnes')}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Équipements */}
                            {equipment.length > 0 && (
                                <div className="mb-8">
                                    <p style={{ fontFamily: DS.body }} className="text-xs uppercase tracking-[0.15em] text-slate-400 mb-4">
                                        {t('Équipements')}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {equipment.map((eq, i) => (
                                            <span key={i} style={{ fontFamily: DS.body }} className="px-4 py-1.5 bg-white/10 border border-white/5 text-gray-200 text-sm rounded-full">
                                                {t(eq)}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Reserve Button */}
                            <Link href={route('reservations.create')}
                                style={{ fontFamily: DS.display }}
                                className="block w-full text-center bg-[#97D2D4] text-slate-900 py-4 rounded-xl text-lg font-medium transition-colors duration-250 hover:bg-[#7BBDBE]">
                                {t('Réserver cette salle')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ LIGHTBOX ════════════════════════════════════════════════ */}
            {activeImg !== null && gallery.length > 0 && (
                <div className="lb-overlay">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 28px', flexShrink: 0 }}>
                        <span style={{ fontFamily: DS.display, fontSize: '20px', fontWeight: 300, color: '#fff' }}>
                            {t(salle.nom_salle)} &nbsp;&mdash;&nbsp; {activeImg + 1} / {gallery.length}
                        </span>
                        <button onClick={() => setActiveImg(null)}
                            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '8px', lineHeight: 0 }}>
                            <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '0 80px', overflow: 'hidden' }}>
                        <button className="lb-btn" style={{ left: '20px' }} onClick={prev}>
                            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <img src={gallery[activeImg]} alt="" style={{ maxHeight: '76vh', maxWidth: '100%', objectFit: 'contain' }} />
                        <button className="lb-btn" style={{ right: '20px' }} onClick={next}>
                            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>

                    <div style={{ padding: '12px 24px', display: 'flex', gap: '8px', justifyContent: 'center', overflowX: 'auto', flexShrink: 0 }}>
                        {gallery.map((img, idx) => (
                            <div key={idx} onClick={() => setActiveImg(idx)}
                                style={{ width: '64px', height: '48px', flexShrink: 0, cursor: 'pointer', border: activeImg === idx ? '2px solid #97D2D4' : '2px solid transparent', opacity: activeImg === idx ? 1 : 0.35, transition: 'all 200ms' }}>
                                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}

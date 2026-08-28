import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import useTranslation from '@/hooks/useTranslation';
import { formatLocalizedDate } from '@/utils/dateFormatter';

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

export default function Actualites({ actualites = [] }) {
    const { t, locale } = useTranslation();
    const featured = actualites.length > 0 ? actualites[0] : null;
    const articles = actualites.length > 1 ? actualites.slice(1) : [];

    const getImage = (a) => {
        if (!a || !a.images || a.images.length === 0) return '';
        const img = a.images[0];
        return img.startsWith('http') || img.startsWith('/storage') ? img : '/storage/' + img;
    };

    const isVideo = (url) => {
        return typeof url === 'string' && url.match(/\.(mp4|webm|ogg)$/i);
    };

    return (
        <PublicLayout>
            <Head title={`${t('Actualités & Annonces')} - ${t('Centre Culturel')} Lixus`} />

            <style>{`
                @keyframes moroccanPatternMove {
                    0% { background-position: 0px 0px; }
                    100% { background-position: 160px 160px; }
                }
                @keyframes pulseGlow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.06); }
                }
                .anim-moroccan-pattern {
                    animation: moroccanPatternMove 40s linear infinite;
                }
                .anim-pulse-glow {
                    animation: pulseGlow 8s ease-in-out infinite;
                }
            `}</style>

            {/* Page Header */}
            <section className="relative overflow-hidden cursor-default" style={{ backgroundColor: '#050B14', padding: '36px 0 32px 0' }}>
                {/* Moroccan Geometric Zellige Motif Background */}
                <div 
                    className="absolute inset-0 z-0 anim-moroccan-pattern opacity-50"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0 L49 14 L65 7 L65 24 L80 31 L71 40 L80 49 L65 56 L65 73 L49 66 L40 80 L31 66 L15 73 L15 56 L0 49 L9 40 L0 31 L15 24 L15 7 L31 14 Z' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/%3E%3Ccircle cx='40' cy='40' r='16' fill='none' stroke='rgba(151,210,212,0.15)' stroke-width='1'/%3E%3Cpath d='M40 8 L72 40 L40 72 L8 40 Z' fill='none' stroke='rgba(151,210,212,0.1)' stroke-width='0.75'/%3E%3Crect x='24' y='24' width='32' height='32' fill='none' stroke='rgba(197,32,52,0.1)' stroke-width='0.75' transform='rotate(45 40 40)'/%3E%3C/svg%3E")`,
                        backgroundSize: '80px 80px'
                    }}
                />

                {/* Ambient Soft Glow */}
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[400px] h-[180px] bg-[#2b4c7e] rounded-full blur-[100px] anim-pulse-glow" />
                </div>

                <div className="container-lad relative z-10 text-center">
                    <p style={{ fontFamily: DS.body, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#97D2D4', marginBottom: '8px' }}>{t('LE MAG')}</p>
                    <h1 style={{ fontFamily: DS.display, fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300, color: '#FFFFFF', marginBottom: '10px', lineHeight: 1.1 }}>
                        {t('Actualités & Annonces')}
                    </h1>
                    <p style={{ fontFamily: DS.body, fontSize: 'clamp(13px, 2vw, 15px)', fontWeight: 300, color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.4 }}>
                        {t('Restez informé des dernières nouvelles, articles et annonces de notre centre culturel.')}
                    </p>
                </div>
            </section>

            {/* Featured Article */}
            {featured && (
                <section style={{ backgroundColor: '#FFFFFF', padding: '60px 0' }}>
                    <div className="container-lad">
                        <article style={{ border: '1px solid #EDEDED', overflow: 'hidden' }} className="grid grid-cols-1 md:grid-cols-2">
                            <div style={{ overflow: 'hidden', backgroundColor: '#000000', display: 'flex', alignItems: 'center', position: 'relative' }}>
                                <div style={{ position: 'absolute', inset: -20, backgroundImage: !isVideo(getImage(featured)) ? `url(${getImage(featured)})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(20px) brightness(0.5)' }}></div>
                                {isVideo(getImage(featured)) ? (
                                    <video src={getImage(featured)} autoPlay muted loop playsInline
                                        style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain', display: 'block', transition: 'transform 400ms ease', zIndex: 1 }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                                ) : (
                                    <img src={getImage(featured)} alt={featured.title}
                                        style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain', display: 'block', transition: 'transform 400ms ease', zIndex: 1 }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                                )}
                            </div>
                            <div style={{ backgroundColor: '#000000', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                                    <span style={{ backgroundColor: '#97D2D4', color: '#000000', padding: '4px 12px', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{featured.is_featured ? t('À LA UNE') : t('NOUVEAU')}</span>
                                    <span style={{ fontFamily: DS.body, fontSize: '12px', color: '#9D9D9D', letterSpacing: '0.1em' }}>{formatLocalizedDate(featured.date || featured.created_at, t, locale) || t(featured.category)}</span>
                                </div>
                                <h2 style={{ fontFamily: DS.display, fontSize: '30px', fontWeight: 300, color: '#FFFFFF', lineHeight: '1.3', marginBottom: '20px' }}>
                                    {t(featured.title)}
                                </h2>
                                <p style={{ fontFamily: DS.body, fontSize: '16px', fontWeight: 300, color: '#DDDDDD', lineHeight: '22.4px', marginBottom: '32px' }}>
                                    {t(featured.excerpt || featured.contenu)}
                                </p>
                                <Link href={route('actualites.show', featured.id)} style={{ display: 'inline-block', backgroundColor: '#FFFFFF', color: '#000000', padding: '12px 24px', fontFamily: DS.display, fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', width: 'fit-content' }}>
                                    {t("LIRE L'ARTICLE COMPLET")}
                                </Link>
                            </div>
                        </article>
                    </div>
                </section>
            )}

            {/* Articles Grid */}
            <section className="bg-white" style={{ padding: '0 0 60px' }}>
                <div className="container-lad">
                    {articles.length > 0 ? (
                        <div style={{ gap: '16px' }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {articles.map((article, i) => (
                                <article key={article.id ?? i} style={{ backgroundColor: '#FFFFFF', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #EDEDED' }}>
                                    <div style={{ height: '220px', overflow: 'hidden', position: 'relative', backgroundColor: '#000' }}>
                                        <div style={{ position: 'absolute', inset: -20, backgroundImage: !isVideo(getImage(article)) ? `url(${getImage(article)})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(15px) brightness(0.6)' }}></div>
                                        {isVideo(getImage(article)) ? (
                                            <video src={getImage(article)} autoPlay muted loop playsInline
                                                style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain', display: 'block', filter: 'grayscale(15%)', transition: 'transform 400ms ease', zIndex: 1 }}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                                        ) : (
                                            <img src={getImage(article)} alt={article.title}
                                                style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'contain', display: 'block', filter: 'grayscale(15%)', transition: 'transform 400ms ease', zIndex: 1 }}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                                        )}
                                    </div>
                                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                            <span style={{ fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D' }}>
                                                {t(article.category || 'Actualités')}
                                            </span>
                                            <span style={{ fontFamily: DS.body, fontSize: '12px', color: '#9D9D9D' }}>{formatLocalizedDate(article.date || article.created_at, t, locale)}</span>
                                        </div>
                                        <h3 style={{ fontFamily: DS.display, fontSize: '20px', fontWeight: 300, color: '#000000', lineHeight: '1.3', marginBottom: '12px', flexGrow: 1 }}>
                                            {t(article.title)}
                                        </h3>
                                        <p style={{ fontFamily: DS.body, fontSize: '14px', fontWeight: 300, color: '#707070', lineHeight: '21px', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {t(article.excerpt || article.contenu)}
                                        </p>
                                        <div style={{ borderTop: '1px solid #EDEDED', paddingTop: '16px' }}>
                                            <Link href={route('actualites.show', article.id)}
                                                style={{ fontFamily: DS.body, fontSize: '13px', fontWeight: 400, color: '#000000', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase' }}
                                                onMouseEnter={e => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.textDecoration = 'underline'; }}
                                                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.textDecoration = 'none'; }}>
                                                {t("Lire la suite")} →
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        !featured && (
                            <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: DS.body, color: '#707070', fontSize: '18px' }}>
                                {t("Aucune actualité disponible pour le moment.")}
                            </div>
                        )
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}

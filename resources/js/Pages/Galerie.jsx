import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import useTranslation from '@/hooks/useTranslation';
import { formatLocalizedDate } from '@/utils/dateFormatter';

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

const GalleryCard = ({ item, t, locale }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const mediaList = (item.media && item.media.length > 0) 
        ? item.media 
        : [{ type: 'photo', url: '/images/centre-culturel-lixus.webp' }];
    
    const hasMultiple = mediaList.length > 1;
    const currentMedia = mediaList[currentIndex] || mediaList[0];

    const nextMedia = (e) => {
        e.preventDefault(); e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % mediaList.length);
    };
    const prevMedia = (e) => {
        e.preventDefault(); e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
    };

    return (
        <Link 
            href={`/galerie/${item.id}`} 
            className="group relative flex flex-col bg-white rounded-lg overflow-hidden border border-[#EDEDED] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            style={{ textDecoration: 'none' }}
        >
            {/* Image / Video Frame */}
            <div className="relative h-[260px] w-full overflow-hidden bg-[#0A0F1A]">
                {currentMedia.type === 'video' ? (
                    <div className="relative w-full h-full">
                        <img 
                            src={currentMedia.url} 
                            alt={item.title || ''} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                <svg width="20" height="20" fill="#050B14" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                        </div>
                    </div>
                ) : (
                    <img 
                        src={currentMedia.url} 
                        alt={item.title || ''} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                    />
                )}

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                {/* Badge Media Count if multiple */}
                {hasMultiple && (
                    <div className="absolute top-3 right-3 z-10 pointer-events-none">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/90 text-black backdrop-blur-md shadow-sm">
                            {currentIndex + 1} / {mediaList.length}
                        </span>
                    </div>
                )}

                {/* Carousel Controls if multiple */}
                {hasMultiple && (
                    <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                        <button 
                            onClick={prevMedia} 
                            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-black shadow-md flex items-center justify-center transition-transform hover:scale-110"
                            aria-label="Previous"
                        >
                            ‹
                        </button>
                        <button 
                            onClick={nextMedia} 
                            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-black shadow-md flex items-center justify-center transition-transform hover:scale-110"
                            aria-label="Next"
                        >
                            ›
                        </button>
                    </div>
                )}
            </div>

            {/* Content Body */}
            <div className="p-5 flex flex-col flex-grow justify-between bg-white">
                <div>
                    <div className="flex items-center gap-2 mb-2 text-[#9D9D9D]" style={{ fontFamily: DS.body, fontSize: '13px' }}>
                        <svg className="w-3.5 h-3.5 text-[#97D2D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>{formatLocalizedDate(item.date, t, locale)}</span>
                    </div>
                    <h3 
                        className="text-[#050B14] group-hover:text-[#2b4c7e] transition-colors duration-200 line-clamp-2"
                        style={{ fontFamily: DS.display, fontSize: '20px', fontWeight: 500, lineHeight: 1.3 }}
                    >
                        {item.title}
                    </h3>
                    {item.description && (
                        <p 
                            className="text-[#707070] line-clamp-2 mt-2" 
                            style={{ fontFamily: DS.body, fontSize: '14px', lineHeight: 1.5 }}
                        >
                            {item.description}
                        </p>
                    )}
                </div>

                {/* Footer Link */}
                <div className="mt-4 pt-3 border-t border-[#F0F0F0] flex items-center justify-between">
                    <span 
                        className="text-[#2b4c7e] font-medium tracking-wider uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200"
                        style={{ fontFamily: DS.display, fontSize: '12px' }}
                    >
                        {hasMultiple ? t("Découvrir l'album") : t("Consulter l'œuvre")} 
                        <span className="text-base">→</span>
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default function Galerie({ posts = [], galeries = [] }) {
    const { t, locale } = useTranslation();

    const rawPosts = (posts && posts.length > 0) ? posts : (galeries.map(g => ({
        id: g.id, title: g.title, description: g.description || '', date: g.created_at,
        media: (g.media && g.media.length > 0) ? g.media.map(m => ({ type: m.type, url: m.url.startsWith('http') || m.url.startsWith('/storage/') ? m.url : '/storage/' + m.url })) : []
    })));

    return (
        <PublicLayout>
            <Head title={`${t('Notre Galerie')} - ${t('Centre Culturel')} Lixus`} />

            <style>{`
                @keyframes moroccanPatternMove {
                    0% { background-position: 0px 0px; }
                    100% { background-position: 160px 160px; }
                }
                @keyframes pulseGlow {
                    0%, 100% { opacity: 0.35; transform: scale(1); }
                    50% { opacity: 0.55; transform: scale(1.06); }
                }
                .anim-moroccan-pattern {
                    animation: moroccanPatternMove 40s linear infinite;
                }
                .anim-pulse-glow {
                    animation: pulseGlow 8s ease-in-out infinite;
                }
            `}</style>

            {/* Header Banner */}
            <section className="relative overflow-hidden cursor-default" style={{ backgroundColor: '#050B14', padding: '42px 0 38px 0' }}>
                {/* Moroccan Geometric Zellige Motif Background */}
                <div 
                    className="absolute inset-0 z-0 anim-moroccan-pattern opacity-45"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0 L49 14 L65 7 L65 24 L80 31 L71 40 L80 49 L65 56 L65 73 L49 66 L40 80 L31 66 L15 73 L15 56 L0 49 L9 40 L0 31 L15 24 L15 7 L31 14 Z' fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='1'/%3E%3Ccircle cx='40' cy='40' r='16' fill='none' stroke='rgba(151,210,212,0.15)' stroke-width='1'/%3E%3Cpath d='M40 8 L72 40 L40 72 L8 40 Z' fill='none' stroke='rgba(151,210,212,0.1)' stroke-width='0.75'/%3E%3Crect x='24' y='24' width='32' height='32' fill='none' stroke='rgba(197,32,52,0.1)' stroke-width='0.75' transform='rotate(45 40 40)'/%3E%3C/svg%3E")`,
                        backgroundSize: '80px 80px'
                    }}
                />

                {/* Soft Ambient Glow */}
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[450px] h-[200px] bg-[#2b4c7e] rounded-full blur-[110px] anim-pulse-glow" />
                </div>

                <div className="container-lad relative z-10 text-center">
                    <p style={{ fontFamily: DS.body, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#97D2D4', marginBottom: '8px' }}>{t('PORTFOLIO')}</p>
                    <h1 style={{ fontFamily: DS.display, fontSize: 'clamp(30px, 4.5vw, 46px)', fontWeight: 300, color: '#FFFFFF', marginBottom: '10px', lineHeight: 1.15 }}>
                        {t('Notre Galerie')}
                    </h1>
                    <p style={{ fontFamily: DS.body, fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 300, color: 'rgba(255,255,255,0.85)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.5 }}>
                        {t('Explorez les archives visuelles de nos événements. Une rétrospective élégante de la vie culturelle au sein du Centre.')}
                    </p>
                </div>
            </section>

            {/* Content Area */}
            <section className="bg-[#FAFBFD]" style={{ padding: '48px 0 80px 0' }}>
                <div className="container-lad">
                    {/* Grid */}
                    {rawPosts.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-xl border border-[#EDEDED] shadow-sm max-w-md mx-auto">
                            <div className="w-12 h-12 rounded-full bg-[#F0F4F8] text-[#2b4c7e] flex items-center justify-center mx-auto mb-3 text-xl">
                                🖼️
                            </div>
                            <p style={{ fontFamily: DS.display, fontSize: '22px', fontWeight: 300, color: '#050B14' }}>
                                {t('Aucune œuvre disponible pour le moment.')}
                            </p>
                            <p style={{ fontFamily: DS.body, fontSize: '14px', color: '#9D9D9D', marginTop: '6px' }}>
                                {t('Revenez bientôt pour découvrir nos dernières captures.')}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rawPosts.map(post => (
                                <GalleryCard key={post.id} item={post} t={t} locale={locale} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}

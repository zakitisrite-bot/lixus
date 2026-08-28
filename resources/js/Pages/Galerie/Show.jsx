import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import useTranslation from '@/hooks/useTranslation';
import { formatLocalizedDate } from '@/utils/dateFormatter';

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

export default function Show({ galerie }) {
    const { t, locale } = useTranslation();
    const media = (galerie.media && galerie.media.length > 0) ? galerie.media.map(m => ({
        type: m.type,
        url: m.url.startsWith('http') ? m.url : (m.url.startsWith('/storage/') ? m.url : '/storage/' + m.url)
    })) : [];

    const formattedDate = formatLocalizedDate(galerie.created_at, t, locale);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const handlePrevMedia = (e) => {
        e.stopPropagation();
        setLightboxIndex(prev => (prev - 1 + media.length) % media.length);
    };

    const handleNextMedia = (e) => {
        e.stopPropagation();
        setLightboxIndex(prev => (prev + 1) % media.length);
    };

    return (
        <PublicLayout>
            <Head title={`${galerie.title} - ${t('Galerie')} - ${t('Centre Culturel')} Lixus`} />

            {/* Lightbox Modal */}
            {lightboxIndex !== null && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
                     onClick={() => setLightboxIndex(null)}>
                    <button onClick={() => setLightboxIndex(null)} className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-50">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    {media.length > 1 && (
                        <button onClick={handlePrevMedia}
                            style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFFFFF', borderRadius: '9999px', zIndex: 50, cursor: 'pointer', transition: 'background-color 0.2s' }}>
                            <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                        </button>
                    )}
                    {media.length > 1 && (
                        <button onClick={handleNextMedia}
                            style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFFFFF', borderRadius: '9999px', zIndex: 50, cursor: 'pointer', transition: 'background-color 0.2s' }}>
                            <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
                        </button>
                    )}
                    <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '1200px', maxHeight: '90vh', display: 'flex', justifyContent: 'center' }}>
                        {media[lightboxIndex].type === 'video' ? (
                            <video src={media[lightboxIndex].url} controls controlsList="nodownload noplaybackrate" disablePictureInPicture onContextMenu={(e) => e.preventDefault()} autoPlay style={{ width: '100%', height: '90vh', objectFit: 'contain', outline: 'none' }} />
                        ) : (
                            <img src={media[lightboxIndex].url} alt={galerie.title} style={{ width: '100%', height: '90vh', objectFit: 'contain' }} />
                        )}
                    </div>
                </div>
            )}

            <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', padding: '60px 0' }}>
                <div className="container-lad">
                    
                    {/* Header */}
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
                        <div style={{ marginBottom: '32px' }}>
                            <Link href="/galerie" style={{ fontFamily: DS.body, fontSize: '12px', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9D9D9D', textDecoration: 'none' }}>
                                ← {t('Retour au portfolio')}
                            </Link>
                        </div>
                        <span style={{ display: 'inline-block', border: '1px solid #EDEDED', backgroundColor: '#FFFFFF', padding: '4px 12px', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '24px' }}>
                            {t(galerie.category || 'Galerie')}
                        </span>
                        <h1 style={{ fontFamily: DS.display, fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: '#000000', lineHeight: 1.2, marginBottom: '16px' }}>
                            {t(galerie.title)}
                        </h1>
                        <p style={{ fontFamily: DS.body, fontSize: '12px', color: '#9D9D9D', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>
                            {formattedDate}
                        </p>
                        {galerie.description && (
                            <p style={{ fontFamily: DS.body, fontSize: '18px', fontWeight: 300, color: '#3C3C3C', lineHeight: '1.6' }}>
                                {t(galerie.description)}
                            </p>
                        )}
                    </div>

                    {/* Masonry Grid */}
                    {media.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 0', border: '1px solid #EDEDED', backgroundColor: '#FFFFFF' }}>
                            <p style={{ fontFamily: DS.display, fontSize: '20px', fontWeight: 300, color: '#9D9D9D' }}>{t('Aucun média disponible pour cet album.')}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {media.map((m, idx) => (
                                <div key={idx} onClick={() => setLightboxIndex(idx)}
                                     className="group aspect-square relative bg-slate-100 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
                                     onMouseEnter={e => { 
                                         e.currentTarget.querySelector('.overlay').style.opacity = '1'; 
                                         const mediaEl = e.currentTarget.querySelector('.media-content');
                                         if(mediaEl) { mediaEl.style.filter = 'grayscale(0%)'; mediaEl.style.transform = 'scale(1.05)'; }
                                     }}
                                     onMouseLeave={e => { 
                                         e.currentTarget.querySelector('.overlay').style.opacity = '0'; 
                                         const mediaEl = e.currentTarget.querySelector('.media-content');
                                         if(mediaEl) { mediaEl.style.filter = 'grayscale(15%)'; mediaEl.style.transform = 'scale(1)'; }
                                     }}>
                                    
                                    {m.type === 'video' ? (
                                        <>
                                            <video src={m.url} className="media-content w-full h-full object-cover transition-all duration-500" style={{ filter: 'grayscale(15%)' }} />
                                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <div style={{ width: '56px', height: '56px', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                                                    <svg width="24" height="24" fill="#000" viewBox="0 0 24 24" style={{ marginLeft: '4px' }}><path d="M8 5v14l11-7z"/></svg>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <img src={m.url} alt="" className="media-content w-full h-full object-cover transition-all duration-500" style={{ filter: 'grayscale(15%)' }} />
                                    )}
                                    
                                    {/* Hover Overlay */}
                                    <div className="overlay absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                        <svg width="24" height="24" fill="none" stroke="#FFF" viewBox="0 0 24 24" className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}

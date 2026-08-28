import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import useTranslation from '@/hooks/useTranslation';
import { formatLocalizedDate } from '@/utils/dateFormatter';

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

export default function Show({ actualite }) {
    const { t, locale } = useTranslation();
    const getImgUrl = (img) => {
        if (!img) return null;
        if (img.startsWith('http') || img.startsWith('/storage')) return img;
        return '/storage/' + img;
    };
    const images = actualite.images || [];
    const imageUrl = images.length > 0 ? getImgUrl(images[0]) : null;
    const galleryImages = images;

    const isVideo = (url) => {
        return typeof url === 'string' && url.match(/\.(mp4|webm|ogg)$/i);
    };

    const [activeImageIndex, setActiveImageIndex] = useState(null);

    useEffect(() => {
        if (activeImageIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [activeImageIndex]);

    const handleNextImage = (e) => {
        e.stopPropagation();
        setActiveImageIndex(prev => (prev + 1) % galleryImages.length);
    };

    const handlePrevImage = (e) => {
        e.stopPropagation();
        setActiveImageIndex(prev => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    return (
        <>
            <style>{`
                .article-header { padding: 48px 16px 32px; }
                .article-content { padding: 32px 16px 48px; }
                .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
                .gallery-thumb { min-height: 120px; }
                .footer-article { flex-direction: column !important; align-items: flex-start !important; }
                @media (min-width: 640px) {
                    .article-header { padding: 60px 24px 40px; }
                    .article-content { padding: 40px 24px 60px; }
                    .gallery-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)) !important; }
                    .gallery-thumb { min-height: 180px; }
                    .footer-article { flex-direction: row !important; align-items: center !important; }
                }
            `}</style>

            <PublicLayout>
                <Head title={`${actualite.title} - ${t('Centre Culturel')} Lixus`} />

                {/* Header Article */}
                <section style={{ backgroundColor: '#000' }}>
                    <div className="container-lad article-header" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <Link href={route('actualites.index')} style={{ display: 'inline-block', fontFamily: DS.body, fontSize: '12px', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9D9D9D', textDecoration: 'none', marginBottom: '20px', transition: 'color 0.3s' }}
                            onMouseEnter={e => e.target.style.color = '#FFF'}
                            onMouseLeave={e => e.target.style.color = '#9D9D9D'}>
                            ← {t('Retour aux actualités')}
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                            {actualite.category && (
                                <span className="badge-lad badge-lad-teal">{t(actualite.category)}</span>
                            )}
                            {actualite.date && (
                                <span style={{ fontFamily: DS.body, fontSize: '13px', color: '#9D9D9D', letterSpacing: '0.1em' }}>{formatLocalizedDate(actualite.date || actualite.created_at, t, locale)}</span>
                            )}
                        </div>
                        <h1 style={{ fontFamily: DS.display, fontSize: 'clamp(28px, 6vw, 56px)', fontWeight: 300, color: '#FFFFFF', lineHeight: 1.2, margin: 0 }}>
                            {t(actualite.title)}
                        </h1>
                    </div>
                </section>

                {/* Content Article */}
                <section style={{ backgroundColor: '#FFFFFF' }}>
                    <div className="container-lad article-content" style={{ maxWidth: '800px', margin: '0 auto' }}>

                        {/* Featured Image */}
                        {imageUrl && (
                            <div style={{ marginBottom: '32px' }}>
                                {isVideo(imageUrl) ? (
                                    <video src={imageUrl} controls controlsList="nodownload noplaybackrate" disablePictureInPicture onContextMenu={(e) => e.preventDefault()} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.12)', outline: 'none' }}></video>
                                ) : (
                                    <img src={imageUrl} alt={actualite.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                                )}
                            </div>
                        )}

                        {/* Article Body */}
                        <div className="prose-lad" style={{ fontFamily: DS.body, fontSize: 'clamp(16px, 2.5vw, 18px)', fontWeight: 300, color: '#3C3C3C', lineHeight: '1.8' }}
                             dangerouslySetInnerHTML={{ __html: t(actualite.description || actualite.contenu) }} />

                        {/* Gallery Section */}
                        {galleryImages.length > 0 && (
                            <div style={{ marginTop: '48px' }}>
                                <h3 style={{ fontFamily: DS.display, fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: 300, color: '#000000', marginBottom: '16px' }}>{t("Galerie d'images")}</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {galleryImages.map((img, i) => (
                                        <div key={i}
                                             className="group aspect-square relative bg-slate-100 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                                             onClick={() => setActiveImageIndex(i)}
                                             onMouseEnter={e => { 
                                                 e.currentTarget.querySelector('.overlay').style.opacity = '1'; 
                                                 const mediaEl = e.currentTarget.querySelector('.media-content');
                                                 if(mediaEl) { mediaEl.style.transform = 'scale(1.05)'; mediaEl.style.filter = 'brightness(0.9)'; }
                                             }}
                                             onMouseLeave={e => { 
                                                 e.currentTarget.querySelector('.overlay').style.opacity = '0'; 
                                                 const mediaEl = e.currentTarget.querySelector('.media-content');
                                                 if(mediaEl) { mediaEl.style.transform = 'scale(1)'; mediaEl.style.filter = 'brightness(1)'; }
                                             }}
                                        >
                                            {isVideo(getImgUrl(img)) ? (
                                                <>
                                                    <video src={getImgUrl(img)} className="media-content w-full h-full object-cover transition-all duration-500" muted playsInline />
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md">
                                                            <svg width="20" height="20" fill="#000" viewBox="0 0 24 24" style={{ marginLeft: '2px' }}><path d="M8 5v14l11-7z"/></svg>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <img src={getImgUrl(img)} alt="" className="media-content w-full h-full object-cover transition-all duration-500" />
                                            )}
                                            <div className="overlay absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                                                <svg width="24" height="24" fill="none" stroke="#FFF" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Footer Article */}
                        <div className="footer-article" style={{ borderTop: '1px solid #EDEDED', marginTop: '48px', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                            <div>
                                <p style={{ fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '4px' }}>{t('Catégorie')}</p>
                                <p style={{ fontFamily: DS.body, fontSize: '14px', color: '#000000', margin: 0 }}>{t(actualite.category || 'Actualité')}</p>
                            </div>
                            <Link href={route('actualites.index')} className="btn-lad-secondary" style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}>
                                {t('Retour aux actualités')}
                            </Link>
                        </div>

                    </div>
                </section>
            </PublicLayout>

            {/* Fullscreen Lightbox Gallery */}
            {activeImageIndex !== null && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(10px)' }} onClick={() => setActiveImageIndex(null)}>

                    {/* Toolbar */}
                    <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#FFF', flexShrink: 0 }}>
                        <div style={{ fontFamily: DS.body, fontSize: '14px', letterSpacing: '0.1em' }}>
                            {activeImageIndex + 1} / {galleryImages.length}
                        </div>
                        <button onClick={() => setActiveImageIndex(null)} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', padding: '8px', touchAction: 'manipulation' }}>
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    {/* Main Image & Nav */}
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '8px 60px', minHeight: 0 }}>

                        {galleryImages.length > 1 && (
                            <button onClick={handlePrevImage}
                                style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFFFFF', borderRadius: '50%', zIndex: 50, cursor: 'pointer', transition: 'background-color 0.2s' }}>
                                <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg>
                            </button>
                        )}

                        {isVideo(getImgUrl(galleryImages[activeImageIndex])) ? (
                            <video src={getImgUrl(galleryImages[activeImageIndex])} controls controlsList="nodownload noplaybackrate" disablePictureInPicture onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }} autoPlay style={{ width: '100%', height: '90vh', objectFit: 'contain', outline: 'none' }} onClick={(e) => e.stopPropagation()}></video>
                        ) : (
                            <img src={getImgUrl(galleryImages[activeImageIndex])} alt="" style={{ width: '100%', height: '90vh', objectFit: 'contain' }} onClick={(e) => e.stopPropagation()} />
                        )}

                        {galleryImages.length > 1 && (
                            <button onClick={handleNextImage}
                                style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFFFFF', borderRadius: '50%', zIndex: 50, cursor: 'pointer', transition: 'background-color 0.2s' }}>
                                <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

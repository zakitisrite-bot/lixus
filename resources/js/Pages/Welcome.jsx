import React, { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import useTranslation from '@/hooks/useTranslation';

const DS = {
    display: "'Cormorant Garamond', Georgia, serif",
    body: "'EB Garamond', Georgia, serif",
};

export default function Welcome({ actualites = [], stats = {} }) {
    const { t } = useTranslation();
    const displayEvents = actualites;

    // SCROLL ANIMATIONS HOOK
    useEffect(() => {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <PublicLayout>
            <Head title={`${t('Accueil')} - ${t('Centre Culturel')} Lixus`} />

            <style>{`
                /* ── SCROLL REVEAL ANIMATIONS ── */
                .reveal-on-scroll { opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
                .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }
                .reveal-delay-100 { transition-delay: 100ms; }
                .reveal-delay-200 { transition-delay: 200ms; }
                .reveal-delay-300 { transition-delay: 300ms; }

                /* ── HERO LOAD ANIMATIONS ── */
                @keyframes heroBgZoom {
                    0% { transform: scale(1.12); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes heroFadeInUp {
                    0% { opacity: 0; transform: translateY(28px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                .anim-hero-bg { animation: heroBgZoom 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .anim-hero-tag { animation: heroFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }
                .anim-hero-title { animation: heroFadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }
                .anim-hero-desc { animation: heroFadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both; }
                .anim-hero-btns { animation: heroFadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both; }

                /* ── RESPONSIVE WELCOME ── */
                .welcome-director-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
                .welcome-director-img-frame { display: none; }
                .welcome-events-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
                .welcome-event-card { height: 320px !important; }
                .welcome-pourquoi-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
                .welcome-pourquoi-features { grid-template-columns: 1fr 1fr !important; gap: 20px !important; }
                .welcome-pourquoi-img { display: none; }
                .welcome-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
                .welcome-stat-pad { padding: 24px 16px !important; }
                .welcome-stat-val { font-size: 36px !important; }
                .welcome-section-pad { padding: 48px 0; }
                .welcome-section-title { font-size: 28px !important; }
                .welcome-h2 { font-size: 26px !important; }
                .welcome-map-grid { display: grid; grid-template-columns: 1fr; }
                .welcome-map-iframe { min-height: 280px !important; }
                .welcome-section-header { flex-direction: column; gap: 12px; align-items: flex-start !important; }
                @media (min-width: 640px) {
                    .welcome-events-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
                    .welcome-event-card { height: 400px !important; }
                    .welcome-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
                    .welcome-stat-pad { padding: 32px 20px !important; }
                    .welcome-stat-val { font-size: 48px !important; }
                }
                @media (min-width: 768px) {
                    .welcome-director-grid { grid-template-columns: 1fr 1fr; gap: 60px; }
                    .welcome-director-img-frame { display: block; }
                    .welcome-events-grid { grid-template-columns: repeat(4, 1fr); }
                    .welcome-event-card { height: 500px !important; }
                    .welcome-pourquoi-grid { grid-template-columns: 1fr 1fr; gap: 60px; }
                    .welcome-pourquoi-img { display: block; }
                    .welcome-stats-grid { grid-template-columns: repeat(4, 1fr); }
                    .welcome-stat-pad { padding: 40px 24px !important; }
                    .welcome-stat-val { font-size: clamp(40px, 5vw, 64px) !important; }
                    .welcome-section-pad { padding: 60px 0; }
                    .welcome-section-title { font-size: 36px !important; }
                    .welcome-h2 { font-size: 36px !important; }
                    .welcome-map-grid { grid-template-columns: 1fr 2fr; }
                    .welcome-map-iframe { min-height: 400px !important; }
                    .welcome-section-header { flex-direction: row; align-items: flex-end !important; }
                }
            `}</style>

            {/* ── HERO ─────────────────────────────────────────────────── */}
            <section className="relative w-full h-[calc(100vh-72px)] lg:h-[calc(100vh-104px)] flex items-center justify-center overflow-hidden bg-[#050B14]">
                <img
                    src="/images/centre-culturel-lixus.webp"
                    alt="Centre Culturel Lixus"
                    className="anim-hero-bg absolute inset-0 w-full h-full object-cover object-[center_40%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/70 to-[#050B14]/30" />

                <div className="relative z-10 w-full container-lad text-center pb-[40px]">
                    <p className="anim-hero-tag" style={{ fontFamily: DS.body, fontSize: '13px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#97D2D4', marginBottom: '24px' }}>
                        {t('Centre Culturel')} {t('Lixus · Larache')}
                    </p>
                    <h1 className="anim-hero-title" style={{ fontFamily: DS.display, fontSize: 'clamp(36px, 7vw, 80px)', fontWeight: 300, color: '#FFFFFF', lineHeight: 1.15, marginBottom: '24px', letterSpacing: 0 }}>
                        {t("Découvrez l'Excellence")}<br />
                        <em style={{ fontStyle: 'italic', color: '#97D2D4' }}>{t('Culturelle')}</em>
                    </h1>
                    <p className="anim-hero-desc" style={{ fontFamily: DS.body, fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: 300, color: 'rgba(255,255,255,0.9)', lineHeight: '1.6', maxWidth: '560px', margin: '0 auto 40px' }}>
                        {t('Des espaces uniques pour des moments inoubliables. Art, patrimoine et création au cœur de Larache.')}
                    </p>
                    <div className="anim-hero-btns" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/agenda" className="btn-lad-primary" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                            {t('Explorer le programme')}
                        </Link>
                        <Link href="/reservation" className="btn-lad-cta" style={{ textDecoration: 'none' }}>
                            {t('Réserver une salle')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── MOT DU DIRECTEUR ─────────────────────────────────── */}
            <section className="welcome-section-pad" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="container-lad">
                    <div className="welcome-director-grid" style={{ alignItems: 'center' }}>
                        <div className="welcome-director-img-frame reveal-on-scroll" style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '16px', left: '-16px', width: '100%', height: '100%', border: '1px solid #EDEDED', zIndex: 0 }} />
                            <img
                                src="/images/directeur.jpg"
                                alt="Directeur du Centre Culturel Lixus"
                                style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', position: 'relative', zIndex: 1, display: 'block' }}
                            />
                        </div>
                        <div className="reveal-on-scroll reveal-delay-200">
                            <p style={{ fontFamily: DS.display, fontSize: '12px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '16px' }}>
                                {t('Le mot du directeur')}
                            </p>
                            <h2 className="welcome-h2" style={{ fontFamily: DS.display, fontWeight: 300, color: '#000000', lineHeight: '1.3', marginBottom: '24px' }}>
                                {t('Bienvenue au cœur')}<br />{t('de la création')}
                            </h2>
                            <p style={{ fontFamily: DS.body, fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 300, color: '#3C3C3C', lineHeight: '1.7', marginBottom: '16px' }}>
                                {t("L'art et la culture sont le véritable reflet de notre humanité, des ponts invisibles qui relient nos histoires, nos rêves et nos aspirations communes.")}
                            </p>
                            <p style={{ fontFamily: DS.body, fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 300, color: '#3C3C3C', lineHeight: '1.7', marginBottom: '32px' }}>
                                {t("Notre mission est d'offrir un espace vibrant et inclusif, où les créateurs de tous horizons peuvent s'exprimer librement. Nous vous invitons à franchir nos portes pour vivre des moments uniques de partage et de découverte.")}
                            </p>
                            <div style={{ borderTop: '1px solid #EDEDED', paddingTop: '24px' }}>
                                <p style={{ fontFamily: DS.display, fontSize: '20px', fontWeight: 500, color: '#000000' }}>{t('Directeur Général')}</p>
                                <p style={{ fontFamily: DS.body, fontSize: '14px', fontWeight: 300, color: '#9D9D9D' }}>{t('Centre Culturel')} Lixus</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── ÉVÉNEMENTS À LA UNE ──────────────────────────────── */}
            <section className="welcome-section-pad" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="container-lad">
                    <div className="welcome-section-header reveal-on-scroll" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                        <div>
                            <p style={{ fontFamily: DS.display, fontSize: '12px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>{t('Programmation')}</p>
                            <h2 className="welcome-section-title" style={{ fontFamily: DS.display, fontWeight: 300, color: '#000000', margin: 0 }}>{t('Événements à la une')}</h2>
                        </div>
                        <Link href="/agenda" style={{ fontFamily: DS.body, fontSize: '14px', fontWeight: 400, color: '#000000', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', alignSelf: 'flex-end' }}
                              onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
                              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                            {t('Voir tout →')}
                        </Link>
                    </div>

                    {displayEvents.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 0', color: '#9D9D9D', gridColumn: '1 / -1' }}>
                            <p style={{ fontFamily: DS.display, fontSize: '20px', fontWeight: 300 }}>{t('Aucun événement à venir pour le moment.')}</p>
                        </div>
                    ) : (
                        <div className="welcome-events-grid reveal-on-scroll reveal-delay-200">
                            {displayEvents.slice(0, 4).map((event, i) => {
                                let rawImg = event.images && event.images.length > 0 ? event.images[0] : event.image;
                                const img = rawImg
                                    ? (rawImg.startsWith('http') || rawImg.startsWith('/storage') ? rawImg : '/storage/' + rawImg)
                                    : 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800%22%20height%3D%22600%22%20viewBox%3D%220%200%20800%20600%22%3E%3Crect%20fill%3D%22%23111111%22%20width%3D%22800%22%20height%3D%22600%22%2F%3E%3Ctext%20fill%3D%22%23333333%22%20font-family%3D%22sans-serif%22%20font-size%3D%2224%22%20dy%3D%2210.5%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3EAucune%20image%3C%2Ftext%3E%3C%2Fsvg%3E';
                                const href = route('actualites.show', event.id);
                                return (
                                    <Link key={event.id ?? i} href={href}
                                        className="welcome-event-card group"
                                        style={{ display: 'block', position: 'relative', backgroundColor: '#000', overflow: 'hidden', textDecoration: 'none', border: '1px solid #EDEDED' }}
                                        onMouseEnter={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'; }}
                                        onMouseLeave={e => { e.currentTarget.querySelector('img').style.transform = 'scale(1)'; }}>
                                        {img.match(/\.(mp4|webm|ogg)$/i) ? (
                                            <video src={img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 ease-in-out" muted loop playsInline></video>
                                        ) : (
                                            <img src={img} alt={event.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 ease-in-out" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent to-[35%]"></div>
                                        <div className="absolute bottom-0 left-0 w-full p-4 z-10 flex flex-col justify-end">
                                            <h3 style={{ fontFamily: DS.display, fontSize: 'clamp(16px, 2.5vw, 22px)', fontWeight: 300, color: '#FFFFFF', lineHeight: '1.3', margin: 0 }}>
                                                {event.title}
                                            </h3>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                                                <p style={{ fontFamily: DS.body, fontSize: '12px', fontWeight: 300, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                                                    {event.date === "Entrée Libre" ? t('Entrée Libre') : (event.date || (event.publication_date && new Date(event.publication_date).toLocaleDateString('fr-FR')))}
                                                </p>
                                                <span style={{ display: 'inline-block', backgroundColor: '#97D2D4', color: '#000000', fontFamily: DS.display, fontSize: '10px', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 7px', width: 'fit-content' }}>
                                                    {t(event.badge || event.category || 'Événement')}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* ── POURQUOI LIXUS ───────────────────────────────────── */}
            <section className="welcome-section-pad" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="container-lad">
                    <div className="welcome-pourquoi-grid" style={{ alignItems: 'center' }}>
                        <div className="reveal-on-scroll">
                            <p style={{ fontFamily: DS.display, fontSize: '12px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '16px' }}>{t('Nos atouts')}</p>
                            <h2 className="welcome-section-title" style={{ fontFamily: DS.display, fontWeight: 300, color: '#000000', marginBottom: '20px' }}>{t('Pourquoi choisir Lixus ?')}</h2>
                            <p style={{ fontFamily: DS.body, fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 300, color: '#3C3C3C', lineHeight: '1.7', marginBottom: '32px' }}>
                                {t('Le Centre Culturel Lixus offre des infrastructures de pointe et un accompagnement sur mesure pour donner vie à vos projets les plus ambitieux.')}
                            </p>
                            <div className="welcome-pourquoi-features" style={{ display: 'grid', gap: '24px' }}>
                                {[
                                    { title: "Salles modulables", desc: "Des espaces polyvalents pour conférences, spectacles et expositions." },
                                    { title: "Équipement professionnel", desc: "Sonorisation, éclairage et matériel audiovisuel de pointe." },
                                    { title: "Programmation riche", desc: "Des activités culturelles tout au long de l'année." },
                                    { title: "Réservation en ligne", desc: "Un processus simple, rapide et 100% transparent." },
                                ].map((item) => (
                                    <div key={item.title}>
                                        <div style={{ width: '24px', height: '2px', backgroundColor: '#97D2D4', marginBottom: '10px' }} />
                                        <h4 style={{ fontFamily: DS.display, fontSize: '15px', fontWeight: 500, color: '#000000', marginBottom: '6px' }}>{t(item.title)}</h4>
                                        <p style={{ fontFamily: DS.body, fontSize: '13px', fontWeight: 300, color: '#707070', lineHeight: '1.6', margin: 0 }}>{t(item.desc)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="welcome-pourquoi-img reveal-on-scroll reveal-delay-200" style={{ position: 'relative' }}>
                            <img src="/images/centre-culturel-lixus.webp"
                                alt="Salle Lixus" style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }} />
                            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
                                <h3 style={{ fontFamily: DS.display, fontSize: '28px', fontWeight: 300, color: '#FFFFFF', marginBottom: '24px' }}>{t('Votre prochain événement vous attend')}</h3>
                                <Link href="/reservation" className="btn-lad-cta" style={{ textDecoration: 'none' }}>
                                    {t("Privatiser l'espace →")}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CHIFFRES CLÉS ────────────────────────────────────── */}
            <section className="welcome-section-pad" style={{ backgroundColor: '#1A1A1A' }}>
                <div className="container-lad">
                    <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#97D2D4' }} />
                            <span style={{ fontFamily: DS.body, fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#97D2D4', fontWeight: 400 }}>{t('En chiffres')}</span>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#97D2D4' }} />
                        </div>
                        <h2 className="welcome-section-title" style={{ fontFamily: DS.display, fontWeight: 300, color: '#FFFFFF', margin: 0 }}>{t('Lixus en quelques chiffres')}</h2>
                    </div>
                    <div className="welcome-stats-grid reveal-on-scroll reveal-delay-200">
                        {[
                            { value: stats.eventsCount !== undefined ? stats.eventsCount : '25+', label: t('Événements Annuels') },
                            { value: stats.sallesCount !== undefined ? stats.sallesCount : '3', label: t('Salles Polyvalentes') },
                            { value: stats.usersCount !== undefined ? stats.usersCount : '15 000+', label: t('Utilisateurs Inscrits') },
                            { value: stats.reservationsCount !== undefined ? stats.reservationsCount : '50+', label: t('Réservations Validées') }
                        ].map((stat, i) => (
                            <div key={i} className="welcome-stat-pad" style={{ backgroundColor: '#1A1A1A', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #3C3C3C' }}>
                                <div className="welcome-stat-val" style={{ fontFamily: DS.display, fontWeight: 300, color: '#FFFFFF', lineHeight: 1 }}>{stat.value}</div>
                                <div style={{ width: '24px', height: '1px', backgroundColor: '#97D2D4', margin: '12px auto' }} />
                                <div style={{ fontFamily: DS.display, fontSize: 'clamp(13px, 2vw, 16px)', fontWeight: 400, color: '#FFFFFF' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── LOCALISATION ─────────────────────────────────────── */}
            <section className="welcome-section-pad" style={{ backgroundColor: '#F8F9FA' }}>
                <div className="container-lad">
                    <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <p style={{ fontFamily: DS.display, fontSize: '12px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>{t('Localisation')}</p>
                        <h2 className="welcome-section-title" style={{ fontFamily: DS.display, fontWeight: 300, color: '#000000', margin: 0 }}>{t('Nous Trouver')}</h2>
                    </div>
                    <div className="welcome-map-grid reveal-on-scroll reveal-delay-200" style={{ border: '1px solid #EDEDED', overflow: 'hidden' }}>
                        <div style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '32px 28px' }}>
                            <h3 style={{ fontFamily: DS.display, fontSize: '20px', fontWeight: 300, color: '#FFFFFF', marginBottom: '24px' }}>{t('Coordonnées')}</h3>
                            {[
                                { label: 'Adresse', value: t('Avenue Mohammed V, Centre Ville, Larache, Maroc') },
                                { label: 'Téléphone', value: '+212 5 39 50 00 00', href: 'tel:+212539500000', isPhone: true },
                                { label: 'Email', value: 'contact@lixusculture.ma', href: 'mailto:contact@lixusculture.ma' },
                            ].map(({ label, value, href, isPhone }) => (
                                <div key={label} style={{ marginBottom: '20px' }}>
                                    <p style={{ fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#97D2D4', marginBottom: '6px' }}>{t(label)}</p>
                                    {href ? (
                                        <a href={href} style={{ fontFamily: DS.body, fontSize: '14px', fontWeight: 300, color: '#DDDDDD', textDecoration: 'none', lineHeight: '1.6', display: 'inline-block' }}>
                                            {isPhone ? <span dir="ltr" style={{ display: 'inline-block', direction: 'ltr' }}>+212 5 39 50 00 00</span> : value}
                                        </a>
                                    ) : (
                                        <p style={{ fontFamily: DS.body, fontSize: '14px', fontWeight: 300, color: '#DDDDDD', lineHeight: '1.6', margin: 0 }}>{value}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="welcome-map-iframe" style={{ minHeight: '280px' }}>
                            <iframe
                                src="https://maps.google.com/maps?q=Centre+Culturel+Lixus,+Larache&t=h&z=15&output=embed"
                                width="100%" height="100%" style={{ border: 0, display: 'block', minHeight: '280px' }}
                                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

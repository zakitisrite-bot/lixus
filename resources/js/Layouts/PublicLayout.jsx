import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import useTranslation from '@/hooks/useTranslation';
import Logo from '@/Components/Logo';

export default function PublicLayout({ children }) {
    const page = usePage();
    const url  = page.url;
    const user = page.props?.auth?.user ?? null;
    
    const { t } = useTranslation();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled]             = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 48);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { href: '/',           label: t('Accueil') },
        { href: '/salles',     label: t('Nos Salles') },
        { href: '/agenda',     label: t('Agenda') },
        { href: '/actualites', label: t('Actualités') },
        { href: '/galerie',    label: t('Galerie') },
        { href: '/contact',    label: t('Contact') },
    ];

    const isActive = (href) => href === '/' ? url === '/' : url.startsWith(href);

    return (
        <div className="min-h-screen flex flex-col bg-lad-white text-lad-black overflow-x-hidden max-w-full"
             style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>

            {/* ── HEADER / NAVBAR ──────────────────────────────────────────── */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 bg-lad-white transition-shadow duration-300 ${
                    isScrolled ? 'shadow-lad-1' : ''
                }`}
                style={{ borderBottom: '1px solid #EDEDED' }}
            >
                {/* Top utility bar */}
                <div className="hidden lg:block" style={{ borderBottom: '1px solid #EDEDED' }}>
                    <div className="container-lad flex items-center justify-between py-2">
                        <p style={{ fontSize: '12px', fontFamily: "'Cormorant Garamond', Georgia, serif", color: '#707070', fontWeight: 400 }}>
                            {t('Centre Culturel')} — {t('Lixus · Larache')}
                        </p>
                        <div className="flex items-center gap-6">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    {user.role === 'demandeur' && (
                                        <Link
                                            href={route('user.reservations')}
                                            style={{ fontSize: '12px', fontFamily: "'EB Garamond', Georgia, serif", color: '#707070', fontWeight: 400 }}
                                            className={`hover:text-black transition-colors ${isActive('/mes-reservations') ? 'text-black underline' : ''}`}
                                        >
                                            {t('Mes réservations')}
                                        </Link>
                                    )}
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        style={{ fontSize: '12px', fontFamily: "'EB Garamond', Georgia, serif", color: '#707070', fontWeight: 400 }}
                                        className="hover:text-black transition-colors"
                                    >
                                        {t('Déconnexion')}
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={route('login')}
                                        style={{ fontSize: '12px', fontFamily: "'EB Garamond', Georgia, serif", color: '#707070', fontWeight: 400 }}
                                        className="hover:text-black transition-colors"
                                    >
                                        {t('Connexion')}
                                    </Link>
                                    <span style={{ color: '#EDEDED' }}>|</span>
                                    <Link
                                        href={route('register')}
                                        style={{ fontSize: '12px', fontFamily: "'EB Garamond', Georgia, serif", color: '#707070', fontWeight: 400 }}
                                        className="hover:text-black transition-colors"
                                    >
                                        {t("S'inscrire")}
                                    </Link>
                                </div>
                            )}
                            <a href="tel:+212539500000" dir="ltr" className="notranslate" translate="no" style={{ fontSize: '12px', color: '#707070', unicodeBidi: 'plaintext' }}>+212 5 39 50 00 00</a>
                            <a href="mailto:contact@lixusculture.ma" className="notranslate" translate="no" style={{ fontSize: '12px', color: '#707070' }}>contact@lixusculture.ma</a>
                        </div>
                    </div>
                </div>

                {/* Main nav row */}
                <div className="container-lad">
                    <div className="flex items-center justify-between" style={{ height: '72px' }}>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group" style={{ textDecoration: 'none', opacity: 1 }}>
                            <Logo className="h-12 w-auto flex-shrink-0" primaryColor="#2b4c7e" secondaryColor="#ffffff" />
                            <div>
                                <div style={{
                                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                                    fontSize: '16px', fontWeight: 500, letterSpacing: '0.05em',
                                    color: '#000000', lineHeight: 1, textTransform: 'uppercase',
                                }}>
                                    {t('Centre Culturel')}
                                </div>
                                <div style={{
                                    fontFamily: "'EB Garamond', Georgia, serif",
                                    fontSize: '11px', fontWeight: 300, letterSpacing: '0.15em',
                                    color: '#707070', lineHeight: 1, marginTop: '3px', textTransform: 'uppercase',
                                }}>
                                    {t('Lixus · Larache')}
                                </div>
                            </div>
                        </Link>

                        {/* Desktop nav links */}
                        <nav className="hidden lg:flex items-center" aria-label="Navigation principale">
                            {navLinks.map(({ href, label }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    style={{
                                        fontFamily: "'EB Garamond', Georgia, serif",
                                        fontSize: '16px',
                                        fontWeight: isActive(href) ? 500 : 400,
                                        color: '#000000',
                                        padding: '0 20px',
                                        lineHeight: '24px',
                                        textDecoration: isActive(href) ? 'underline' : 'none',
                                        opacity: 1,
                                        borderBottom: isActive(href) ? '2px solid #000000' : '2px solid transparent',
                                        paddingBottom: '4px',
                                        transition: 'opacity 200ms, border-color 200ms',
                                    }}
                                    onMouseEnter={e => { if (!isActive(href)) e.currentTarget.style.opacity = '0.7'; }}
                                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
                                >
                                    {label}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA + hamburger */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/reservation"
                                className="btn-lad-primary hidden lg:inline-flex"
                                style={{ textDecoration: 'none' }}
                            >
                                {t('Réserver une salle')}
                            </Link>

                            {/* Hamburger */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden flex flex-col justify-center items-center gap-1.5 touch-target"
                                aria-label="Menu"
                                aria-expanded={isMobileMenuOpen}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', width: '48px', height: '48px' }}
                            >
                                <span style={{
                                    display: 'block', width: '24px', height: '1px', backgroundColor: '#000',
                                    transition: 'transform 200ms ease',
                                    transform: isMobileMenuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
                                }} />
                                <span style={{
                                    display: 'block', width: '24px', height: '1px', backgroundColor: '#000',
                                    transition: 'opacity 200ms ease',
                                    opacity: isMobileMenuOpen ? 0 : 1,
                                }} />
                                <span style={{
                                    display: 'block', width: '24px', height: '1px', backgroundColor: '#000',
                                    transition: 'transform 200ms ease',
                                    transform: isMobileMenuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
                                }} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div style={{
                    borderTop: '1px solid #EDEDED',
                    backgroundColor: '#FFFFFF',
                    maxHeight: isMobileMenuOpen ? '600px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 300ms ease',
                }}>
                    <nav className="flex flex-col" style={{ padding: '16px' }}>
                        {navLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                style={{
                                    fontFamily: "'EB Garamond', Georgia, serif",
                                    fontSize: '16px',
                                    fontWeight: isActive(href) ? 500 : 400,
                                    color: '#000000',
                                    padding: '12px 20px',
                                    textDecoration: isActive(href) ? 'underline' : 'none',
                                    borderBottom: '1px solid #EDEDED',
                                    minHeight: '48px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {label}
                            </Link>
                        ))}
                        {user ? (
                            <>
                                {user.role === 'demandeur' && (
                                    <Link
                                        href={route('user.reservations')}
                                        style={{
                                            fontFamily: "'EB Garamond', Georgia, serif",
                                            fontSize: '16px', fontWeight: 400, color: '#000000',
                                            padding: '12px 20px', borderBottom: '1px solid #EDEDED',
                                            minHeight: '48px', display: 'flex', alignItems: 'center',
                                        }}
                                    >
                                        {t('Mes réservations')}
                                    </Link>
                                )}
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    style={{
                                        fontFamily: "'EB Garamond', Georgia, serif",
                                        fontSize: '16px', fontWeight: 400, color: '#C52034',
                                        padding: '12px 20px', borderBottom: '1px solid #EDEDED',
                                        minHeight: '48px', display: 'flex', alignItems: 'center', width: '100%', textAlign: 'left'
                                    }}
                                >
                                    {t('Déconnexion')}
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    style={{
                                        fontFamily: "'EB Garamond', Georgia, serif",
                                        fontSize: '16px', fontWeight: 400, color: '#000000',
                                        padding: '12px 20px', borderBottom: '1px solid #EDEDED',
                                        minHeight: '48px', display: 'flex', alignItems: 'center',
                                    }}
                                >
                                    {t('Connexion')}
                                </Link>
                                <Link
                                    href={route('register')}
                                    style={{
                                        fontFamily: "'EB Garamond', Georgia, serif",
                                        fontSize: '16px', fontWeight: 400, color: '#000000',
                                        padding: '12px 20px', borderBottom: '1px solid #EDEDED',
                                        minHeight: '48px', display: 'flex', alignItems: 'center',
                                    }}
                                >
                                    {t("S'inscrire")}
                                </Link>
                            </>
                        )}
                        <div style={{ padding: '16px 20px' }}>
                            <Link href="/reservation" className="btn-lad-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                {t('Réserver une salle')}
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
            {/* pt accounts for fixed header: utility bar (hidden on mobile) + main row 72px = 72px mobile / 104px desktop */}
            <main className="flex-grow pt-[72px] lg:pt-[104px] w-full max-w-full overflow-x-hidden">
                {children}
            </main>

            {/* ── FOOTER ───────────────────────────────────────────────────── */}
            <style>{`
                .footer-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
                .footer-col-nav { grid-column: span 1; }
                .footer-col-services { grid-column: span 1; }
                @media (min-width: 480px) {
                    .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
                }
                @media (min-width: 768px) {
                    .footer-grid { grid-template-columns: 2.5fr 1.5fr 2fr; gap: 40px; }
                }
            `}</style>
            <footer style={{ backgroundColor: '#000000', color: '#FFFFFF', overflowX: 'hidden' }}>
                {/* Main footer grid */}
                <div className="container-lad" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
                    <div className="footer-grid">

                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Logo className="h-12 w-auto flex-shrink-0" primaryColor="#ffffff" secondaryColor="#000000" />
                                <div>
                                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '14px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FFFFFF' }}>{t('Centre Culturel')}</div>
                                    <div style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: '11px', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9D9D9D', marginTop: '2px' }}>{t('Lixus · Larache')}</div>
                                </div>
                            </div>
                            <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: '14px', fontWeight: 300, lineHeight: '21px', color: '#9D9D9D', maxWidth: '280px' }}>
                                {t("Un espace de création, de partage et de rayonnement culturel au cœur de Larache. Nous cultivons l'art sous toutes ses formes.")}
                            </p>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '24px' }}>
                                {t('Navigation')}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {navLinks.map(({ href, label }) => (
                                    <li key={href}>
                                        <Link href={href} style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: '14px', fontWeight: 300, color: '#9D9D9D', textDecoration: 'none', lineHeight: '21px' }}
                                              onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
                                              onMouseLeave={e => { e.currentTarget.style.color = '#9D9D9D'; }}>
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services (Hidden)
                        <div>
                            <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '24px' }}>
                                {t('Services')}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {[
                                    { label: t('Réservation de salles'), href: '/reservation' },
                                    { label: t('Billetterie'), href: '/agenda' },
                                    { label: t('Partenariats'), href: '/contact' },
                                    { label: t('Presse'), href: '/contact' }
                                ].map(s => (
                                    <li key={s.label}>
                                        <Link href={s.href} style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: '14px', fontWeight: 300, color: '#9D9D9D', textDecoration: 'none' }}
                                              onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
                                              onMouseLeave={e => { e.currentTarget.style.color = '#9D9D9D'; }}>
                                            {s.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        */}

                        {/* Contact */}
                        <div>
                            <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FFFFFF', marginBottom: '24px' }}>
                                {t('Contact')}
                            </h4>
                            <address style={{ fontStyle: 'normal', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {[
                                    { icon: '📍', text: t('Avenue Hassan II, Larache, Maroc'), isSensitive: false },
                                    { icon: '✉', text: 'contact@lixusculture.ma', href: 'mailto:contact@lixusculture.ma', isSensitive: true },
                                    { icon: '☎', text: '+212 5 39 50 00 00', href: 'tel:+212539500000', isSensitive: true },
                                ].map(({ icon, text, href, isSensitive }) => (
                                    <div key={text} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                        <span style={{ color: '#97D2D4', fontSize: '14px', flexShrink: 0, marginTop: '2px' }}>{icon}</span>
                                        {href ? (
                                            <a href={href} dir={href.startsWith('tel:') ? 'ltr' : undefined} className={isSensitive ? "notranslate" : undefined} translate={isSensitive ? "no" : undefined} style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: '14px', fontWeight: 300, color: '#9D9D9D', textDecoration: 'none', lineHeight: '21px', unicodeBidi: href.startsWith('tel:') ? 'plaintext' : undefined }}
                                               onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
                                               onMouseLeave={e => { e.currentTarget.style.color = '#9D9D9D'; }}>
                                                {text}
                                            </a>
                                        ) : (
                                            <span style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: '14px', fontWeight: 300, color: '#9D9D9D', lineHeight: '21px' }}>{text}</span>
                                        )}
                                    </div>
                                ))}
                            </address>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{ borderTop: '1px solid #3C3C3C' }}>
                    <div className="container-lad flex flex-col sm:flex-row items-center justify-between gap-4" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                        <p style={{ fontFamily: "'EB Garamond', Georgia, serif", fontSize: '12px', fontWeight: 300, color: '#707070', margin: 0 }}>
                            &copy; {new Date().getFullYear()} {t('Centre Culturel')} <span className="notranslate" translate="no">Lixus</span>. {t('Tous droits réservés.')}
                        </p>
                        {url !== '/reservation' && (
                            <Link
                                href="/reservation"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#97D2D4', textDecoration: 'none' }}
                                onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = '#97D2D4'; }}
                            >
                                {t('Réserver une salle')} →
                            </Link>
                        )}
                    </div>
                </div>
            </footer>
        </div>
    );
}

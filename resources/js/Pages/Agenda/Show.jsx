import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import useTranslation from '@/hooks/useTranslation';

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

export default function Show({ actualite }) {
    const { t } = useTranslation();
    const imageUrl = actualite.image
        ? (actualite.image.startsWith('http') || actualite.image.startsWith('/storage/')
            ? actualite.image
            : '/storage/' + actualite.image)
        : null;

    const dateObj = actualite.publication_date ? new Date(actualite.publication_date) : (actualite.created_at ? new Date(actualite.created_at) : null);
    const dateStr = dateObj ? dateObj.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' }) : t('Date non définie');

    return (
        <PublicLayout>
            <Head title={`${actualite.title || t('Événement')} - ${t('Centre Culturel')} Lixus`} />

            {/* Header Premium */}
            <section style={{ backgroundColor: '#050B14', position: 'relative', overflow: 'hidden', minHeight: '40vh', display: 'flex', alignItems: 'flex-end', padding: '60px 0' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,11,20,0.95) 0%, rgba(5,11,20,0.6) 100%)' }} />

                <div className="container-lad" style={{ position: 'relative', zIndex: 1 }}>
                    <Link href="/agenda" style={{ display: 'inline-block', fontFamily: DS.body, fontSize: '12px', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9D9D9D', textDecoration: 'none', marginBottom: '24px' }}>
                        ← {t("Retour à l'agenda")}
                    </Link>
                    <div style={{ marginBottom: '16px' }}>
                        <span className="badge-lad badge-lad-teal">
                            {t(actualite.category || 'Activité')}
                        </span>
                    </div>
                    <h1 style={{ fontFamily: DS.display, fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 300, color: '#FFFFFF', lineHeight: 1.15, maxWidth: '900px', marginBottom: '24px' }}>
                        {actualite.title}
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#97D2D4' }}>◆</span>
                        <span style={{ fontFamily: DS.body, fontSize: '16px', color: '#FFFFFF' }}>{dateStr}</span>
                    </div>
                </div>
            </section>

            {/* Content Article */}
            <section style={{ backgroundColor: '#FFFFFF', padding: '60px 0' }}>
                <div className="container-lad" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    
                    {/* Article Body */}
                    <div className="prose-lad" style={{ fontFamily: DS.body, fontSize: '18px', fontWeight: 300, color: '#3C3C3C', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                        {actualite.description || actualite.contenu}
                    </div>

                    {/* Footer Article */}
                    <div style={{ borderTop: '1px solid #EDEDED', marginTop: '60px', paddingTop: '40px', display: 'flex', justifyContent: 'center' }}>
                        <Link href="/agenda" className="btn-lad-secondary" style={{ textDecoration: 'none' }}>
                            {t("Retour à l'agenda")}
                        </Link>
                    </div>

                </div>
            </section>
        </PublicLayout>
    );
}

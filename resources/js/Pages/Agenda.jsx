import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import useTranslation from '@/hooks/useTranslation';
import AgendaCalendar from '@/Components/AgendaCalendar';

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

export default function Agenda({ dbEvents }) {
    const { t } = useTranslation();

    // Default events removed to avoid fake data

    const events = (dbEvents && dbEvents.length > 0) ? dbEvents.map(e => {
        const d = e.event_date ? new Date(e.event_date) : (e.publication_date ? new Date(e.publication_date) : new Date(e.created_at));
        return {
            id: e.id,
            title: e.title || e.titre || 'Sans titre',
            category: e.category || e.categorie || 'Activité',
            dateBlock: {
                day: d.toLocaleDateString('fr-FR', { day: '2-digit' }),
                month: d.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '').toUpperCase()
            },
            fullDate: d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
            isoDate: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
            time: e.event_time ? e.event_time.substring(0, 5) : d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            location: e.location || 'Centre Culturel Lixus',
            image: e.image
                ? (e.image.startsWith('http') || e.image.startsWith('/storage/')
                    ? e.image
                    : '/storage/' + e.image)
                : '',
            description: e.description || e.contenu || '',
        };
    }) : [];

    return (
        <PublicLayout>
            <Head title={`${t('Agenda Culturel')} - ${t('Centre Culturel')} Lixus`} />

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
                    <p style={{ fontFamily: DS.body, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#97D2D4', marginBottom: '8px' }}>{t('PROGRAMMATION & ÉVÉNEMENTS')}</p>
                    <h1 style={{ fontFamily: DS.display, fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300, color: '#FFFFFF', marginBottom: '10px', lineHeight: 1.1 }}>
                        {t('Agenda Culturel')}
                    </h1>
                    <p style={{ fontFamily: DS.body, fontSize: 'clamp(13px, 2vw, 15px)', fontWeight: 300, color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.4 }}>
                        {t('Découvrez les prochains événements')}
                    </p>
                </div>
            </section>

            {/* Content Area */}
            <section className="py-6 sm:py-16 bg-white overflow-hidden max-w-full">
                <div className="container-lad max-w-full overflow-hidden">
                    
                    {/* Calendar View Area */}
                    <AgendaCalendar events={events} />
                </div>
            </section>
        </PublicLayout>
    );
}

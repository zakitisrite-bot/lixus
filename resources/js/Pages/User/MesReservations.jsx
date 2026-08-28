import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import useTranslation from '@/hooks/useTranslation';

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

const STATUT_CONFIG = {
    en_attente: { key: 'En attente', color: '#F59E0B', bg: '#FEF3C7', border: '#FDE68A' },
    approuvee: { key: 'Approuvée', color: '#10B981', bg: '#D1FAE5', border: '#A7F3D0' },
    rejetee: { key: 'Rejetée', color: '#EF4444', bg: '#FEE2E2', border: '#FECACA' },
};

function StatutBadge({ statut, t }) {
    const cfg = STATUT_CONFIG[statut] ?? { key: statut, color: '#6B7280', bg: '#F3F4F6', border: '#E5E7EB' };
    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 12px', backgroundColor: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, fontFamily: DS.body, fontSize: '13px', fontWeight: 500, letterSpacing: '0.05em' }}>
            <span style={{ width: '6px', height: '6px', backgroundColor: cfg.color, borderRadius: '50%', marginRight: '8px' }} />
            {t(cfg.key)}
        </span>
    );
}

export default function MesReservations({ reservations }) {
    const { t } = useTranslation();
    const counts = {
        total: reservations.length,
        en_attente: reservations.filter(r => r.statut === 'en_attente').length,
        approuvee: reservations.filter(r => r.statut === 'approuvee').length,
        rejetee: reservations.filter(r => r.statut === 'rejetee').length,
    };

    return (
        <PublicLayout>
            <Head title={`${t('Mes réservations')} - ${t('Centre Culturel')} Lixus`} />

            {/* Header */}
            <section style={{ backgroundColor: '#F8F9FA', padding: '60px 0', borderBottom: '1px solid #EDEDED' }}>
                <div className="container-lad">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
                        <div>
                            <p style={{ fontFamily: DS.display, fontSize: '12px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>{t('Espace Utilisateur')}</p>
                            <h1 style={{ fontFamily: DS.display, fontSize: '36px', fontWeight: 300, color: '#000', margin: 0 }}>{t('Mes réservations')}</h1>
                        </div>
                        <Link href={route('reservations.create')} className="btn-lad-primary" style={{ textDecoration: 'none' }}>
                            {t('Nouvelle demande')}
                        </Link>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '40px' }}>
                        {[
                            { label: t('Total'), count: counts.total, color: '#000' },
                            { label: t('En attente'), count: counts.en_attente, color: '#F59E0B' },
                            { label: t('Approuvées'), count: counts.approuvee, color: '#10B981' },
                            { label: t('Rejetées'), count: counts.rejetee, color: '#EF4444' },
                        ].map(stat => (
                            <div key={stat.label} style={{ backgroundColor: '#FFFFFF', border: '1px solid #EDEDED', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontFamily: DS.display, fontSize: '24px', fontWeight: 300, color: stat.color }}>{stat.count}</span>
                                <span style={{ fontFamily: DS.body, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#707070' }}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content */}
            <section style={{ backgroundColor: '#FFFFFF', padding: '60px 0', minHeight: '50vh' }}>
                <div className="container-lad">
                    {reservations.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '80px 0', border: '1px solid #EDEDED', backgroundColor: '#F8F9FA' }}>
                            <h3 style={{ fontFamily: DS.display, fontSize: '24px', fontWeight: 300, color: '#000', marginBottom: '16px' }}>{t('Aucune réservation')}</h3>
                            <p style={{ fontFamily: DS.body, fontSize: '16px', color: '#707070', marginBottom: '32px' }}>{t("Vous n'avez pas encore soumis de demande de réservation.")}</p>
                            <Link href={route('reservations.create')} className="btn-lad-primary" style={{ textDecoration: 'none' }}>
                                {t('Faire une demande')}
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {reservations.map(r => (
                                <div key={r.id} style={{ border: '1px solid #EDEDED', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', backgroundColor: '#F8F9FA', borderBottom: '1px solid #EDEDED' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                                <h3 style={{ fontFamily: DS.display, fontSize: '20px', fontWeight: 500, color: '#000', margin: 0 }}>{r.salle_nom}</h3>
                                                <span style={{ fontFamily: DS.body, fontSize: '12px', color: '#9D9D9D' }}>{t('Demande')} #{r.id}</span>
                                            </div>
                                            <p style={{ fontFamily: DS.body, fontSize: '14px', color: '#707070', margin: 0 }}>{t('Soumise le')} {r.created_at}</p>
                                        </div>
                                        <StatutBadge statut={r.statut} t={t} />
                                    </div>
                                    <div style={{ padding: '24px' }}>
                                        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                            <div>
                                                <p style={{ fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '4px' }}>{t("Date de l'événement")}</p>
                                                <p style={{ fontFamily: DS.body, fontSize: '14px', color: '#000' }}>{r.date_activite}</p>
                                            </div>
                                            <div>
                                                <p style={{ fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '4px' }}>{t('Horaires')}</p>
                                                <p style={{ fontFamily: DS.body, fontSize: '14px', color: '#000' }}>{r.heure_debut} → {r.heure_fin}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p style={{ fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '4px' }}>{t('Description')}</p>
                                            <p style={{ fontFamily: DS.body, fontSize: '14px', color: '#707070', lineHeight: '21px', margin: 0 }}>{r.description_activite}</p>
                                        </div>
                                        
                                        {r.motif && (
                                            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: r.statut === 'approuvee' ? '#ECFDF5' : '#FEE2E2', borderLeft: `4px solid ${r.statut === 'approuvee' ? '#10B981' : '#EF4444'}` }}>
                                                <p style={{ fontFamily: DS.display, fontSize: '12px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: r.statut === 'approuvee' ? '#047857' : '#B91C1C', marginBottom: '4px' }}>{t("Remarque de l'administration")}</p>
                                                <p style={{ fontFamily: DS.body, fontSize: '14px', color: r.statut === 'approuvee' ? '#065F46' : '#991B1B', margin: 0 }}>{r.motif}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}

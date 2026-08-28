import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import useTranslation from '@/hooks/useTranslation';

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

export default function Contact() {
    const { t } = useTranslation();
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '', email: '', subject: '', message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.send'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout>
            <Head title={`${t('Contact & Accès')} - ${t('Centre Culturel')} Lixus`} />

            {/* Page Header */}
            <section style={{ backgroundColor: '#000', padding: '60px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(151,210,212,0.08) 0%, transparent 70%)' }} />
                <div className="container-lad" style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{ fontFamily: DS.body, fontSize: '12px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#97D2D4', marginBottom: '16px' }}>
                        {t('Nous écrire')}
                    </p>
                    <h1 style={{ fontFamily: DS.display, fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300, color: '#FFFFFF', marginBottom: '16px' }}>
                        {t('Contact & Accès')}
                    </h1>
                    <div style={{ width: '40px', height: '1px', backgroundColor: '#97D2D4', margin: '0 auto 20px' }} />
                    <p style={{ fontFamily: DS.body, fontSize: '16px', fontWeight: 300, color: 'rgba(255,255,255,0.7)', maxWidth: '480px', margin: '0 auto', lineHeight: '22.4px' }}>
                        {t("Nous sommes à votre écoute pour toute demande d'information, suggestion ou proposition de partenariat.")}
                    </p>
                </div>
            </section>

            {/* Content */}
            <section style={{ backgroundColor: '#FFFFFF', padding: '60px 0' }}>
                <div className="container-lad">
                    <div style={{ display: 'grid', gap: '48px' }} className="grid grid-cols-1 md:grid-cols-2">

                        {/* Coordonnées */}
                        <div>
                            <h2 style={{ fontFamily: DS.display, fontSize: '28px', fontWeight: 300, color: '#000', marginBottom: '32px' }}>
                                {t('Nos Coordonnées')}
                            </h2>
                            {[
                                {
                                    label: t('Adresse'),
                                    value: t('Avenue Mohammed V, Centre Ville, Larache, Maroc'),
                                    href: null,
                                    isPhone: false,
                                    icon: <svg width="20" height="20" fill="none" stroke="#97D2D4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
                                },
                                {
                                    label: t('Email'),
                                    value: 'contact@lixusculture.ma',
                                    href: 'mailto:contact@lixusculture.ma',
                                    isPhone: false,
                                    icon: <svg width="20" height="20" fill="none" stroke="#97D2D4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
                                },
                                {
                                    label: t('Téléphone'),
                                    value: '+212 5 39 91 39 51',
                                    href: 'tel:+212539913951',
                                    isPhone: true,
                                    icon: <svg width="20" height="20" fill="none" stroke="#97D2D4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
                                },
                                {
                                    label: t('Horaires'),
                                    value: t('Lun–Ven : 9h00 – 18h00\nSam : 9h00 – 13h00'),
                                    href: null,
                                    isPhone: false,
                                    icon: <svg width="20" height="20" fill="none" stroke="#97D2D4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                                },
                            ].map(({ label, value, href, isPhone, icon }) => (
                                <div key={label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '28px' }}>
                                    <div style={{ width: '40px', height: '40px', border: '1px solid #EDEDED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        {icon}
                                    </div>
                                    <div>
                                        <p style={{ fontFamily: DS.display, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '4px' }}>{label}</p>
                                        {href ? (
                                            <a href={href} style={{ fontFamily: DS.body, fontSize: '16px', fontWeight: 300, color: '#000', textDecoration: 'none', lineHeight: '22.4px', display: 'inline-block', whiteSpace: 'pre-line' }}
                                               onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
                                               onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                                                {isPhone ? <span dir="ltr" style={{ display: 'inline-block', direction: 'ltr' }}>+212 5 39 91 39 51</span> : value}
                                            </a>
                                        ) : (
                                            <p style={{ fontFamily: DS.body, fontSize: '16px', fontWeight: 300, color: '#3C3C3C', lineHeight: '22.4px', whiteSpace: 'pre-line' }}>{value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact Form */}
                        <div style={{ border: '1px solid #EDEDED', padding: '40px' }}>
                            <h2 style={{ fontFamily: DS.display, fontSize: '24px', fontWeight: 300, color: '#000', marginBottom: '24px' }}>
                                {t('Envoyez-nous un message')}
                            </h2>

                            {/* Success message */}
                            {(flash?.success || wasSuccessful) && (
                                <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', color: '#166534', padding: '12px 16px', marginBottom: '24px', fontFamily: DS.body, fontSize: '14px', lineHeight: '1.5', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '1px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {flash?.success || t('Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.')}
                                </div>
                            )}

                            {/* Generic error */}
                            {errors.email && (
                                <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', padding: '12px 16px', marginBottom: '24px', fontFamily: DS.body, fontSize: '14px' }}>
                                    {errors.email}
                                </div>
                            )}

                            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {[
                                    { id: 'name', label: t('Nom complet'), type: 'text', placeholder: t('Votre nom') },
                                    { id: 'email', label: t('Adresse email'), type: 'email', placeholder: t('votre@email.com') },
                                    { id: 'subject', label: t('Sujet'), type: 'text', placeholder: t('Le sujet de votre message') },
                                ].map(({ id, label, type, placeholder }) => (
                                    <div key={id}>
                                        <label htmlFor={id} style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>
                                            {label} *
                                        </label>
                                        <input type={type} id={id} value={data[id]} required placeholder={placeholder}
                                            className="input-lad"
                                            style={{ fontFamily: DS.body }}
                                            onChange={e => setData(id, e.target.value)} />
                                        {errors[id] && <p style={{ color: '#C52034', fontSize: '12px', marginTop: '4px' }}>{errors[id]}</p>}
                                    </div>
                                ))}
                                <div>
                                    <label htmlFor="message" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>
                                        {t('Message')} *
                                    </label>
                                    <textarea id="message" required rows={5} placeholder={t('Écrivez votre message ici...')}
                                        className="input-lad"
                                        style={{ fontFamily: DS.body, resize: 'vertical', minHeight: '120px' }}
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)} />
                                    {errors.message && <p style={{ color: '#C52034', fontSize: '12px', marginTop: '4px' }}>{errors.message}</p>}
                                </div>
                                <button type="submit" className="btn-lad-primary" disabled={processing}
                                    style={{ width: '100%', justifyContent: 'center', marginTop: '8px', opacity: processing ? 0.7 : 1, cursor: processing ? 'not-allowed' : 'pointer' }}>
                                    {processing ? t('Envoi en cours...') : t('Envoyer le message')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

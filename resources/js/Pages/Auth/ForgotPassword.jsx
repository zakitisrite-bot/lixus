import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import React, { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

export default function ForgotPassword({ status, codeSent = false, sentEmail = '' }) {
    const [step, setStep] = useState(codeSent ? 2 : 1);

    // Form for requesting 6-digit code
    const requestCodeForm = useForm({
        email: sentEmail || '',
    });

    // Form for verifying 6-digit code & resetting password
    const verifyCodeForm = useForm({
        email: sentEmail || '',
        code: '',
        password: '',
        password_confirmation: '',
    });

    const handleSendCode = (e) => {
        e.preventDefault();
        requestCodeForm.post(route('password.email'), {
            onSuccess: (page) => {
                verifyCodeForm.setData('email', requestCodeForm.data.email);
                setStep(2);
            }
        });
    };

    const handleVerifyAndReset = (e) => {
        e.preventDefault();
        verifyCodeForm.post(route('password.verify_code'));
    };

    return (
        <GuestLayout>
            <Head title="Mot de passe oublié - Centre Culturel Lixus" />

            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                <h1 style={{ fontFamily: DS.display, fontSize: '28px', fontWeight: 300, color: '#000', marginBottom: '8px' }}>
                    {step === 1 ? 'Mot de passe oublié ?' : 'Vérification du code à 6 chiffres'}
                </h1>
                <p style={{ fontFamily: DS.body, fontSize: '15px', color: '#707070', lineHeight: '1.5' }}>
                    {step === 1 
                        ? 'Saisissez votre adresse email pour recevoir le code de vérification à 6 chiffres.' 
                        : 'Entrez le code de vérification à 6 chiffres ainsi que votre nouveau mot de passe.'}
                </p>
            </div>

            {status && (
                <div style={{ backgroundColor: '#E8F5E9', border: '1px solid #A5D6A7', color: '#2E7D32', padding: '14px', fontFamily: DS.body, fontSize: '14px', marginBottom: '24px', borderRadius: '4px', textAlign: 'center' }}>
                    {status}
                </div>
            )}

            {step === 1 ? (
                /* STEP 1: Enter Email */
                <form onSubmit={handleSendCode} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label htmlFor="email" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>
                            Adresse Email *
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={requestCodeForm.data.email}
                            autoFocus
                            placeholder="exemple@domaine.com"
                            onChange={(e) => requestCodeForm.setData('email', e.target.value)}
                            className="input-lad"
                            style={{ fontFamily: DS.body }}
                        />
                        {requestCodeForm.errors.email && (
                            <div style={{ color: '#C52034', fontFamily: DS.body, fontSize: '13px', marginTop: '6px' }}>
                                {requestCodeForm.errors.email}
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={requestCodeForm.processing} className="btn-lad-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                        Envoyer le code de vérification
                    </button>

                    <div style={{ borderTop: '1px solid #EDEDED', marginTop: '12px', paddingTop: '20px', textAlign: 'center' }}>
                        <Link href={route('login')} style={{ fontFamily: DS.body, fontSize: '14px', color: '#707070', textDecoration: 'underline' }}>
                            ← Retour à la connexion
                        </Link>
                    </div>
                </form>
            ) : (
                /* STEP 2: Enter 6-Digit Code & New Password */
                <form onSubmit={handleVerifyAndReset} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label htmlFor="verify_email" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>
                            Adresse Email *
                        </label>
                        <input
                            id="verify_email"
                            type="email"
                            name="email"
                            value={verifyCodeForm.data.email}
                            onChange={(e) => verifyCodeForm.setData('email', e.target.value)}
                            className="input-lad"
                            style={{ fontFamily: DS.body }}
                        />
                        {verifyCodeForm.errors.email && (
                            <div style={{ color: '#C52034', fontFamily: DS.body, fontSize: '13px', marginTop: '6px' }}>
                                {verifyCodeForm.errors.email}
                            </div>
                        )}
                    </div>

                    {/* 6-DIGIT VERIFICATION CODE FIELD matching exact screenshot requirement */}
                    <div>
                        <label htmlFor="code" style={{ display: 'block', fontFamily: DS.body, fontSize: '16px', fontWeight: 400, color: '#333333', marginBottom: '8px' }}>
                            Code de vérification
                        </label>
                        <input
                            id="code"
                            type="text"
                            name="code"
                            maxLength="8"
                            value={verifyCodeForm.data.code}
                            autoFocus
                            placeholder="Ex: 1 2 3 4 5 6"
                            onChange={(e) => verifyCodeForm.setData('code', e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '14px 16px', 
                                border: verifyCodeForm.errors.code ? '1.5px solid #C52034' : '1.5px solid #A81C1C', 
                                backgroundColor: '#FFFFFF',
                                fontFamily: DS.display,
                                fontSize: '20px',
                                fontWeight: 500,
                                textAlign: 'center',
                                letterSpacing: '0.3em',
                                color: '#2B4C7E',
                                outline: 'none',
                                transition: 'all 200ms ease'
                            }}
                        />
                        {verifyCodeForm.errors.code && (
                            <div style={{ color: '#C52034', fontFamily: DS.body, fontSize: '13px', marginTop: '6px', textAlign: 'center' }}>
                                {verifyCodeForm.errors.code}
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>
                            Nouveau mot de passe * <span style={{ textTransform: 'none', color: '#707070' }}>(min. 6 chiffres/caractères)</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={verifyCodeForm.data.password}
                            placeholder="••••••"
                            onChange={(e) => verifyCodeForm.setData('password', e.target.value)}
                            className="input-lad"
                            style={{ fontFamily: DS.body }}
                        />
                        {verifyCodeForm.errors.password && (
                            <div style={{ color: '#C52034', fontFamily: DS.body, fontSize: '13px', marginTop: '6px' }}>
                                {verifyCodeForm.errors.password}
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>
                            Confirmer le nouveau mot de passe *
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={verifyCodeForm.data.password_confirmation}
                            placeholder="••••••"
                            onChange={(e) => verifyCodeForm.setData('password_confirmation', e.target.value)}
                            className="input-lad"
                            style={{ fontFamily: DS.body }}
                        />
                        {verifyCodeForm.errors.password_confirmation && (
                            <div style={{ color: '#C52034', fontFamily: DS.body, fontSize: '13px', marginTop: '6px' }}>
                                {verifyCodeForm.errors.password_confirmation}
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={verifyCodeForm.processing} className="btn-lad-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
                        Réinitialiser mon mot de passe
                    </button>

                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #EDEDED', marginTop: '12px', paddingTop: '20px' }}>
                        <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', fontFamily: DS.body, fontSize: '14px', color: '#707070', cursor: 'pointer', textDecoration: 'underline' }}>
                            ← Renvoyer un code
                        </button>
                        <Link href={route('login')} style={{ fontFamily: DS.body, fontSize: '14px', color: '#707070', textDecoration: 'underline' }}>
                            Connexion
                        </Link>
                    </div>
                </form>
            )}
        </GuestLayout>
    );
}

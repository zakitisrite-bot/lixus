import React from 'react';
import { Link } from '@inertiajs/react';
import Logo from '@/Components/Logo';

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

export default function GuestLayout({ children }) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8F9FA' }}>
            <div className="flex-grow flex items-center justify-center p-4 sm:p-6">
                <div style={{ width: '100%', maxWidth: '420px' }}>
                    {/* Logo Section */}
                    <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                        <Link href="/" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none' }}>
                            <Logo className="h-16 sm:h-20 w-auto flex-shrink-0 mb-3 sm:mb-4" primaryColor="#2b4c7e" secondaryColor="#ffffff" />
                            <div style={{ fontFamily: DS.display, fontSize: '18px', fontWeight: 500, letterSpacing: '0.1em', color: '#000000', textTransform: 'uppercase', lineHeight: 1 }}>
                                Centre Culturel
                            </div>
                            <div style={{ fontFamily: DS.body, fontSize: '12px', fontWeight: 300, letterSpacing: '0.2em', color: '#707070', textTransform: 'uppercase', marginTop: '4px' }}>
                                Lixus · Larache
                            </div>
                        </Link>
                    </div>

                    {/* Auth Box */}
                    <div className="bg-white border border-[#EDEDED] p-5 sm:p-10 shadow-sm rounded-sm">
                        {children}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '24px' }}>
                        <Link href="/" style={{ fontFamily: DS.body, fontSize: '13px', color: '#9D9D9D', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                              onMouseEnter={e => e.currentTarget.style.color = '#000'}
                              onMouseLeave={e => e.currentTarget.style.color = '#9D9D9D'}>
                            ← Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

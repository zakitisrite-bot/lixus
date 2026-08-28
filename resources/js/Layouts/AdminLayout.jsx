import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Logo from '@/Components/Logo';

export default function AdminLayout({ user, children }) {
    const { url } = usePage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Tableau de bord', href: route('dashboard'), icon: (
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
        )},
        { name: 'Salles', href: route('admin.salles.index'), icon: (
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
        ) },
        { name: 'Réservations', href: route('admin.reservations.index'), icon: (
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        ) },
        { name: 'Actualités', href: route('admin.actualites.index'), icon: (
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
        ) },
        { name: 'Agenda', href: route('admin.agendas.index'), icon: (
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        ) },
        { name: 'Galeries', href: route('admin.galeries.index'), icon: (
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
        ) },
        { name: 'Messages', href: route('admin.messages.index'), icon: (
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        ) },
        { name: 'Utilisateurs', href: route('admin.utilisateurs.index'), icon: (
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        ) },
        { name: 'Espace Ministre', href: route('ministre.dashboard'), icon: (
            <svg className="w-5 h-5 mr-3 flex-shrink-0 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        ) },
        { name: 'Aperçu Site', href: route('home'), icon: (
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
        ) },
    ];

    return (
        <div className="min-h-screen bg-[#F4F7FE] flex flex-col lg:flex-row font-sans overflow-x-hidden">
            
            {/* Mobile Header Bar (Sticky Top) */}
            <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
                <Link href="/" className="flex items-center gap-2">
                    <Logo className="h-9 w-auto flex-shrink-0" primaryColor="#4f46e5" secondaryColor="#ffffff" />
                    <span className="text-slate-800 font-bold text-lg tracking-tight">Lixus Admin</span>
                </Link>

                <div className="flex items-center gap-3">
                    <Link href={route('logout')} method="post" as="button" className="text-xs font-semibold text-slate-500 hover:text-red-600">
                        Déconnexion
                    </Link>

                    {/* Hamburger Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none rounded-lg hover:bg-slate-100"
                        aria-label="Menu Administration"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (
                <div 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity"
                />
            )}

            {/* Mobile Sidebar Drawer */}
            <aside className={`lg:hidden fixed top-0 left-0 bottom-0 w-[270px] bg-white z-50 flex flex-col transform transition-transform duration-300 ease-in-out shadow-2xl ${
                isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <Logo className="h-10 w-auto flex-shrink-0" primaryColor="#4f46e5" secondaryColor="#ffffff" />
                        <span className="text-slate-800 font-bold text-lg">Lixus.io</span>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-slate-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="p-4">
                    <Link 
                        href={route('reservations.create')} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm shadow-sm transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Nouvelle Demande
                    </Link>
                </div>

                <nav className="px-4 space-y-1 flex-1 overflow-y-auto pb-6">
                    {navItems.map((item) => {
                        const isActive = url.startsWith(item.href) && item.href !== '#' && item.href !== route('home');
                        return (
                            <Link 
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                    isActive 
                                    ? 'text-indigo-600 bg-indigo-50 shadow-sm' 
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                <div className={`${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                                    {item.icon}
                                </div>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Sidebar Desktop (Fixed Left) */}
            <aside className="hidden lg:flex w-[260px] bg-white flex-col fixed h-full z-20 border-r border-gray-100 shadow-[0_0_20px_rgba(0,0,0,0.02)]">
                {/* Logo */}
                <div className="h-24 flex items-center px-8">
                    <div className="flex items-center gap-3">
                        <Logo className="h-12 w-auto flex-shrink-0" primaryColor="#4f46e5" secondaryColor="#ffffff" />
                        <span className="text-slate-800 font-bold text-xl tracking-tight">Lixus.io</span>
                    </div>
                </div>

                {/* Create Button */}
                <div className="px-6 mb-6">
                    <Link href={route('reservations.create')} className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 py-3 px-4 rounded-xl flex items-center justify-between transition-colors border border-slate-100">
                        <span className="text-sm font-semibold">Nouvelle Demande</span>
                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="px-4 space-y-1.5 flex-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = url.startsWith(item.href) && item.href !== '#' && item.href !== route('home');
                        return (
                            <Link 
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                    isActive 
                                    ? 'text-indigo-600 bg-indigo-50/80 shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                                }`}
                            >
                                <div className={`${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                                    {item.icon}
                                </div>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen max-w-full overflow-x-hidden">
                <main className="p-3 sm:p-6 lg:p-10 flex-1 w-full max-w-[1400px] mx-auto overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}

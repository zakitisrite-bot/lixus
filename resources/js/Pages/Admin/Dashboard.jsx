import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ stats, recentActivities }) {
    const { auth } = usePage().props;
    const user = auth.user;

    // Formatting today's date
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('fr-FR', dateOptions);

    const overviewStats = [
        { 
            title: 'Salles Actives', 
            value: stats?.salles_actives || 0, 
            bgColor: 'bg-[#F4C150]', // Yellow
            icon: <svg className="w-6 h-6 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        },
        { 
            title: 'Validées', 
            value: stats?.evenements_avenir || 0, 
            bgColor: 'bg-[#4B449A]', // Dark Purple
            icon: <svg className="w-6 h-6 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        },
        { 
            title: 'En attente', 
            value: stats?.reservations_attente || 0, 
            bgColor: 'bg-[#F06A91]', // Pink
            icon: <svg className="w-6 h-6 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        },
        { 
            title: 'Utilisateurs', 
            value: stats?.nouveaux_demandeurs || 0, 
            bgColor: 'bg-[#D2C3EC]', // Light Purple
            icon: <svg className="w-6 h-6 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
        },
    ];

    return (
        <AdminLayout user={user}>
            <Head title="Dashboard - Lixus" />

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Tableau de bord Admin</h1>
                    <p className="text-xs sm:text-sm font-semibold text-indigo-500/80 mt-0.5 capitalize">{today}</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-sm shadow-sm">
                            {user?.name?.substring(0, 2).toUpperCase() || 'AD'}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{user?.name}</span>
                            <Link href={route('logout')} method="post" as="button" className="text-[11px] sm:text-xs text-slate-400 hover:text-red-600 text-left">
                                Se déconnecter
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Banner */}
            <div className="bg-[#EAE6F8] rounded-2xl sm:rounded-[24px] p-6 sm:p-10 mb-6 sm:mb-10 relative overflow-hidden flex items-center">
                <div className="relative z-10 max-w-lg">
                    <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 mb-2 sm:mb-3 tracking-tight">Bonjour, {user?.name?.split(' ')[0] || 'Admin'}</h2>
                    <p className="text-slate-600 text-sm sm:text-lg">Bienvenue sur votre espace d'administration Lixus.</p>
                </div>
                <div className="absolute right-[20%] top-[20%] w-3 h-3 bg-indigo-400 rounded-full opacity-50"></div>
                <div className="absolute right-[30%] bottom-[30%] w-4 h-4 bg-white rounded-full opacity-50"></div>
                <div className="absolute right-[5%] bottom-[20%] w-16 h-16 sm:w-20 sm:h-20 border-4 border-indigo-200 rounded-full opacity-30"></div>
            </div>

            {/* Overview Stats */}
            <h3 className="text-slate-400 font-bold mb-3 sm:mb-4 uppercase tracking-wider text-xs">Aperçu Général</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8 sm:mb-10">
                {overviewStats.map((stat, idx) => (
                    <div key={idx} className={`${stat.bgColor} rounded-xl sm:rounded-[20px] p-4 sm:p-6 flex flex-col items-center justify-center text-center shadow-sm hover:-translate-y-1 transition-transform cursor-pointer relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></div>
                        <div className="w-10 h-10 sm:w-12 sm:h-12 border border-white/20 rounded-xl flex items-center justify-center mb-2 sm:mb-3 bg-white/10 backdrop-blur-sm">
                            {stat.icon}
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold text-white mb-0.5">{stat.value}</div>
                        <div className="text-[11px] sm:text-xs font-semibold text-white/80">{stat.title}</div>
                    </div>
                ))}
            </div>

            {/* Lists area */}
            <div className="space-y-3 sm:space-y-4">
                {(!recentActivities || recentActivities.length === 0) ? (
                    <div className="bg-white rounded-xl sm:rounded-[20px] p-6 text-center text-slate-500 shadow-sm border border-slate-100 text-sm">
                        Aucune activité récente à afficher.
                    </div>
                ) : (
                    recentActivities.slice(0, 5).map((item, idx) => (
                        <div key={idx} className="bg-white rounded-xl sm:rounded-[20px] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-slate-50 hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 sm:w-20 sm:h-20 rounded-xl flex-shrink-0 flex items-center justify-center ${idx % 2 === 0 ? 'bg-amber-400' : 'bg-[#1E174E]'}`}>
                                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            
                            <div className="flex-1 min-w-0 w-full">
                                <h4 className="text-indigo-600 font-bold text-base sm:text-lg mb-1 truncate">{item.type} - {item.user}</h4>
                                <p className="text-slate-500 text-xs sm:text-sm mb-2 truncate max-w-xl">{item.details}</p>
                                <div className="text-slate-800 font-bold text-xs sm:text-sm">
                                    {item.time}
                                </div>
                            </div>

                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                <span className={`px-3 py-1 text-[11px] sm:text-xs font-bold rounded-full ${
                                    item.status === 'Validé' ? 'bg-indigo-100 text-indigo-700' : 
                                    item.status === 'En attente' ? 'bg-amber-100 text-amber-700' : 
                                    'bg-slate-100 text-slate-600'
                                }`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </AdminLayout>
    );
}

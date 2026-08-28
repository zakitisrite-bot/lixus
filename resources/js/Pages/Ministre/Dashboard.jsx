import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';

// ── Icons ──────────────────────────────────────────────────────────────────
const Icons = {
    ChartBar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    CheckCircle: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Calendar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    Building: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    Search: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    Printer: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
    Users: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5 5 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    Crown: () => <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
};

// ── Badges ─────────────────────────────────────────────────────────────────
const BADGE_STYLES = {
    en_attente: 'bg-amber-50 text-amber-700 border border-amber-200',
    approuvee:  'bg-emerald-50 text-emerald-700 border border-emerald-200',
    rejetee:    'bg-rose-50 text-rose-700 border border-rose-200',
};
const BADGE_LABELS = { en_attente: 'En attente', approuvee: 'Validée', rejetee: 'Refusée' };

export default function MinistreDashboard({ kpis, par_mois = [], repartition_statut = [], activite_recente = [] }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const totalReservations = kpis?.total_reservations ?? 0;
    const approvalRate = kpis?.taux_approbation ?? 85;
    const upcomingEvents = kpis?.evenements_avenir ?? 12;
    const activeHalls = kpis?.salles_actives ?? 4;
    const totalDemandeurs = kpis?.demandeurs ?? 0;

    // Filter recent activities
    const filteredActivities = activite_recente.filter(item => {
        const matchesStatus = statusFilter === 'all' || item.statut === statusFilter;
        const matchesSearch = (item.demandeur || '').toLowerCase().includes(search.toLowerCase()) ||
                              (item.salle || '').toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const maxBarValue = Math.max(...par_mois.map(m => m.total), 1);

    const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <AdminLayout user={user}>
            <Head title="Tableau de Bord Ministériel - Lixus" />

            {/* Print Custom Stylesheet */}
            <style>{`
                @media print {
                    /* Hide Web Layout UI */
                    body * { visibility: hidden !important; }
                    #official-print-report, #official-print-report * { visibility: visible !important; }
                    #official-print-report { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; background: white !important; color: black !important; padding: 0 !important; margin: 0 !important; }
                    @page { size: A4; margin: 12mm; }
                }
            `}</style>

            {/* ── 1. WEB DISPLAY UI ───────────────────────────────────────── */}
            <div className="print:hidden">
                
                {/* Official Royal Header Banner - Admin Indigo Palette */}
                <div className="bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#4338ca] rounded-2xl p-6 mb-6 text-white border border-indigo-400/20 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* Official Ministry Logo */}
                        <div className="p-2 bg-white rounded-xl shadow-md flex-shrink-0">
                            <img 
                                src="/images/logo-official-clean.png" 
                                alt="Logo Officiel Ministère de la Culture" 
                                className="h-14 w-auto object-contain"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">ROYAUME DU MAROC</span>
                                <span className="text-indigo-300">•</span>
                                <span className="text-[10px] font-medium text-indigo-200 uppercase tracking-wider">MINISTÈRE DE LA CULTURE</span>
                            </div>
                            <h1 className="text-xl sm:text-2xl font-bold font-serif flex items-center gap-2 text-white mt-0.5">
                                Tableau de Bord Ministériel
                                <Icons.Crown />
                            </h1>
                            <p className="text-xs text-indigo-200/90 capitalize mt-1">{today}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Admin Indigo Button */}
                        <button 
                            onClick={() => window.print()}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 shadow-sm hover:border-white/40 transition-all active:scale-95"
                        >
                            <Icons.Printer />
                            <span>Imprimer le Rapport Officiel</span>
                        </button>
                    </div>
                </div>

                {/* Top Executive Stat Cards - Matching Admin Palette */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                    {/* Stat 1: Total Reservations */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Demandes de Réservation</span>
                            <div className="p-3 rounded-2xl bg-[#F4C150]/15 text-[#D97706]">
                                <Icons.ChartBar />
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-800 mb-1">{totalReservations}</div>
                            <div className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                                <span>100% dossiers enregistrés</span>
                            </div>
                        </div>
                    </div>

                    {/* Stat 2: Approval Rate */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Taux d'Approbation</span>
                            <div className="p-3 rounded-2xl bg-[#4B449A]/15 text-[#4B449A]">
                                <Icons.CheckCircle />
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-[#4B449A] mb-2">{approvalRate}%</div>
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                <div className="bg-[#4B449A] h-full rounded-full transition-all duration-1000" style={{ width: `${approvalRate}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Stat 3: Upcoming Events */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Événements au Programme</span>
                            <div className="p-3 rounded-2xl bg-[#F06A91]/15 text-[#F06A91]">
                                <Icons.Calendar />
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-800 mb-1">{upcomingEvents}</div>
                            <div className="text-xs font-medium text-[#F06A91]">Saison culturelle active</div>
                        </div>
                    </div>

                    {/* Stat 4: Salles Actives */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 flex flex-col justify-between hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Salles d'Exception</span>
                            <div className="p-3 rounded-2xl bg-[#D2C3EC]/30 text-[#6B21A8]">
                                <Icons.Building />
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-slate-800 mb-1">{activeHalls}</div>
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                <Icons.Users />
                                <span>{totalDemandeurs} associations partenaires</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive SVG Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Chart 1: Monthly Evolution */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-base font-bold text-slate-800">Évolution Mensuelle des Demandes</h2>
                                <p className="text-xs text-slate-500">Flux des réservations enregistrées au Centre Lixus</p>
                            </div>
                            <span className="text-xs font-semibold text-[#4f46e5] bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                                12 Derniers Mois
                            </span>
                        </div>

                        {/* Interactive Bar Chart SVG */}
                        <div className="flex-grow flex items-end justify-between gap-3 pt-8 pb-3 px-2 min-h-[220px]">
                            {par_mois.map((item, idx) => {
                                const heightPercent = Math.max(Math.round((item.total / maxBarValue) * 100), 12);
                                return (
                                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 pointer-events-none">
                                            {item.total} demande{item.total > 1 ? 's' : ''}
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-t-lg h-44 flex items-end p-1">
                                            <div 
                                                style={{ height: `${heightPercent}%` }}
                                                className="w-full bg-gradient-to-t from-[#4f46e5] to-[#6366f1] group-hover:from-amber-500 group-hover:to-amber-400 rounded-t-md transition-all duration-300 shadow-sm"
                                            />
                                        </div>
                                        <span className="text-[11px] font-semibold text-slate-600 truncate max-w-full">
                                            {item.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Chart 2: Status Breakdown */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 flex flex-col justify-between">
                        <div>
                            <h2 className="text-base font-bold text-slate-800 mb-1">Répartition par Statut</h2>
                            <p className="text-xs text-slate-500 mb-6">Traitement global des réservations</p>

                            <div className="space-y-4">
                                {repartition_statut.map((stat, i) => (
                                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stat.color }}></span>
                                                {stat.label}
                                            </span>
                                            <span className="text-xs font-bold text-slate-900">
                                                {stat.value} ({stat.percentage}%)
                                            </span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                            <div 
                                                className="h-full rounded-full transition-all duration-1000"
                                                style={{ width: `${stat.percentage}%`, backgroundColor: stat.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                            <span className="text-xs text-slate-400">
                                Supervision & Directives Ministérielles
                            </span>
                        </div>
                    </div>
                </div>

                {/* Table Header & Search Filters - Admin Style */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-base font-bold text-slate-800">Dernières Demandes de Réservation</h2>
                            <p className="text-xs text-slate-500">Suivi ministériel des dossiers déposés auprès du Centre Lixus</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                            {/* Search bar */}
                            <div className="relative flex-1 sm:w-64">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                    <Icons.Search />
                                </span>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Rechercher une association..."
                                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#4f46e5] transition-colors"
                                />
                            </div>

                            {/* Admin Status Filter Tabs */}
                            <div className="flex items-center bg-slate-100 p-1.5 rounded-xl text-xs border border-slate-200/80 gap-1">
                                <button
                                    onClick={() => setStatusFilter('all')}
                                    className={`px-3.5 py-1.5 rounded-lg transition-all ${statusFilter === 'all' ? 'bg-[#4f46e5] text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900 font-medium'}`}
                                >
                                    Toutes
                                </button>
                                <button
                                    onClick={() => setStatusFilter('approuvee')}
                                    className={`px-3.5 py-1.5 rounded-lg transition-all ${statusFilter === 'approuvee' ? 'bg-emerald-600 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900 font-medium'}`}
                                >
                                    Validées
                                </button>
                                <button
                                    onClick={() => setStatusFilter('en_attente')}
                                    className={`px-3.5 py-1.5 rounded-lg transition-all ${statusFilter === 'en_attente' ? 'bg-amber-500 text-white font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900 font-medium'}`}
                                >
                                    En attente
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] tracking-wider font-semibold border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-4">Date Dépôt</th>
                                    <th className="px-6 py-4">Association / Demandeur</th>
                                    <th className="px-6 py-4">Salle Réservée</th>
                                    <th className="px-6 py-4">Date Événement</th>
                                    <th className="px-6 py-4">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredActivities.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                            Aucune demande trouvée.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredActivities.map((r, i) => (
                                        <tr key={r.id || i} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="px-6 py-4 text-xs font-mono text-slate-500 whitespace-nowrap">
                                                {r.created_at}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900">{r.demandeur}</div>
                                                <div className="text-xs text-slate-500">{r.email}</div>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-[#4f46e5]">
                                                {r.salle}
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-600">
                                                <div>{r.date_activite}</div>
                                                <div className="text-[11px] text-slate-400">{r.heure}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${BADGE_STYLES[r.statut] || 'bg-slate-100 text-slate-600'}`}>
                                                    {BADGE_LABELS[r.statut] || r.statut}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="block md:hidden divide-y divide-slate-100 p-4">
                        {filteredActivities.length === 0 ? (
                            <p className="text-center py-6 text-slate-400 text-xs">Aucune demande trouvée.</p>
                        ) : (
                            filteredActivities.map((r, i) => (
                                <div key={r.id || i} className="py-4 first:pt-0 last:pb-0 flex flex-col gap-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-slate-900 text-sm">{r.demandeur}</h3>
                                            <p className="text-xs text-[#4f46e5] font-medium">{r.salle}</p>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${BADGE_STYLES[r.statut] || 'bg-slate-100 text-slate-600'}`}>
                                            {BADGE_LABELS[r.statut] || r.statut}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
                                        <span>🗓️ {r.date_activite}</span>
                                        <span className="font-mono text-[11px]">Dépôt: {r.created_at}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* ── 2. FORMAL OFFICIAL MINISTERIAL PRINT REPORT (PRINT ONLY) ────── */}
            <div id="official-print-report" className="hidden print:block text-black font-serif p-4">
                {/* Official Kingdom Header */}
                <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
                    <div className="flex items-center gap-4">
                        <img src="/images/logo-official-clean.png" alt="Logo Officiel" className="h-20 w-auto" />
                        <div>
                            <h1 className="text-base font-bold uppercase tracking-wide">ROYAUME DU MAROC</h1>
                            <h2 className="text-sm font-semibold uppercase text-slate-800">MINISTÈRE DE LA CULTURE</h2>
                            <h3 className="text-xs text-slate-600 uppercase">DIRECTION DU CENTRE CULTUREL LIXUS DE LARACHE</h3>
                        </div>
                    </div>
                    <div className="text-right text-xs">
                        <p className="font-bold">DOCUMENT OFFICIEL</p>
                        <p className="text-slate-600">Réf: MIN/LIX/{new Date().getFullYear()}/AUDIT</p>
                        <p className="text-slate-600">Date: {today}</p>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center my-6">
                    <h2 className="text-xl font-bold uppercase tracking-wider underline">
                        RAPPORT DE SYNTHÈSE ET AUDIT MINISTÉRIEL
                    </h2>
                    <p className="text-xs text-slate-700 mt-1">Supervision de l'utilisation des salles et de la programmation culturelle</p>
                </div>

                {/* Section 1: KPI Audit Table */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold uppercase mb-2 border-b border-black pb-1">1. Indicateurs Globaux de Performance (KPIs)</h3>
                    <table className="w-full text-xs border border-black border-collapse text-left">
                        <thead>
                            <tr className="bg-slate-200 border-b border-black">
                                <th className="p-2 border-r border-black">Total Demandes</th>
                                <th className="p-2 border-r border-black">Demandes Validées</th>
                                <th className="p-2 border-r border-black">Demandes En Attente</th>
                                <th className="p-2 border-r border-black">Demandes Refusées</th>
                                <th className="p-2 border-r border-black">Taux d'Approbation</th>
                                <th className="p-2">Salles Actives</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-2 border-r border-black font-bold">{totalReservations}</td>
                                <td className="p-2 border-r border-black">{kpis?.approuvees ?? 0}</td>
                                <td className="p-2 border-r border-black">{kpis?.en_attente ?? 0}</td>
                                <td className="p-2 border-r border-black">{kpis?.rejetees ?? 0}</td>
                                <td className="p-2 border-r border-black font-bold">{approvalRate}%</td>
                                <td className="p-2">{activeHalls}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Section 2: Monthly Breakdown */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold uppercase mb-2 border-b border-black pb-1">2. Ventilation Mensuelle de la Fréquentation</h3>
                    <table className="w-full text-xs border border-black border-collapse text-left">
                        <thead>
                            <tr className="bg-slate-200 border-b border-black">
                                {par_mois.map((m, idx) => (
                                    <th key={idx} className="p-1.5 border-r border-black text-center">{m.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {par_mois.map((m, idx) => (
                                    <td key={idx} className="p-1.5 border-r border-black text-center font-bold">{m.total}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Section 3: Detailed Reservations Registry */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase mb-2 border-b border-black pb-1">3. Registre Officiel des Demandes de Réservation</h3>
                    <table className="w-full text-xs border border-black border-collapse text-left">
                        <thead>
                            <tr className="bg-slate-200 border-b border-black">
                                <th className="p-2 border-r border-black">N°</th>
                                <th className="p-2 border-r border-black">Date Dépôt</th>
                                <th className="p-2 border-r border-black">Demandeur / Association</th>
                                <th className="p-2 border-r border-black">Contact Email</th>
                                <th className="p-2 border-r border-black">Salle</th>
                                <th className="p-2 border-r border-black">Date Activité</th>
                                <th className="p-2">Statut Officiel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activite_recente.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-4 text-center">Aucune réservation trouvée.</td>
                                </tr>
                            ) : (
                                activite_recente.map((r, idx) => (
                                    <tr key={idx} className="border-b border-slate-300">
                                        <td className="p-2 border-r border-black font-mono">{idx + 1}</td>
                                        <td className="p-2 border-r border-black font-mono">{r.created_at}</td>
                                        <td className="p-2 border-r border-black font-bold">{r.demandeur}</td>
                                        <td className="p-2 border-r border-black">{r.email}</td>
                                        <td className="p-2 border-r border-black">{r.salle}</td>
                                        <td className="p-2 border-r border-black">{r.date_activite} ({r.heure})</td>
                                        <td className="p-2 font-bold uppercase">{BADGE_LABELS[r.statut] || r.statut}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Official Signature & Validation Block */}
                <div className="flex justify-between items-start mt-12 pt-4 border-t border-black text-xs">
                    <div>
                        <p className="font-bold">Centre Culturel Lixus Larache</p>
                        <p className="text-slate-600">Service du Suivi et de la Programmation</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold">Pour Monsieur le Ministre de la Culture,</p>
                        <p className="text-slate-600 italic mt-1">Le Directeur du Centre Culturel Lixus</p>
                        <div className="mt-8 border-b border-dotted border-black w-48 ml-auto"></div>
                        <p className="text-[10px] text-slate-500 mt-1">(Signature et Cachet Officiel)</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

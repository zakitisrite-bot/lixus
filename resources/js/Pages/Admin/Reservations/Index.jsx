import React, { useState, useMemo } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ auth, reservations = [], salles = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // ── Modal statut (Approuver / Refuser) ──────────────────────────────
    const [modalConfig, setModalConfig] = useState({
        isOpen: false, action: null, reservationId: null, motif: ''
    });

    // ── Modal Édition ──────────────────────────────────────────────────
    const [editModal, setEditModal] = useState({
        isOpen: false, reservation: null,
        form: { salle_id: '', date_activite: '', heure_debut: '', heure_fin: '', description_activite: '', nom_association: '' }
    });

    // ── Modal Suppression ──────────────────────────────────────────────
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, reservationId: null });

    // ── Handlers statut ────────────────────────────────────────────────
    const openModal      = (id, action) => setModalConfig({ isOpen: true, action, reservationId: id, motif: '' });
    const closeModal     = () => setModalConfig(m => ({ ...m, isOpen: false }));
    const confirmAction  = () => {
        router.patch(route('admin.reservations.updateStatus', modalConfig.reservationId),
            { statut: modalConfig.action, motif: modalConfig.motif },
            { onSuccess: closeModal }
        );
    };

    // ── Handlers édition ───────────────────────────────────────────────
    const openEdit = (r) => setEditModal({
        isOpen: true, reservation: r,
        form: {
            salle_id:             r.salle_id ?? '',
            date_activite:        r.date_activite ?? '',
            heure_debut:          r.heure_debut   ?? '',
            heure_fin:            r.heure_fin     ?? '',
            description_activite: r.description_activite ?? '',
            nom_association:      r.nom_association ?? '',
        }
    });
    const closeEdit    = () => setEditModal(m => ({ ...m, isOpen: false }));
    const handleEdit   = (k, v) => setEditModal(m => ({ ...m, form: { ...m.form, [k]: v } }));
    const submitEdit   = () => {
        router.put(route('admin.reservations.update', editModal.reservation.id), editModal.form, {
            onSuccess: closeEdit
        });
    };

    // ── Handlers suppression ───────────────────────────────────────────
    const openDelete   = (id) => setDeleteModal({ isOpen: false, reservationId: id });
    const closeDelete  = () => setDeleteModal({ isOpen: false, reservationId: null });
    const confirmDelete = () => {
        router.delete(route('admin.reservations.destroy', deleteModal.reservationId), {
            onSuccess: closeDelete
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approuvee': return <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Approuvée</span>;
            case 'rejetee':   return <span className="px-2.5 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">Refusée</span>;
            default:          return <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-semibold rounded-full">En attente</span>;
        }
    };

    const filteredReservations = useMemo(() => {
        return reservations.filter(r => {
            const matchesSearch = 
                (r.nom_association || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (r.email_contact || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (r.salle?.nom_salle || '').toLowerCase().includes(searchQuery.toLowerCase());
            
            if (statusFilter === 'all') return matchesSearch;
            return matchesSearch && r.statut === statusFilter;
        });
    }, [reservations, searchQuery, statusFilter]);

    const counts = useMemo(() => ({
        all: reservations.length,
        en_attente: reservations.filter(r => r.statut === 'en_attente').length,
        approuvee: reservations.filter(r => r.statut === 'approuvee').length,
        rejetee: reservations.filter(r => r.statut === 'rejetee').length,
    }), [reservations]);

    const inputCls = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white";
    const labelCls = "block text-xs font-semibold text-slate-600 mb-1";

    return (
        <AdminLayout user={auth.user}>
            <Head title="Gestion des Réservations - LIXUS ADMIN" />

            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Gestion des Réservations</h1>
                    <p className="text-slate-500 mt-1 text-xs sm:text-sm">Gérez les demandes de réservation des salles du Centre Culturel.</p>
                </div>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                    <button
                        onClick={() => setStatusFilter('all')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                            statusFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        Toutes <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">{counts.all}</span>
                    </button>
                    <button
                        onClick={() => setStatusFilter('en_attente')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                            statusFilter === 'en_attente' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                        }`}
                    >
                        En attente <span className="px-1.5 py-0.5 rounded-full bg-black/10 text-[10px]">{counts.en_attente}</span>
                    </button>
                    <button
                        onClick={() => setStatusFilter('approuvee')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                            statusFilter === 'approuvee' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                    >
                        Approuvées <span className="px-1.5 py-0.5 rounded-full bg-black/10 text-[10px]">{counts.approuvee}</span>
                    </button>
                    <button
                        onClick={() => setStatusFilter('rejetee')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                            statusFilter === 'rejetee' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                    >
                        Refusées <span className="px-1.5 py-0.5 rounded-full bg-black/10 text-[10px]">{counts.rejetee}</span>
                    </button>
                </div>

                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                                <th className="px-6 py-4 font-medium">Demandeur</th>
                                <th className="px-6 py-4 font-medium">Salle &amp; Événement</th>
                                <th className="px-6 py-4 font-medium">Date &amp; Horaires</th>
                                <th className="px-6 py-4 font-medium">Statut</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredReservations.length === 0 ? (
                                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-500 text-sm">Aucune réservation ne correspond à vos critères.</td></tr>
                            ) : (
                                filteredReservations.map((r) => (
                                    <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-900">{r.nom_association}</div>
                                            <div className="text-xs text-slate-500 mt-1">CIN: {r.cin_responsable}</div>
                                            <div className="text-xs text-slate-500 mt-1">
                                                <a href={`mailto:${r.email_contact}`} className="text-blue-600 hover:underline">{r.email_contact}</a>
                                            </div>
                                            {r.telephone && <div className="text-xs text-slate-500 mt-1">📞 {r.telephone}</div>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-indigo-600">{r.salle?.nom_salle || 'Salle inconnue'}</div>
                                            <div className="text-sm text-slate-500 max-w-xs truncate" title={r.description_activite}>{r.description_activite}</div>
                                            {r.fichiers_legaux && (
                                                <a href={`/storage/${r.fichiers_legaux}`} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline mt-1 inline-block">
                                                    📄 Voir document légal
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            <div className="font-medium">{new Date(r.date_activite).toLocaleDateString('fr-FR')}</div>
                                            <div className="text-slate-500">{r.heure_debut} - {r.heure_fin}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(r.statut)}
                                            {r.motif && (
                                                <div className={`text-xs mt-2 italic max-w-[200px] ${r.statut === 'rejetee' ? 'text-red-600' : 'text-green-600'}`}>
                                                    "{r.motif}"
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 flex-wrap">
                                                {r.statut === 'en_attente' && (
                                                    <>
                                                        <button onClick={() => openModal(r.id, 'approuvee')}
                                                            className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded shadow-sm transition-colors">
                                                            ✓ Accepter
                                                        </button>
                                                        <button onClick={() => openModal(r.id, 'rejetee')}
                                                            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded shadow-sm transition-colors">
                                                            ✕ Refuser
                                                        </button>
                                                    </>
                                                )}
                                                <button onClick={() => openEdit(r)}
                                                    title="Modifier"
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors border border-blue-200">
                                                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                    </svg>
                                                </button>
                                                <button onClick={() => openDelete(r.id)}
                                                    title="Supprimer"
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-200">
                                                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Cards View */}
            <div className="block md:hidden space-y-4">
                {filteredReservations.length === 0 ? (
                    <div className="bg-white rounded-xl p-6 text-center text-slate-500 text-sm border border-slate-200">
                        Aucune réservation trouvée.
                    </div>
                ) : (
                    filteredReservations.map((r) => (
                        <div key={r.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-base">{r.nom_association}</h3>
                                    <p className="text-xs text-slate-500">CIN: {r.cin_responsable}</p>
                                </div>
                                {getStatusBadge(r.statut)}
                            </div>

                            <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1">
                                <div><strong className="text-slate-700">Salle :</strong> <span className="text-indigo-600 font-semibold">{r.salle?.nom_salle || 'N/A'}</span></div>
                                <div><strong className="text-slate-700">Date :</strong> {new Date(r.date_activite).toLocaleDateString('fr-FR')} ({r.heure_debut} - {r.heure_fin})</div>
                                {r.description_activite && <div><strong className="text-slate-700">Programme :</strong> {r.description_activite}</div>}
                                {r.email_contact && <div><strong className="text-slate-700">Email :</strong> <a href={`mailto:${r.email_contact}`} className="text-blue-600">{r.email_contact}</a></div>}
                                {r.telephone && <div><strong className="text-slate-700">Tél :</strong> {r.telephone}</div>}
                                {r.fichiers_legaux && (
                                    <div className="pt-1">
                                        <a href={`/storage/${r.fichiers_legaux}`} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold underline">
                                            📄 Document légal (PDF)
                                        </a>
                                    </div>
                                )}
                            </div>

                            {r.motif && (
                                <div className="text-xs italic bg-slate-100 p-2 rounded text-slate-600">
                                    "{r.motif}"
                                </div>
                            )}

                            {/* Mobile Action Buttons */}
                            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                                {r.statut === 'en_attente' ? (
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => openModal(r.id, 'approuvee')} className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded">
                                            ✓ Accepter
                                        </button>
                                        <button onClick={() => openModal(r.id, 'rejetee')} className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded">
                                            ✕ Refuser
                                        </button>
                                    </div>
                                ) : (
                                    <div />
                                )}

                                <div className="flex items-center gap-2">
                                    <button onClick={() => openEdit(r)} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded border border-blue-200">
                                        Modifier
                                    </button>
                                    <button onClick={() => openDelete(r.id)} className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded border border-red-200">
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal Approuver / Refuser */}
            {modalConfig.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeModal} />
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative z-10 mx-3">
                        <div className={`p-5 sm:p-6 border-b border-slate-100 flex items-center gap-4 ${modalConfig.action === 'approuvee' ? 'bg-emerald-50' : 'bg-red-50'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${modalConfig.action === 'approuvee' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                {modalConfig.action === 'approuvee'
                                    ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                }
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900">
                                {modalConfig.action === 'approuvee' ? 'Approuver la réservation' : 'Refuser la réservation'}
                            </h3>
                        </div>
                        <div className="p-5 sm:p-6">
                            <p className="text-slate-600 text-xs sm:text-sm mb-3">
                                {modalConfig.action === 'approuvee'
                                    ? "Êtes-vous sûr de vouloir approuver cette réservation ? Remarque optionnelle :"
                                    : "Motif de refus obligatoire :"}
                            </p>
                            <textarea autoFocus value={modalConfig.motif}
                                onChange={e => setModalConfig({ ...modalConfig, motif: e.target.value })}
                                className={inputCls} rows="3"
                                placeholder={modalConfig.action === 'approuvee' ? "Ex: Veuillez apporter les originaux..." : "Ex: Conflit d'horaire..."}
                            />
                        </div>
                        <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                            <button onClick={closeModal} className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800">Annuler</button>
                            <button onClick={confirmAction}
                                className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white rounded-lg shadow-sm ${modalConfig.action === 'approuvee' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-600 hover:bg-red-700'}`}>
                                {modalConfig.action === 'approuvee' ? 'Oui, approuver' : 'Confirmer le refus'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Édition */}
            {editModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeEdit} />
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden relative z-10 mx-3">
                        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center gap-4 bg-blue-50">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-slate-900">Modifier la réservation</h3>
                                <p className="text-xs text-slate-500">#{editModal.reservation?.id} — {editModal.reservation?.nom_association}</p>
                            </div>
                        </div>
                        <div className="p-5 sm:p-6 space-y-4 max-h-[65vh] overflow-y-auto">
                            <div>
                                <label className={labelCls}>Association / Demandeur</label>
                                <input type="text" className={inputCls} value={editModal.form.nom_association}
                                    onChange={e => handleEdit('nom_association', e.target.value)} />
                            </div>
                            <div>
                                <label className={labelCls}>Salle</label>
                                <select className={inputCls} value={editModal.form.salle_id}
                                    onChange={e => handleEdit('salle_id', e.target.value)}>
                                    <option value="">-- Choisir une salle --</option>
                                    {salles.map(s => (
                                        <option key={s.id} value={s.id}>{s.nom_salle}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className={labelCls}>Date de l'activité</label>
                                <input type="date" lang="fr-FR" className={inputCls} value={editModal.form.date_activite}
                                    onChange={e => handleEdit('date_activite', e.target.value)} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className={labelCls}>Heure début</label>
                                    <input type="time" lang="fr-FR" step="60" className={inputCls} value={editModal.form.heure_debut}
                                        onChange={e => handleEdit('heure_debut', e.target.value)} />
                                </div>
                                <div>
                                    <label className={labelCls}>Heure fin</label>
                                    <input type="time" lang="fr-FR" step="60" className={inputCls} value={editModal.form.heure_fin}
                                        onChange={e => handleEdit('heure_fin', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className={labelCls}>Programme / Description</label>
                                <textarea className={inputCls} rows="3" value={editModal.form.description_activite}
                                    onChange={e => handleEdit('description_activite', e.target.value)} />
                            </div>
                        </div>
                        <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                            <button onClick={closeEdit} className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800">Annuler</button>
                            <button onClick={submitEdit} className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm">
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Suppression */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeDelete} />
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative z-10 mx-3">
                        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center gap-4 bg-red-50">
                            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900">Supprimer la réservation</h3>
                        </div>
                        <div className="p-5 sm:p-6">
                            <p className="text-slate-600 text-xs sm:text-sm">Êtes-vous sûr de vouloir supprimer définitivement cette demande de réservation ? Cette action est irréversible.</p>
                        </div>
                        <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                            <button onClick={closeDelete} className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-800">Annuler</button>
                            <button onClick={confirmDelete} className="px-5 py-2 text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm">
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

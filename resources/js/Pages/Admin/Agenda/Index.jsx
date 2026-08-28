import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import DeleteConfirmModal from '@/Components/DeleteConfirmModal';

export default function Index({ agendas = [] }) {
    const { auth } = usePage().props;
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDelete = () => {
        if (itemToDelete) {
            router.delete(route('admin.agendas.destroy', itemToDelete.id), {
                preserveScroll: true,
                onSuccess: () => setItemToDelete(null),
            });
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Gestion de l'Agenda - LIXUS ADMIN" />

            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Gestion de l'Agenda</h1>
                    <p className="text-slate-500 mt-1 text-xs sm:text-sm">Gérez les événements du site.</p>
                </div>
                <Link 
                    href={route('admin.agendas.create')}
                    className="w-full sm:w-auto justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm flex items-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Ajouter un événement
                </Link>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                                <th className="px-6 py-4 font-medium">Événement</th>
                                <th className="px-6 py-4 font-medium">Catégorie</th>
                                <th className="px-6 py-4 font-medium">Date &amp; Heure</th>
                                <th className="px-6 py-4 font-medium">Lieu</th>
                                <th className="px-6 py-4 font-medium">Statut</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {agendas.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-slate-500 text-sm">
                                        Aucun événement trouvé.
                                    </td>
                                </tr>
                            ) : agendas.map((agenda) => (
                                <tr key={agenda.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {agenda.image && (
                                                <img src={agenda.image} alt="" className="w-10 h-10 rounded object-cover mr-3 flex-shrink-0" />
                                            )}
                                            <span className="font-semibold text-slate-900">{agenda.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{agenda.category}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {agenda.event_date} {agenda.event_time ? `à ${agenda.event_time.substring(0, 5)}` : ''}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{agenda.location || '-'}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                            ${agenda.status === 'Publié' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}
                                        `}>
                                            {agenda.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                                        <Link href={route('admin.agendas.edit', agenda.id)} className="text-blue-600 hover:text-blue-900 font-semibold">Éditer</Link>
                                        <button 
                                            type="button" 
                                            className="text-red-600 hover:text-red-900 font-semibold"
                                            onClick={() => setItemToDelete(agenda)}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Cards View */}
            <div className="block md:hidden space-y-4">
                {agendas.length === 0 ? (
                    <div className="bg-white rounded-xl p-6 text-center text-slate-500 text-sm border border-slate-200">
                        Aucun événement trouvé.
                    </div>
                ) : (
                    agendas.map((agenda) => (
                        <div key={agenda.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                            <div className="flex items-start gap-3">
                                {agenda.image && (
                                    <img src={agenda.image} alt="" className="w-14 h-14 rounded-lg object-cover border border-slate-200 flex-shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-900 text-base line-clamp-1">{agenda.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-slate-500">{agenda.category}</span>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${agenda.status === 'Publié' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                            {agenda.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-2.5 rounded-lg text-xs space-y-1">
                                <div><strong className="text-slate-700">Date :</strong> {agenda.event_date} {agenda.event_time ? `à ${agenda.event_time.substring(0, 5)}` : ''}</div>
                                {agenda.location && <div><strong className="text-slate-700">Lieu :</strong> {agenda.location}</div>}
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                                <Link href={route('admin.agendas.edit', agenda.id)} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded border border-blue-200">
                                    Éditer
                                </Link>
                                <button 
                                    type="button" 
                                    className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded border border-red-200"
                                    onClick={() => setItemToDelete(agenda)}
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <DeleteConfirmModal 
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={handleDelete}
                title="Supprimer l'événement"
                message={`Êtes-vous sûr de vouloir supprimer "${itemToDelete?.title}" ?`}
            />
        </AdminLayout>
    );
}

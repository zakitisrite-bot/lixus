import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import DeleteConfirmModal from '@/Components/DeleteConfirmModal';

export default function Index({ salles = [] }) {
    const { auth } = usePage().props;
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDelete = () => {
        if (itemToDelete) {
            router.delete(route('admin.salles.destroy', itemToDelete.id), {
                preserveScroll: true,
                onSuccess: () => setItemToDelete(null),
            });
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Gestion des Salles - LIXUS ADMIN" />

            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Gestion des Salles</h1>
                    <p className="text-slate-500 mt-1 text-xs sm:text-sm">Gérez les différents espaces du Centre Culturel.</p>
                </div>
                <Link
                    href={route('admin.salles.create')}
                    className="w-full sm:w-auto justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm flex items-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Ajouter une salle
                </Link>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                                <th className="px-6 py-4 font-medium">Salle</th>
                                <th className="px-6 py-4 font-medium">Description</th>
                                <th className="px-6 py-4 font-medium">Capacité</th>
                                <th className="px-6 py-4 font-medium">Équipements</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {salles.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500 text-sm">
                                        Aucune salle trouvée. <Link href={route('admin.salles.create')} className="text-indigo-600 hover:underline">Créer la première</Link>
                                    </td>
                                </tr>
                            ) : salles.map((salle) => (
                                <tr key={salle.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {salle.image ? (
                                                <img src={salle.image} alt={salle.nom_salle} className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                                            ) : (
                                                <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                                                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" /></svg>
                                                </div>
                                            )}
                                            <span className="font-semibold text-slate-900">{salle.nom_salle}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500 max-w-xs">
                                        <p className="line-clamp-2">{salle.description || <em>Aucune description</em>}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                            {salle.capacite} pers.
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {Array.isArray(salle.equipements) && salle.equipements.length > 0
                                            ? salle.equipements.slice(0, 2).join(', ') + (salle.equipements.length > 2 ? ` +${salle.equipements.length - 2}` : '')
                                            : <em className="text-slate-300">Aucun</em>
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                                        <Link href={route('admin.salles.edit', salle.id)} className="text-blue-600 hover:text-blue-900 font-semibold">Éditer</Link>
                                        <button
                                            type="button"
                                            onClick={() => setItemToDelete(salle)}
                                            className="text-red-600 hover:text-red-900 font-semibold"
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
                {salles.length === 0 ? (
                    <div className="bg-white rounded-xl p-6 text-center text-slate-500 text-sm border border-slate-200">
                        Aucune salle trouvée.
                    </div>
                ) : (
                    salles.map((salle) => (
                        <div key={salle.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                {salle.image ? (
                                    <img src={salle.image} alt={salle.nom_salle} className="w-14 h-14 rounded-lg object-cover border border-slate-200 flex-shrink-0" />
                                ) : (
                                    <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200 flex-shrink-0">
                                        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" /></svg>
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-bold text-slate-900 text-base">{salle.nom_salle}</h3>
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold mt-1">
                                        Capacité: {salle.capacite} pers.
                                    </span>
                                </div>
                            </div>

                            {salle.description && (
                                <p className="text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                    {salle.description}
                                </p>
                            )}

                            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                                <Link href={route('admin.salles.edit', salle.id)} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded border border-blue-200">
                                    Éditer
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setItemToDelete(salle)}
                                    className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded border border-red-200"
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
                title="Supprimer la salle"
                message={`Êtes-vous sûr de vouloir supprimer "${itemToDelete?.nom_salle}" ? Cette action est irréversible.`}
            />
        </AdminLayout>
    );
}

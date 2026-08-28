import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import DeleteConfirmModal from '@/Components/DeleteConfirmModal';

export default function Index({ galeries }) {
    const { auth } = usePage().props;
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDelete = () => {
        if (itemToDelete) {
            router.delete(route('admin.galeries.destroy', itemToDelete.id), {
                preserveScroll: true,
                onSuccess: () => setItemToDelete(null),
            });
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Gestion de la Galerie - LIXUS ADMIN" />

            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Galerie Multimédia</h1>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">Gérez les images et médias de la galerie publique.</p>
                </div>
                <Link 
                    href={route('admin.galeries.create')} 
                    className="w-full sm:w-auto justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm transition-colors flex items-center gap-2 text-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Ajouter une image
                </Link>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="p-4">Image</th>
                                <th className="p-4">Titre</th>
                                <th className="p-4">Catégorie</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Statut</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {galeries.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500 text-sm">
                                        Aucune image dans la galerie. Commencez par en ajouter une.
                                    </td>
                                </tr>
                            ) : galeries.map((galerie) => (
                                <tr key={galerie.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="p-4">
                                        <div className="relative h-16 w-24 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                                            {galerie.media && galerie.media.length > 0 ? (
                                                <>
                                                    {galerie.media[0].type === 'video' ? (
                                                        <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white text-xs">Vidéo</div>
                                                    ) : (
                                                        <img src={galerie.media[0].url.startsWith('http') ? galerie.media[0].url : galerie.media[0].url} alt={galerie.title} className="h-full w-full object-cover" />
                                                    )}
                                                    {galerie.media.length > 1 && (
                                                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                                                            +{galerie.media.length - 1}
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Vide</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 font-semibold text-slate-900">{galerie.title}</td>
                                    <td className="p-4 text-sm text-slate-500">{galerie.category}</td>
                                    <td className="p-4 text-sm text-slate-500">
                                        {new Date(galerie.created_at).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            galerie.status === 'Publié' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                                        }`}>
                                            {galerie.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-3">
                                        <Link 
                                            href={route('admin.galeries.edit', galerie.id)} 
                                            className="text-indigo-600 hover:text-indigo-900 font-semibold text-sm transition-colors"
                                        >
                                            Éditer
                                        </Link>
                                        <button 
                                            type="button"
                                            className="text-red-600 hover:text-red-900 font-semibold text-sm transition-colors"
                                            onClick={() => setItemToDelete(galerie)}
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
                {galeries.length === 0 ? (
                    <div className="bg-white rounded-xl p-6 text-center text-slate-500 text-sm border border-slate-200">
                        Aucune image dans la galerie.
                    </div>
                ) : (
                    galeries.map((galerie) => (
                        <div key={galerie.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                            <div className="flex items-start gap-3">
                                <div className="relative h-16 w-24 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                                    {galerie.media && galerie.media.length > 0 ? (
                                        <>
                                            {galerie.media[0].type === 'video' ? (
                                                <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white text-xs">Vidéo</div>
                                            ) : (
                                                <img src={galerie.media[0].url.startsWith('http') ? galerie.media[0].url : galerie.media[0].url} alt={galerie.title} className="h-full w-full object-cover" />
                                            )}
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Vide</div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-900 text-base line-clamp-1">{galerie.title}</h3>
                                    <p className="text-xs text-slate-500 mt-0.5">{galerie.category}</p>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold mt-1 ${galerie.status === 'Publié' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                        {galerie.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                                <Link 
                                    href={route('admin.galeries.edit', galerie.id)} 
                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded border border-blue-200"
                                >
                                    Éditer
                                </Link>
                                <button 
                                    type="button"
                                    className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded border border-red-200"
                                    onClick={() => setItemToDelete(galerie)}
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
                title="Supprimer l'élément"
                message={`Êtes-vous sûr de vouloir supprimer "${itemToDelete?.title}" ? Cette action est irréversible.`}
            />
        </AdminLayout>
    );
}

import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import DeleteConfirmModal from '@/Components/DeleteConfirmModal';

export default function Index({ actualites }) {
    const { auth } = usePage().props;
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDelete = () => {
        if (itemToDelete) {
            router.delete(route('admin.actualites.destroy', itemToDelete.id), {
                preserveScroll: true,
                onSuccess: () => setItemToDelete(null),
            });
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Gestion des Actualités - LIXUS ADMIN" />

            <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Gestion des Actualités</h1>
                    <p className="text-slate-500 mt-1 text-xs sm:text-sm">Gérez toutes les publications du site.</p>
                </div>
                <Link 
                    href={route('admin.actualites.create')}
                    className="w-full sm:w-auto justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm flex items-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Ajouter une actualité
                </Link>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                                <th className="px-6 py-4 font-medium">Titre</th>
                                <th className="px-6 py-4 font-medium">Catégorie</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Statut</th>
                                <th className="px-6 py-4 font-medium">À la une</th>
                                <th className="px-6 py-4 font-medium">Accueil</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {actualites.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-slate-500 text-sm">
                                        Aucune actualité trouvée.
                                    </td>
                                </tr>
                            ) : actualites.map((actu) => (
                                <tr key={actu.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {actu.images && actu.images.length > 0 && (
                                                actu.images[0].match(/\.(mp4|webm|ogg)$/i) ? (
                                                    <video src={actu.images[0].startsWith('http') ? actu.images[0] : `/storage/${actu.images[0].replace('/storage/', '')}`} className="w-10 h-10 rounded object-cover mr-3 flex-shrink-0" muted loop playsInline></video>
                                                ) : (
                                                    <img src={actu.images[0].startsWith('http') ? actu.images[0] : `/storage/${actu.images[0].replace('/storage/', '')}`} alt="" className="w-10 h-10 rounded object-cover mr-3 flex-shrink-0" />
                                                )
                                            )}
                                            <span className="font-semibold text-slate-900">{actu.title}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{actu.category}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{actu.publication_date || '-'}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                            ${actu.status === 'Publié' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}
                                        `}>
                                            {actu.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button 
                                            type="button" 
                                            onClick={() => router.patch(route('admin.actualites.feature', actu.id), {}, { preserveScroll: true })}
                                            className={`p-2 rounded-full transition-colors ${actu.is_featured ? 'text-amber-500 hover:text-amber-600 bg-amber-50' : 'text-slate-300 hover:text-amber-500'}`}
                                            title="Mettre à la une"
                                        >
                                            <svg className="w-6 h-6" fill={actu.is_featured ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button 
                                            type="button" 
                                            onClick={() => router.patch(route('admin.actualites.toggleHome', actu.id), {}, { preserveScroll: true })}
                                            className={`p-2 rounded-full transition-colors ${actu.show_on_home ? 'text-blue-500 hover:text-blue-600 bg-blue-50' : 'text-slate-300 hover:text-blue-500'}`}
                                            title="Afficher sur l'accueil"
                                        >
                                            <svg className="w-6 h-6" fill={actu.show_on_home ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                                        <Link href={route('admin.actualites.edit', actu.id)} className="text-blue-600 hover:text-blue-900 font-semibold">Éditer</Link>
                                        <button 
                                            type="button" 
                                            className="text-red-600 hover:text-red-900 font-semibold"
                                            onClick={() => setItemToDelete(actu)}
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
                {actualites.length === 0 ? (
                    <div className="bg-white rounded-xl p-6 text-center text-slate-500 text-sm border border-slate-200">
                        Aucune actualité trouvée.
                    </div>
                ) : (
                    actualites.map((actu) => (
                        <div key={actu.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                            <div className="flex items-start gap-3">
                                {actu.images && actu.images.length > 0 && (
                                    actu.images[0].match(/\.(mp4|webm|ogg)$/i) ? (
                                        <video src={actu.images[0].startsWith('http') ? actu.images[0] : `/storage/${actu.images[0].replace('/storage/', '')}`} className="w-14 h-14 rounded-lg object-cover border border-slate-200 flex-shrink-0" muted loop playsInline></video>
                                    ) : (
                                        <img src={actu.images[0].startsWith('http') ? actu.images[0] : `/storage/${actu.images[0].replace('/storage/', '')}`} alt="" className="w-14 h-14 rounded-lg object-cover border border-slate-200 flex-shrink-0" />
                                    )
                                )}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-900 text-base line-clamp-1">{actu.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-slate-500">{actu.category}</span>
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${actu.status === 'Publié' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                            {actu.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg text-xs">
                                <span className="text-slate-600">Date: <strong>{actu.publication_date || '-'}</strong></span>
                                <div className="flex items-center gap-2">
                                    <button 
                                        type="button" 
                                        onClick={() => router.patch(route('admin.actualites.feature', actu.id), {}, { preserveScroll: true })}
                                        className={`p-1.5 rounded-md text-xs font-semibold ${actu.is_featured ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-600'}`}
                                    >
                                        {actu.is_featured ? '★ À la une' : '☆ À la une'}
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => router.patch(route('admin.actualites.toggleHome', actu.id), {}, { preserveScroll: true })}
                                        className={`p-1.5 rounded-md text-xs font-semibold ${actu.show_on_home ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-600'}`}
                                    >
                                        {actu.show_on_home ? '🏠 Accueil' : '🏠 Caché'}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                                <Link href={route('admin.actualites.edit', actu.id)} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded border border-blue-200">
                                    Éditer
                                </Link>
                                <button 
                                    type="button" 
                                    className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded border border-red-200"
                                    onClick={() => setItemToDelete(actu)}
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
                title="Supprimer l'actualité"
                message={`Êtes-vous sûr de vouloir supprimer "${itemToDelete?.title}" ? Cette action est irréversible.`}
            />
        </AdminLayout>
    );
}

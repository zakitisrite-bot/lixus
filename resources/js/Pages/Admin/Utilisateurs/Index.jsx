import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import DeleteConfirmModal from '@/Components/DeleteConfirmModal';

export default function Index({ utilisateurs = [] }) {
    const { auth } = usePage().props;
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDelete = () => {
        if (itemToDelete) {
            router.delete(route('admin.utilisateurs.destroy', itemToDelete.id), {
                preserveScroll: true,
                onSuccess: () => setItemToDelete(null),
            });
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Gestion des Utilisateurs - LIXUS ADMIN" />

            <div className="mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Gestion des Utilisateurs</h1>
                <p className="text-slate-500 mt-1 text-xs sm:text-sm">Gérez les comptes demandeurs et administrateurs du système.</p>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                                <th className="px-6 py-4 font-medium">Nom / Association</th>
                                <th className="px-6 py-4 font-medium">Contact</th>
                                <th className="px-6 py-4 font-medium">Rôle</th>
                                <th className="px-6 py-4 font-medium">Inscription</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {utilisateurs.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500 text-sm">
                                        Aucun utilisateur trouvé.
                                    </td>
                                </tr>
                            ) : utilisateurs.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900">{user.name}</span>
                                            {user.nom_association && (
                                                <span className="text-xs text-slate-500">Assoc: {user.nom_association}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col text-sm text-slate-600">
                                            <span>{user.email}</span>
                                            {user.telephone && <span className="text-xs text-slate-400">{user.telephone}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
                                            ${user.role === 'admin' ? 'bg-red-100 text-red-800 border border-red-200' : ''}
                                            ${user.role === 'demandeur' ? 'bg-blue-100 text-blue-800 border border-blue-200' : ''}
                                            ${user.role === 'user' ? 'bg-gray-100 text-gray-800 border border-gray-200' : ''}
                                        `}>
                                            {user.role === 'admin' ? 'Administrateur' : user.role === 'demandeur' ? 'Demandeur' : 'Standard'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                                        {auth.user && auth.user.id === user.id ? (
                                            <span className="text-slate-400 italic text-xs px-2">Vous-même</span>
                                        ) : (
                                            <>
                                                <Link href={route('admin.utilisateurs.edit', user.id)} className="text-blue-600 hover:text-blue-900 font-semibold">Éditer</Link>
                                                <button 
                                                    type="button" 
                                                    className="text-red-600 hover:text-red-900 font-semibold"
                                                    onClick={() => setItemToDelete(user)}
                                                >
                                                    Supprimer
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Cards View */}
            <div className="block md:hidden space-y-4">
                {utilisateurs.length === 0 ? (
                    <div className="bg-white rounded-xl p-6 text-center text-slate-500 text-sm border border-slate-200">
                        Aucun utilisateur trouvé.
                    </div>
                ) : (
                    utilisateurs.map((user) => (
                        <div key={user.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-slate-900 text-base">{user.name}</h3>
                                    {user.nom_association && (
                                        <p className="text-xs text-indigo-600 font-semibold">Assoc: {user.nom_association}</p>
                                    )}
                                </div>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold
                                    ${user.role === 'admin' ? 'bg-red-100 text-red-800' : ''}
                                    ${user.role === 'demandeur' ? 'bg-blue-100 text-blue-800' : ''}
                                    ${user.role === 'user' ? 'bg-gray-100 text-gray-800' : ''}
                                `}>
                                    {user.role === 'admin' ? 'Admin' : user.role === 'demandeur' ? 'Demandeur' : 'Standard'}
                                </span>
                            </div>

                            <div className="bg-slate-50 p-2.5 rounded-lg text-xs space-y-1">
                                <div><strong className="text-slate-700">Email :</strong> {user.email}</div>
                                {user.telephone && <div><strong className="text-slate-700">Tél :</strong> {user.telephone}</div>}
                                <div><strong className="text-slate-700">Inscrit le :</strong> {new Date(user.created_at).toLocaleDateString('fr-FR')}</div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                                {auth.user && auth.user.id === user.id ? (
                                    <span className="text-slate-400 italic text-xs">Compte actuel</span>
                                ) : (
                                    <>
                                        <Link href={route('admin.utilisateurs.edit', user.id)} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded border border-blue-200">
                                            Éditer
                                        </Link>
                                        <button 
                                            type="button" 
                                            className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded border border-red-200"
                                            onClick={() => setItemToDelete(user)}
                                        >
                                            Supprimer
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <DeleteConfirmModal 
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={handleDelete}
                title="Supprimer l'utilisateur"
                message={`Êtes-vous sûr de vouloir supprimer l'utilisateur "${itemToDelete?.name}" ? Cette action est irréversible.`}
            />
        </AdminLayout>
    );
}

import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Edit({ utilisateur }) {
    const { auth } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: utilisateur.name || '',
        email: utilisateur.email || '',
        telephone: utilisateur.telephone || '',
        nom_association: utilisateur.nom_association || '',
        role: utilisateur.role || 'user',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.utilisateurs.update', utilisateur.id));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Éditer ${utilisateur.name} - LIXUS ADMIN`} />

            <div className="mb-8 flex items-center gap-4">
                <Link href={route('admin.utilisateurs.index')} className="text-slate-400 hover:text-slate-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Éditer le profil</h1>
                    <p className="text-slate-500 mt-1 text-sm">Modifiez les informations et le rôle de l'utilisateur.</p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden p-6 max-w-2xl">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nom complet</label>
                            <input 
                                type="text" 
                                value={data.name} 
                                onChange={e => setData('name', e.target.value)} 
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red"
                                required 
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Adresse Email</label>
                            <input 
                                type="email" 
                                value={data.email} 
                                onChange={e => setData('email', e.target.value)} 
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red bg-slate-50"
                                required 
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
                            <input 
                                type="text" 
                                value={data.telephone} 
                                onChange={e => setData('telephone', e.target.value)} 
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red"
                            />
                            {errors.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nom de l'association (optionnel)</label>
                            <input 
                                type="text" 
                                value={data.nom_association} 
                                onChange={e => setData('nom_association', e.target.value)} 
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red"
                            />
                            {errors.nom_association && <p className="text-red-500 text-xs mt-1">{errors.nom_association}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Rôle</label>
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <select 
                                    value={data.role} 
                                    onChange={e => setData('role', e.target.value)} 
                                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red font-medium"
                                >
                                    <option value="user">Utilisateur Standard</option>
                                    <option value="demandeur">Demandeur (Peut faire des réservations)</option>
                                    <option value="admin">Administrateur (Accès complet)</option>
                                </select>
                                <p className="text-xs text-slate-500 mt-2">
                                    <strong>Attention :</strong> Promouvoir un utilisateur en "Administrateur" lui donne accès à tout le tableau de bord (y compris la gestion des autres utilisateurs et du site public).
                                </p>
                            </div>
                            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-lixus-red hover:bg-red-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
                        >
                            Enregistrer les modifications
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

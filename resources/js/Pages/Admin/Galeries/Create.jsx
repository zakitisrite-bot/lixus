import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';

export default function Create() {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors, progress } = useForm({
        title: '',
        description: '',
        category: 'Général',
        status: 'Publié',
        media: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.galeries.store'));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Ajouter une image - Galerie - LIXUS ADMIN" />

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Ajouter à la galerie</h1>
                    <Link href={route('admin.galeries.index')} className="text-sm text-slate-500 hover:text-lixus-red transition-colors flex items-center mt-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Retour à la liste
                    </Link>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden p-6 max-w-4xl">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Titre de l'image</label>
                            <input 
                                type="text" 
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-lixus-red focus:ring-lixus-red"
                                placeholder="Titre (ex: Concert de fin d'année)"
                            />
                            {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description (optionnel)</label>
                            <textarea 
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows="3"
                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-lixus-red focus:ring-lixus-red"
                                placeholder="Petite description..."
                            ></textarea>
                            {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label>
                            <select 
                                value={data.category}
                                onChange={e => setData('category', e.target.value)}
                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-lixus-red focus:ring-lixus-red"
                            >
                                <option>Général</option>
                                <option>Spectacle</option>
                                <option>Atelier</option>
                                <option>Visite</option>
                            </select>
                            {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Statut</label>
                            <select 
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-lixus-red focus:ring-lixus-red"
                            >
                                <option>Brouillon</option>
                                <option>Publié</option>
                            </select>
                            {errors.status && <div className="text-red-500 text-xs mt-1">{errors.status}</div>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Fichiers médias (Images & Vidéos)</label>
                            <input 
                                type="file" 
                                multiple
                                accept="image/*,video/*"
                                onChange={e => setData('media', Array.from(e.target.files))}
                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-lixus-red hover:file:bg-slate-100 border border-slate-200"
                            />
                            {errors.media && <div className="text-red-500 text-xs mt-1">{errors.media}</div>}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200 flex flex-col items-end">
                        {progress && (
                            <div className="w-full max-w-md mb-4">
                                <div className="flex justify-between mb-1 text-xs font-medium text-slate-500">
                                    <span>Envoi en cours...</span>
                                    <span>{progress.percentage}%</span>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2">
                                    <div className="bg-lixus-red h-2 rounded-full transition-all duration-300" style={{ width: `${progress.percentage}%` }}></div>
                                </div>
                            </div>
                        )}
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-lixus-red hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Enregistrement...' : 'Ajouter l\'image'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

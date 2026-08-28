import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';

export default function Edit({ galerie }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors, progress } = useForm({
        _method: 'PUT',
        title: galerie.title || '',
        description: galerie.description || '',
        category: galerie.category || 'Général',
        status: galerie.status || 'Publié',
        media: [],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.galeries.update', galerie.id));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Éditer l'image - Galerie - LIXUS ADMIN" />

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Éditer l'image</h1>
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
                            <label className="block text-sm font-medium text-slate-700 mb-1">Remplacer les médias (Laissez vide pour conserver les actuels)</label>
                            {galerie.media && galerie.media.length > 0 && (
                                <div className="mb-3 flex flex-wrap gap-2">
                                    {galerie.media.map((m, idx) => (
                                        m.type === 'video' ? (
                                            <div key={idx} className="h-20 w-32 bg-slate-900 rounded flex items-center justify-center text-white text-xs">Vidéo</div>
                                        ) : (
                                            <img key={idx} src={m.url.startsWith('http') ? m.url : m.url} alt={`Media ${idx}`} className="h-20 rounded object-cover border border-slate-200 shadow-sm" />
                                        )
                                    ))}
                                </div>
                            )}
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
                            {processing ? 'Enregistrement...' : 'Mettre à jour'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

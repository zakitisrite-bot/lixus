import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

export default function Create() {
    const { auth } = usePage().props;
    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        nom_salle: '',
        description: '',
        capacite: '',
        equipements: '',
        image: null,
        images_salle: [],
    });

    const [galleryPreviews, setGalleryPreviews] = useState([]);

    const handleImages = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setData(prev => ({
                ...prev,
                image: files[0],
                images_salle: files.length > 1 ? files.slice(1) : []
            }));
            const urls = files.map(file => URL.createObjectURL(file));
            setGalleryPreviews(urls);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.salles.store'));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Ajouter une salle - LIXUS ADMIN" />

            <div className="mb-8 flex items-center gap-4">
                <Link href={route('admin.salles.index')} className="text-slate-400 hover:text-slate-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Ajouter une salle</h1>
                    <p className="text-slate-500 mt-1 text-sm">Créez un nouvel espace disponible à la réservation.</p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 max-w-4xl">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Nom de la salle <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={data.nom_salle}
                                onChange={e => setData('nom_salle', e.target.value)}
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red"
                                placeholder="Ex: Grande Salle Polyvalente"
                                required
                            />
                            {errors.nom_salle && <p className="text-red-500 text-xs mt-1">{errors.nom_salle}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Capacité maximale (personnes) <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                min="1"
                                value={data.capacite}
                                onChange={e => setData('capacite', e.target.value)}
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red"
                                placeholder="Ex: 150"
                                required
                            />
                            {errors.capacite && <p className="text-red-500 text-xs mt-1">{errors.capacite}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Équipements</label>
                            <input
                                type="text"
                                value={data.equipements}
                                onChange={e => setData('equipements', e.target.value)}
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red"
                                placeholder="Vidéoprojecteur, Sonorisation, Scène..."
                            />
                            <p className="text-slate-400 text-xs mt-1">Séparez les équipements par des virgules.</p>
                            {errors.equipements && <p className="text-red-500 text-xs mt-1">{errors.equipements}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows="4"
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red"
                                placeholder="Décrivez cet espace : usage, configuration, ambiance..."
                            />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        {/* Unified Image Upload */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Images de la salle <span className="text-red-500">*</span></label>
                            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-slate-300 rounded-xl p-6 cursor-pointer hover:border-lixus-red transition-colors bg-slate-50 hover:bg-red-50/20 relative overflow-hidden">
                                {galleryPreviews.length > 0 ? (
                                    <div className="w-full">
                                        <div className="flex flex-wrap gap-4 justify-center">
                                            {galleryPreviews.map((src, i) => (
                                                <div key={i} className="relative group">
                                                    <img src={src} alt="Aperçu" className="h-32 rounded-lg object-cover shadow" />
                                                    {i === 0 && (
                                                        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded-md">Principale</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xs text-center text-slate-500 mt-4">Cliquez pour remplacer toutes les images</p>
                                    </div>
                                ) : (
                                    <>
                                        <svg className="w-10 h-10 text-slate-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        <p className="text-sm font-medium text-slate-700">Sélectionnez une ou plusieurs images</p>
                                        <p className="text-xs text-slate-400 mt-1">La première image sera l'image principale.</p>
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImages}
                                    className="hidden"
                                />
                            </label>
                            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                            {errors.images_salle && <p className="text-red-500 text-xs mt-1">{errors.images_salle}</p>}
                        </div>
                        </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-lixus-red hover:bg-red-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
                        >
                            Enregistrer la salle
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

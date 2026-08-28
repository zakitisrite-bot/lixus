import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link, usePage } from '@inertiajs/react';

export default function Edit({ actualite }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors, progress } = useForm({
        _method: 'PUT',
        title: actualite.title || '',
        description: actualite.description || '',
        category: actualite.category || 'Actualités',
        publication_date: actualite.publication_date || '',
        status: actualite.status || 'Brouillon',
        is_featured: !!actualite.is_featured,
        existing_images: actualite.images || [],
        images: [],
    });

    const submit = (e) => {
        e.preventDefault();
        // Pour gérer l'upload de fichier avec PUT dans Laravel/Inertia, on utilise POST et _method: PUT
        post(route('admin.actualites.update', actualite.id));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Éditer l'actualité - LIXUS ADMIN" />

            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Éditer la publication</h1>
                    <Link href={route('admin.actualites.index')} className="text-sm text-slate-500 hover:text-lixus-red transition-colors flex items-center mt-2">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Retour à la liste
                    </Link>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden p-6 max-w-4xl">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Titre</label>
                            <input 
                                type="text" 
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-lixus-red focus:ring-lixus-red"
                                placeholder="Titre de l'actualité ou événement"
                            />
                            {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description / Contenu</label>
                            <textarea 
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows="5"
                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-lixus-red focus:ring-lixus-red"
                                placeholder="Contenu de la publication..."
                            ></textarea>
                            {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label>
                            <input 
                                type="text"
                                value={data.category}
                                onChange={e => setData('category', e.target.value)}
                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-lixus-red focus:ring-lixus-red"
                                placeholder="Ex: Événement, Actualité..."
                            />
                            {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Date de publication</label>
                            <input 
                                type="date" 
                                value={data.publication_date}
                                onChange={e => setData('publication_date', e.target.value)}
                                className="w-full rounded-lg border-slate-300 shadow-sm focus:border-lixus-red focus:ring-lixus-red"
                            />
                            {errors.publication_date && <div className="text-red-500 text-xs mt-1">{errors.publication_date}</div>}
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

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Images / Vidéos (Laissez vide pour conserver les actuelles. La première sera la couverture)</label>
                            
                            {/* Affichage des images actuelles si on n'a pas encore sélectionné de nouvelles images */}
                            {data.existing_images && data.existing_images.length > 0 && data.images.length === 0 && (
                                <div className="mb-4 grid grid-cols-3 gap-2">
                                    {data.existing_images.map((img, index) => (
                                        <div 
                                            key={index} 
                                            onClick={() => {
                                                if (index === 0) return;
                                                const newImages = [...data.existing_images];
                                                const temp = newImages[0];
                                                newImages[0] = newImages[index];
                                                newImages[index] = temp;
                                                setData('existing_images', newImages);
                                            }}
                                            className={`relative aspect-square rounded-lg overflow-hidden border cursor-pointer hover:opacity-90 transition-opacity ${index === 0 ? 'border-2 border-lixus-red shadow-md' : 'border-slate-200'}`}
                                            title="Cliquez pour définir comme couverture"
                                        >
                                            {img.match(/\.(mp4|webm|ogg)$/i) ? (
                                                <video src={img.startsWith('http') ? img : `/storage/${img.replace('/storage/', '')}`} className="w-full h-full object-cover" muted loop playsInline></video>
                                            ) : (
                                                <img src={img.startsWith('http') ? img : `/storage/${img.replace('/storage/', '')}`} alt="" className="w-full h-full object-cover" />
                                            )}
                                            {index === 0 && <span className="absolute bottom-1 left-1 bg-lixus-red text-white text-[10px] px-2 py-0.5 rounded">Couverture actuelle</span>}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <input 
                                type="file" 
                                accept="image/*,video/*"
                                multiple
                                onChange={e => setData('images', Array.from(e.target.files))}
                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-50 file:text-lixus-red hover:file:bg-slate-100"
                            />
                            {errors.images && <div className="text-red-500 text-xs mt-1">{errors.images}</div>}

                            {/* Aperçu des nouvelles images sélectionnées */}
                            {data.images && data.images.length > 0 && (
                                <div className="mt-4 grid grid-cols-3 gap-2">
                                    {data.images.map((file, index) => (
                                        <div 
                                            key={index} 
                                            onClick={() => {
                                                if (index === 0) return;
                                                const newImages = [...data.images];
                                                const temp = newImages[0];
                                                newImages[0] = newImages[index];
                                                newImages[index] = temp;
                                                setData('images', newImages);
                                            }}
                                            className={`relative aspect-square rounded-lg overflow-hidden border cursor-pointer hover:opacity-90 transition-opacity ${index === 0 ? 'border-2 border-lixus-red shadow-md' : 'border-slate-200'}`}
                                            title="Cliquez pour définir comme couverture"
                                        >
                                            {file.type.startsWith('video/') ? (
                                                <video src={URL.createObjectURL(file)} className="w-full h-full object-cover" muted loop playsInline></video>
                                            ) : (
                                                <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                                            )}
                                            {index === 0 && <span className="absolute bottom-1 left-1 bg-lixus-red text-white text-[10px] px-2 py-0.5 rounded">Nouvelle couverture</span>}
                                        </div>
                                    ))}
                                </div>
                            )}
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

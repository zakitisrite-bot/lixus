import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';

export default function Show({ message }) {
    const { auth } = usePage().props;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        reply_message: '',
    });

    const handleDelete = () => {
        router.delete(route('admin.messages.destroy', message.id));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.messages.reply', message.id), {
            onSuccess: () => reset('reply_message'),
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Message de ${message.name} - LIXUS ADMIN`} />

            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <Link href={route('admin.messages.index')} className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-900 flex items-center gap-1 mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        Retour aux messages
                    </Link>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 break-words">{message.subject}</h1>
                </div>
                <div className="flex gap-3 w-full sm:w-auto justify-end">
                    <button 
                        type="button"
                        className="w-full sm:w-auto bg-white border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl font-semibold shadow-sm transition-colors text-xs sm:text-sm"
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Supprimer
                    </button>
                </div>
            </div>

            {/* Custom Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all mx-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 text-center mb-2">Supprimer le message</h3>
                        <p className="text-xs sm:text-sm text-slate-500 text-center mb-6">
                            Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible et toutes les données associées seront perdues.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button 
                                type="button" 
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none"
                            >
                                Annuler
                            </button>
                            <button 
                                type="button" 
                                onClick={handleDelete}
                                className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none"
                            >
                                Accepter (Supprimer)
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contenu du message */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                            <div className="flex items-center gap-3.5">
                                <img 
                                    src={message.avatar_url} 
                                    alt={message.name} 
                                    className="w-11 h-11 rounded-full shadow-sm object-cover bg-slate-100 flex-shrink-0"
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(message.name)}&background=random&color=fff&rounded=true&size=48`;
                                    }}
                                />
                                <div>
                                    <h2 className="font-bold text-slate-900 text-base sm:text-lg">{message.name}</h2>
                                    <a href={`mailto:${message.email}`} className="text-xs sm:text-sm text-indigo-600 hover:underline break-all">{message.email}</a>
                                </div>
                            </div>
                            <div className="text-left sm:text-right text-xs sm:text-sm text-slate-500 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 w-full sm:w-auto">
                                <span>Reçu le </span>
                                <span className="font-medium text-slate-900">{new Date(message.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </div>
                        <div className="prose max-w-none text-slate-700 text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
                            {message.message}
                        </div>
                    </div>

                    {/* Zone de réponse */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl shadow-sm p-4 sm:p-6">
                        <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                            Répondre à {message.name}
                        </h3>
                        
                        {message.status === 'répondu' && (
                            <div className="mb-4 bg-green-50 border border-green-200 text-green-800 p-3 sm:p-4 rounded-lg text-xs sm:text-sm">
                                <span className="font-bold">Information :</span> Vous avez déjà répondu à ce message le {new Date(message.replied_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}. Vous pouvez renvoyer une réponse si nécessaire.
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">Votre message</label>
                                <textarea
                                    rows="6"
                                    className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs sm:text-sm"
                                    placeholder="Rédigez votre réponse ici. Elle sera envoyée sous forme de bel email..."
                                    value={data.reply_message}
                                    onChange={e => setData('reply_message', e.target.value)}
                                    required
                                ></textarea>
                                {errors.reply_message && <p className="text-red-500 text-xs mt-1">{errors.reply_message}</p>}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-sm transition-colors text-xs sm:text-sm disabled:opacity-50"
                                >
                                    {processing ? 'Envoi en cours...' : 'Envoyer la réponse'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 sm:p-6">
                        <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2 text-base">Informations</h3>
                        <dl className="space-y-3 text-xs sm:text-sm">
                            <div>
                                <dt className="text-slate-500">Statut</dt>
                                <dd className="font-medium mt-1">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                        message.status === 'nouveau' ? 'bg-indigo-100 text-indigo-800' : 
                                        message.status === 'répondu' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                                    }`}>
                                        {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                                    </span>
                                </dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Dernière lecture</dt>
                                <dd className="font-medium mt-1">{message.read_at ? new Date(message.read_at).toLocaleString('fr-FR') : 'Jamais'}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Date de réponse</dt>
                                <dd className="font-medium mt-1">{message.replied_at ? new Date(message.replied_at).toLocaleString('fr-FR') : 'Non répondu'}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

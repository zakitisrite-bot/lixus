import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ messages }) {
    const { auth } = usePage().props;

    return (
        <AdminLayout user={auth.user}>
            <Head title="Messages - LIXUS ADMIN" />

            <div className="mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Messages de Contact</h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-1">Consultez et répondez aux messages reçus depuis le site.</p>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                                <th className="p-4">Expéditeur</th>
                                <th className="p-4">Sujet</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Statut</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {messages.data.map((message) => (
                                <tr key={message.id} className={`hover:bg-slate-50 transition-colors ${message.status === 'nouveau' ? 'bg-indigo-50/30' : ''}`}>
                                    <td className="p-4 flex items-center gap-3">
                                        <img 
                                            src={message.avatar_url} 
                                            alt={message.name} 
                                            className="w-10 h-10 rounded-full shadow-sm object-cover bg-slate-100 flex-shrink-0"
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(message.name)}&background=random&color=fff&rounded=true&size=40`;
                                            }}
                                        />
                                        <div>
                                            <div className="font-semibold text-slate-900 flex items-center gap-2">
                                                {message.status === 'nouveau' && <span className="w-2 h-2 rounded-full bg-indigo-600"></span>}
                                                {message.name}
                                            </div>
                                            <div className="text-xs text-slate-500">{message.email}</div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-slate-900 font-semibold text-sm truncate max-w-xs">{message.subject}</div>
                                        <div className="text-xs text-slate-500 truncate max-w-xs">{message.message}</div>
                                    </td>
                                    <td className="p-4 text-xs text-slate-500">
                                        {new Date(message.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                            message.status === 'nouveau' ? 'bg-indigo-100 text-indigo-800' : 
                                            message.status === 'répondu' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                                        }`}>
                                            {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link 
                                            href={route('admin.messages.show', message.id)} 
                                            className="text-indigo-600 hover:text-indigo-900 font-semibold text-sm transition-colors"
                                        >
                                            Consulter
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {messages.data.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500 text-sm">
                                        Aucun message pour le moment.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Cards View */}
            <div className="block md:hidden space-y-4">
                {messages.data.length === 0 ? (
                    <div className="bg-white rounded-xl p-6 text-center text-slate-500 text-sm border border-slate-200">
                        Aucun message pour le moment.
                    </div>
                ) : (
                    messages.data.map((message) => (
                        <div key={message.id} className={`bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-3 ${message.status === 'nouveau' ? 'border-l-4 border-l-indigo-600' : ''}`}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img 
                                        src={message.avatar_url} 
                                        alt={message.name} 
                                        className="w-10 h-10 rounded-full object-cover bg-slate-100 flex-shrink-0"
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(message.name)}&background=random&color=fff&rounded=true&size=40`;
                                        }}
                                    />
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-base">{message.name}</h3>
                                        <p className="text-xs text-slate-500">{message.email}</p>
                                    </div>
                                </div>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                    message.status === 'nouveau' ? 'bg-indigo-100 text-indigo-800' : 
                                    message.status === 'répondu' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'
                                }`}>
                                    {message.status}
                                </span>
                            </div>

                            <div className="bg-slate-50 p-2.5 rounded-lg text-xs space-y-1">
                                <div className="font-semibold text-slate-900">{message.subject}</div>
                                <div className="text-slate-600 line-clamp-2">{message.message}</div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                                <span className="text-slate-400">
                                    {new Date(message.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                                <Link 
                                    href={route('admin.messages.show', message.id)} 
                                    className="px-3 py-1.5 bg-indigo-50 text-indigo-600 font-bold rounded border border-indigo-200"
                                >
                                    Consulter
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            {messages.links && messages.links.length > 3 && (
                <div className="mt-6 flex justify-center overflow-x-auto">
                    <div className="flex space-x-1">
                        {messages.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url}
                                className={`px-3 py-1.5 border rounded-lg text-xs font-semibold ${link.active ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'} ${!link.url ? 'opacity-40 cursor-not-allowed' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

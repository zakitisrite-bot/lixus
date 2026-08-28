import React, { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Flatpickr from 'react-flatpickr';
import { French } from 'flatpickr/dist/l10n/fr.js';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/airbnb.css';
import axios from 'axios';

export default function Edit({ agenda, salles }) {
    const { auth } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        title: agenda.title || '',
        description: agenda.description || '',

        event_date: agenda.event_date || '',
        event_time: agenda.event_time ? agenda.event_time.substring(0, 5) : '',
        event_end_time: agenda.event_end_time ? agenda.event_end_time.substring(0, 5) : '',
        location: agenda.location || '',
        category: agenda.category || '',
        status: agenda.status || 'Brouillon',
        salle_id: agenda.salle_id || '',
    });

    const [disabledDates, setDisabledDates] = useState([]);

    useEffect(() => {
        if (data.salle_id) {
            axios.get(`/api/salles/${data.salle_id}/dates-indisponibles`)
                .then(res => setDisabledDates(res.data))
                .catch(err => console.error(err));
        } else {
            setDisabledDates([]);
        }
    }, [data.salle_id]);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.agendas.update', agenda.id));
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Éditer ${agenda.title} - LIXUS ADMIN`} />

            <div className="mb-8 flex items-center gap-4">
                <Link href={route('admin.agendas.index')} className="text-slate-400 hover:text-slate-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Éditer l'événement</h1>
                    <p className="text-slate-500 mt-1 text-sm">Modifiez les informations de l'événement.</p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden p-6 max-w-4xl">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Titre de l'événement</label>
                            <input 
                                type="text" 
                                value={data.title} 
                                onChange={e => setData('title', e.target.value)} 
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red"
                                required 
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Salle (Obligatoire pour vérifier les conflits)</label>
                            <select 
                                value={data.salle_id} 
                                onChange={e => {
                                    setData('salle_id', e.target.value);
                                    setData('event_date', '');
                                }} 
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red bg-white"
                                required
                            >
                                <option value="">-- Choisir une salle --</option>
                                {salles && salles.map(salle => (
                                    <option key={salle.id} value={salle.id}>{salle.nom_salle}</option>
                                ))}
                            </select>
                            {errors.salle_id && <p className="text-red-500 text-xs mt-1">{errors.salle_id}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                            <Flatpickr
                                value={data.event_date}
                                onChange={([date]) => {
                                    if (date) {
                                        const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                                        setData('event_date', formatted);
                                    } else {
                                        setData('event_date', '');
                                    }
                                }}
                                options={{
                                    locale: French,
                                    dateFormat: "Y-m-d",
                                    altInput: true,
                                    altFormat: "d/m/Y",
                                    disable: disabledDates,
                                }}
                                placeholder={data.salle_id ? "Sélectionnez une date" : "Veuillez d'abord choisir une salle"}
                                disabled={!data.salle_id}
                                className={`w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red ${!data.salle_id ? 'bg-slate-100 cursor-not-allowed' : 'bg-white'}`}
                                required
                            />
                            {disabledDates.length > 0 && data.salle_id && (
                                <p className="text-xs text-orange-600 mt-1 font-medium">Les dates grisées sont déjà réservées.</p>
                            )}
                            {errors.event_date && <p className="text-red-500 text-xs mt-1">{errors.event_date}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Heure de début</label>
                            <Flatpickr
                                value={data.event_time}
                                onChange={([date]) => {
                                    if (date) {
                                        const formatted = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                                        setData('event_time', formatted);
                                    } else {
                                        setData('event_time', '');
                                    }
                                }}
                                options={{
                                    enableTime: true,
                                    noCalendar: true,
                                    dateFormat: "H:i",
                                    time_24hr: true,
                                    locale: French,
                                    onOpen: (selectedDates, dateStr, instance) => {
                                        if (instance.calendarContainer) {
                                            instance.calendarContainer.setAttribute('lang', 'fr-FR');
                                            const inputs = instance.calendarContainer.querySelectorAll('input');
                                            inputs.forEach(i => i.setAttribute('lang', 'fr-FR'));
                                        }
                                    }
                                }}
                                placeholder="Heure début (ex: 14:00)"
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red bg-white"
                            />
                            {errors.event_time && <p className="text-red-500 text-xs mt-1">{errors.event_time}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Heure de fin (Optionnel)</label>
                            <Flatpickr
                                value={data.event_end_time}
                                onChange={([date]) => {
                                    if (date) {
                                        const formatted = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                                        setData('event_end_time', formatted);
                                    } else {
                                        setData('event_end_time', '');
                                    }
                                }}
                                options={{
                                    enableTime: true,
                                    noCalendar: true,
                                    dateFormat: "H:i",
                                    time_24hr: true,
                                    locale: French,
                                    onOpen: (selectedDates, dateStr, instance) => {
                                        if (instance.calendarContainer) {
                                            instance.calendarContainer.setAttribute('lang', 'fr-FR');
                                            const inputs = instance.calendarContainer.querySelectorAll('input');
                                            inputs.forEach(i => i.setAttribute('lang', 'fr-FR'));
                                        }
                                    }
                                }}
                                placeholder="Heure fin (ex: 16:00)"
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red bg-white"
                            />
                            {errors.event_end_time && <p className="text-red-500 text-xs mt-1">{errors.event_end_time}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Précisions sur le lieu (Optionnel)</label>
                            <input 
                                type="text" 
                                value={data.location} 
                                onChange={e => setData('location', e.target.value)} 
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red"
                                placeholder="Ex: Hall d'entrée..."
                            />
                            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label>
                            <input 
                                type="text"
                                value={data.category} 
                                onChange={e => setData('category', e.target.value)} 
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red"
                                placeholder="Ex: Événement, Spectacle..."
                            />
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description / Contenu</label>
                            <textarea 
                                value={data.description} 
                                onChange={e => setData('description', e.target.value)} 
                                rows="6"
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red"
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Statut</label>
                            <select 
                                value={data.status} 
                                onChange={e => setData('status', e.target.value)} 
                                className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-lixus-red focus:border-lixus-red"
                            >
                                <option value="Brouillon">Brouillon</option>
                                <option value="Publié">Publié</option>
                            </select>
                            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button 
                            type="submit" 
                            disabled={processing}
                            className="bg-lixus-red hover:bg-red-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
                        >
                            Mettre à jour l'événement
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

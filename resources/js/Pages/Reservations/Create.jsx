import React, { useMemo } from 'react';
import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import useTranslation from '@/hooks/useTranslation';

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

export default function Create({ salles }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        salle_id: '', nombre_personnes: '', date_activite: '', heure_debut: '', heure_fin: '',
        description_activite: '', nom_association: '', cin_responsable: '', email_contact: '',
        telephone: '', fichiers_legaux: null, conditions_acceptees: false,
    });

    const selectedSalle = useMemo(() => salles?.find(s => String(s.id) === String(data.salle_id)), [data.salle_id, salles]);
    const capacityExceeded = selectedSalle && data.nombre_personnes && parseInt(data.nombre_personnes) > selectedSalle.capacite;

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 15);
    const minDateString = minDate.toISOString().split('T')[0];

    const submit = (e) => {
        e.preventDefault();
        post(route('reservations.store'));
    };

    return (
        <PublicLayout>
            <Head title={`${t('Réserver une salle')} - ${t('Centre Culturel')} Lixus`} />

            <div className="flex flex-col lg:flex-row min-h-screen bg-[#F8F9FA] max-w-full overflow-hidden">
                
                {/* Left Column - Image (Desktop only) */}
                <div className="hidden lg:block lg:w-[40%] relative bg-black">
                    <img 
                        src="https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=1000" 
                        alt="Théâtre"
                        className="absolute inset-0 w-full h-full object-cover opacity-45 filter grayscale-[15%]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute inset-0 p-12 flex flex-col justify-end">
                        <div className="w-10 h-[1px] bg-[#97D2D4] mb-6" />
                        <h2 style={{ fontFamily: DS.display, fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 300, color: '#FFFFFF', lineHeight: 1.2, marginBottom: '24px' }}>
                            {t("Donnez vie à vos événements dans des espaces d'exception.")}
                        </h2>
                        <p style={{ fontFamily: DS.body, fontSize: '18px', fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                            {t('Le Centre Culturel Lixus met à votre disposition des salles équipées et modulables pour vos représentations, conférences et expositions.')}
                        </p>
                    </div>
                </div>

                {/* Right Column - Form */}
                <div className="w-full flex-1 flex justify-center py-6 px-3 sm:py-12 sm:px-6 md:px-8 overflow-y-auto">
                    <div className="w-full max-w-[720px]">
                        
                        <div className="mb-6 sm:mb-10 text-left">
                            <h1 style={{ fontFamily: DS.display, fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 300, color: '#000000', marginBottom: '10px' }}>
                                {t('Nouvelle Réservation')}
                            </h1>
                            <p style={{ fontFamily: DS.body, fontSize: '15px', color: '#707070', lineHeight: '1.5' }}>
                                {t('Veuillez remplir les informations nécessaires pour soumettre votre demande. Notre équipe vous répondra dans les plus brefs délais.')}
                            </p>
                        </div>

                        <form onSubmit={submit} className="flex flex-col gap-6 sm:gap-10">
                            
                            {/* Card 1 */}
                            <div className="bg-white border border-[#EDEDED] p-4 sm:p-8 md:p-10 shadow-sm rounded-sm">
                                <h3 style={{ fontFamily: DS.display, fontSize: '20px', fontWeight: 400, color: '#000000', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ width: '26px', height: '26px', border: '1px solid #EDEDED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', borderRadius: '50%' }}>1</span>
                                    {t('Informations Générales')}
                                </h3>

                                <div className="flex flex-col gap-4 sm:gap-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div>
                                            <label htmlFor="nom_association" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>{t("Nom de l'Association")} *</label>
                                            <input type="text" id="nom_association" value={data.nom_association} onChange={(e) => setData('nom_association', e.target.value)} required className="input-lad" style={{ fontFamily: DS.body }} />
                                            {errors.nom_association && <p style={{ color: '#C52034', fontSize: '12px', marginTop: '4px' }}>{errors.nom_association}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="cin_responsable" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>{t('CIN du Responsable')} *</label>
                                            <input type="text" id="cin_responsable" value={data.cin_responsable} onChange={(e) => setData('cin_responsable', e.target.value)} required className="input-lad" style={{ fontFamily: DS.body }} />
                                            {errors.cin_responsable && <p style={{ color: '#C52034', fontSize: '12px', marginTop: '4px' }}>{errors.cin_responsable}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div>
                                            <label htmlFor="email_contact" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>{t('Adresse email')} *</label>
                                            <input type="email" id="email_contact" value={data.email_contact} onChange={(e) => setData('email_contact', e.target.value)} required className="input-lad" style={{ fontFamily: DS.body }} />
                                            {errors.email_contact && <p style={{ color: '#C52034', fontSize: '12px', marginTop: '4px' }}>{errors.email_contact}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="telephone" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>{t('Téléphone')}</label>
                                            <input type="tel" id="telephone" value={data.telephone} onChange={(e) => setData('telephone', e.target.value)} className="input-lad" style={{ fontFamily: DS.body }} />
                                            {errors.telephone && <p style={{ color: '#C52034', fontSize: '12px', marginTop: '4px' }}>{errors.telephone}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="salle_id" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>{t('Salle souhaitée')} *</label>
                                        <select id="salle_id" value={data.salle_id} onChange={(e) => setData('salle_id', e.target.value)} className="input-lad" style={{ fontFamily: DS.body, appearance: 'none', backgroundColor: '#FFF' }}>
                                            <option value="">{t('Sélectionnez une salle')}</option>
                                            {salles && salles.map((salle) => (
                                                <option key={salle.id} value={salle.id}>{t(salle.nom_salle)} ({t('Capacité')} : {salle.capacite} {t('pers.')})</option>
                                            ))}
                                        </select>
                                        {errors.salle_id && <p style={{ color: '#C52034', fontSize: '12px', marginTop: '4px' }}>{errors.salle_id}</p>}
                                    </div>

                                    <div>
                                        <label htmlFor="nombre_personnes" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>{t('Nombre de personnes attendues')} *</label>
                                        <input type="number" id="nombre_personnes" min="1" max={selectedSalle ? selectedSalle.capacite : undefined} value={data.nombre_personnes} onChange={(e) => setData('nombre_personnes', e.target.value)} className="input-lad" style={{ fontFamily: DS.body }} />
                                        {capacityExceeded && (
                                            <div style={{ backgroundColor: '#FBE8E8', color: '#C52034', padding: '10px 12px', fontSize: '13px', marginTop: '8px', border: '1px solid #F5C6CB' }}>
                                                {t('La capacité maximale pour cette salle est de')} {selectedSalle.capacite} {t('personnes')}.
                                            </div>
                                        )}
                                        {errors.nombre_personnes && <p style={{ color: '#C52034', fontSize: '12px', marginTop: '4px' }}>{errors.nombre_personnes}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                                        <div>
                                            <label htmlFor="date_activite" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>{t('Date')} *</label>
                                            <input type="date" id="date_activite" min={minDateString} value={data.date_activite} onChange={(e) => setData('date_activite', e.target.value)} required className="input-lad" style={{ fontFamily: DS.body }} />
                                            {errors.date_activite && <p style={{ color: '#C52034', fontSize: '12px', marginTop: '4px' }}>{errors.date_activite}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="heure_debut" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>{t('Début')} *</label>
                                            <input type="time" id="heure_debut" value={data.heure_debut} onChange={(e) => setData('heure_debut', e.target.value)} required className="input-lad" style={{ fontFamily: DS.body }} />
                                            {errors.heure_debut && <p style={{ color: '#C52034', fontSize: '12px', marginTop: '4px' }}>{errors.heure_debut}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="heure_fin" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>{t('Fin')} *</label>
                                            <input type="time" id="heure_fin" value={data.heure_fin} onChange={(e) => setData('heure_fin', e.target.value)} required className="input-lad" style={{ fontFamily: DS.body }} />
                                            {errors.heure_fin && <p style={{ color: '#C52034', fontSize: '12px', marginTop: '4px' }}>{errors.heure_fin}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="description_activite" style={{ display: 'block', fontFamily: DS.display, fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9D9D9D', marginBottom: '8px' }}>{t('Programme détaillé')} *</label>
                                        <textarea id="description_activite" rows="4" value={data.description_activite} onChange={(e) => setData('description_activite', e.target.value)} required className="input-lad" style={{ fontFamily: DS.body, minHeight: '100px' }}></textarea>
                                        {errors.description_activite && <p style={{ color: '#C52034', fontSize: '12px', marginTop: '4px' }}>{errors.description_activite}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white border border-[#EDEDED] p-4 sm:p-8 md:p-10 shadow-sm rounded-sm">
                                <h3 style={{ fontFamily: DS.display, fontSize: '20px', fontWeight: 400, color: '#000000', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ width: '26px', height: '26px', border: '1px solid #EDEDED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', borderRadius: '50%' }}>2</span>
                                    {t('Pièces Jointes')}
                                </h3>
                                
                                <label htmlFor="fichiers_legaux" className="block border border-dashed border-[#9D9D9D] p-6 sm:p-10 text-center cursor-pointer bg-[#F8F9FA]">
                                    <div style={{ fontFamily: DS.body, fontSize: '14px', color: '#3C3C3C' }}>
                                        {data.fichiers_legaux ? data.fichiers_legaux.name : t('Cliquez pour ajouter vos documents légaux (PDF ou ZIP, max 2MB)')}
                                    </div>
                                    <input type="file" id="fichiers_legaux" accept=".pdf,.zip" onChange={(e) => setData('fichiers_legaux', e.target.files[0])} style={{ display: 'none' }} />
                                </label>
                                {errors.fichiers_legaux && <p style={{ color: '#C52034', fontSize: '12px', marginTop: '8px', textAlign: 'center' }}>{errors.fichiers_legaux}</p>}
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white border border-[#EDEDED] p-4 sm:p-8 md:p-10 shadow-sm rounded-sm">
                                <h3 style={{ fontFamily: DS.display, fontSize: '20px', fontWeight: 400, color: '#000000', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span style={{ width: '26px', height: '26px', border: '1px solid #EDEDED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', borderRadius: '50%' }}>3</span>
                                    {t('Charte & Engagement')}
                                </h3>

                                <div className="border border-[#EDEDED] p-4 sm:p-6 mb-6 bg-[#F8F9FA]">
                                    <p style={{ fontFamily: DS.body, fontSize: '15px', fontWeight: 500, color: '#000000', marginBottom: '10px' }}>{t('En soumettant cette demande, vous vous engagez à :')}</p>
                                    <ul style={{ fontFamily: DS.body, fontSize: '14px', color: '#707070', paddingLeft: '20px', margin: 0, lineHeight: '1.6' }}>
                                        <li>{t("Fournir le programme détaillé 48h à l'avance.")}</li>
                                        <li>{t('Préserver les équipements de la salle.')}</li>
                                        <li>{t("Ne pas introduire d'objets interdits.")}</li>
                                        <li>{t("Nettoyer et réarranger la salle après l'activité.")}</li>
                                        <li>{t('Fournir un rapport de présence à la fin.')}</li>
                                    </ul>
                                </div>

                                <label className="flex items-start cursor-pointer">
                                    <input type="checkbox" checked={data.conditions_acceptees} onChange={(e) => setData('conditions_acceptees', e.target.checked)} required className="mt-1 accent-black" />
                                    <span style={{ fontFamily: DS.body, fontSize: '14px', color: '#000000', marginLeft: '12px', lineHeight: '1.4' }}>
                                        {t("Je, soussigné, accepte les conditions d'exploitation de la salle et m'engage à respecter ce règlement.")} *
                                    </span>
                                </label>
                                {errors.conditions_acceptees && <p style={{ color: '#C52034', fontSize: '12px', marginTop: '4px' }}>{errors.conditions_acceptees}</p>}
                            </div>

                            <button 
                                type="submit" 
                                disabled={processing || capacityExceeded} 
                                className="btn-lad-primary min-h-[48px] w-full justify-center text-center" 
                                style={{ opacity: (processing || capacityExceeded) ? 0.5 : 1 }}
                            >
                                {processing ? t('Envoi en cours...') : t('Soumettre la Demande')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

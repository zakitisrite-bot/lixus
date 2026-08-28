import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import useTranslation from '@/hooks/useTranslation';
import EventModal from '@/Components/EventModal';

const DS = { display: "'Cormorant Garamond', Georgia, serif", body: "'EB Garamond', Georgia, serif" };

export default function AgendaCalendar({ events = [], salles = [] }) {
    const { t } = useTranslation();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedSalleId, setSelectedSalleId] = useState('');

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (month, year) => {
        let day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1; // Make Monday the first day
    };

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const totalDays = daysInMonth(month, year);
    const startDayIndex = firstDayOfMonth(month, year);

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const monthNames = [
        t("Janvier"), t("Février"), t("Mars"), t("Avril"), t("Mai"), t("Juin"),
        t("Juillet"), t("Août"), t("Septembre"), t("Octobre"), t("Novembre"), t("Décembre")
    ];
    const dayNames = [t("Lun"), t("Mar"), t("Mer"), t("Jeu"), t("Ven"), t("Sam"), t("Dim")];

    const calendarDays = [];
    // Previous month empty days
    for (let i = 0; i < startDayIndex; i++) {
        calendarDays.push({ day: null });
    }
    // Current month days
    for (let d = 1; d <= totalDays; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        let dayEvents = events.filter(e => e.isoDate === dateStr);
        if (selectedSalleId) {
            dayEvents = dayEvents.filter(e => e.salle_id == selectedSalleId);
        }
        calendarDays.push({ day: d, dateStr, events: dayEvents });
    }

    // Function to get color scheme based on category
    const getCategoryColorScheme = (category) => {
        const lower = (category || '').toLowerCase();
        if (lower.includes('théâtre') || lower.includes('theatre') || lower.includes('spectacle')) {
            return { bg: '#FEF2F2', border: '#C52034', text: '#7F1D1D', labelColor: '#991B1B' };
        }
        if (lower.includes('concert') || lower.includes('musique')) {
            return { bg: '#F0F9FF', border: '#0284C7', text: '#075985', labelColor: '#0369A1' };
        }
        if (lower.includes('exposition') || lower.includes('art')) {
            return { bg: '#FFFBEB', border: '#D97706', text: '#78350F', labelColor: '#B45309' };
        }
        if (lower.includes('réservation') || lower.includes('reservation')) {
            return { bg: '#F5F3FF', border: '#7C3AED', text: '#4C1D95', labelColor: '#6D28D9' };
        }
        return { bg: '#EEF2FF', border: '#4F46E5', text: '#1E1B4B', labelColor: '#4338CA' };
    };

    return (
        <div 
            className="bg-white border border-[#EDEDED] relative shadow-sm rounded-sm max-w-full overflow-hidden"
            style={{ touchAction: 'pan-y' }}
        >
            <style>{`
                .custom-calendar-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: #94A3B8 #F1F5F9;
                    overscroll-behavior-y: auto;
                }
                .custom-calendar-scroll::-webkit-scrollbar {
                    height: 4px;
                    width: 4px;
                }
                .custom-calendar-scroll::-webkit-scrollbar-track {
                    background: #F1F5F9;
                    border-radius: 2px;
                }
                .custom-calendar-scroll::-webkit-scrollbar-thumb {
                    background: #94A3B8;
                    border-radius: 2px;
                }
                .custom-calendar-scroll::-webkit-scrollbar-thumb:hover {
                    background: #64748B;
                }
            `}</style>
            
            {/* Calendar Header with padding */}
            <div className="p-4 sm:p-6 pb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 style={{ fontFamily: DS.display, fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 400, color: '#000000', margin: 0, letterSpacing: '0.02em' }}>
                        {monthNames[month]} {year}
                    </h2>
                    
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        {/* Salle Filter Dropdown */}
                        {salles && salles.length > 0 && (
                            <select
                                value={selectedSalleId}
                                onChange={e => setSelectedSalleId(e.target.value)}
                                style={{
                                    fontFamily: DS.body,
                                    fontSize: '15px',
                                    padding: '8px 14px',
                                    border: '1px solid #EDEDED',
                                    backgroundColor: '#FFFFFF',
                                    color: '#000000',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    borderRadius: '0',
                                    minWidth: '170px'
                                }}
                            >
                                <option value="">{t('Toutes les salles')}</option>
                                {salles.map(s => (
                                    <option key={s.id} value={s.id}>{s.nom_salle}</option>
                                ))}
                            </select>
                        )}

                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                                onClick={prevMonth} 
                                aria-label="Mois précédent" 
                                style={{ width: '38px', height: '38px', border: '1px solid #EDEDED', backgroundColor: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 200ms ease' }} 
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F8F9FA'} 
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFF'}
                            >
                                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                            <button 
                                onClick={nextMonth} 
                                aria-label="Mois suivant" 
                                style={{ width: '38px', height: '38px', border: '1px solid #EDEDED', backgroundColor: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 200ms ease' }} 
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#F8F9FA'} 
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#FFF'}
                            >
                                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile swipe helper indicator */}
                <div 
                    className="block sm:hidden text-right mt-3" 
                    style={{ 
                        fontFamily: DS.body, 
                        fontSize: '13px', 
                        fontStyle: 'italic', 
                        color: '#2B4C7E', 
                        fontWeight: 500 
                    }}
                >
                    ← {t('Glisser pour parcourir le calendrier')} →
                </div>
            </div>

            {/* Calendar Grid Container - Flush to outer frame border */}
            <div 
                className="w-full max-w-full overflow-x-auto custom-calendar-scroll border-t border-[#EDEDED]"
                style={{ touchAction: 'pan-y' }}
            >
                <div className="min-w-[680px] sm:min-w-full grid grid-cols-7 gap-[1px] bg-[#EDEDED]">
                    
                    {/* Days of week */}
                    {dayNames.map(day => (
                        <div 
                            key={day} 
                            style={{ 
                                backgroundColor: '#FAFAFA', 
                                padding: '12px 6px', 
                                textAlign: 'center', 
                                fontFamily: DS.display, 
                                fontSize: '15px', 
                                fontWeight: 600, 
                                color: '#2B4C7E', 
                                textTransform: 'uppercase', 
                                letterSpacing: '0.12em' 
                            }}
                        >
                            {day}
                        </div>
                    ))}

                    {/* Days */}
                    {calendarDays.map((item, index) => {
                        const hasEvents = item.day && item.events.length > 0;
                        
                        return (
                            <div 
                                key={index} 
                                className="calendar-day-cell" 
                                style={{ 
                                    backgroundColor: '#FFFFFF', 
                                    height: '115px', 
                                    maxHeight: '115px', 
                                    padding: '6px 8px', 
                                    position: 'relative',
                                    transition: 'background-color 200ms ease',
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'hidden'
                                }}
                            >
                                {item.day && (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, marginBottom: '4px' }}>
                                            <div style={{ fontFamily: DS.display, fontSize: '20px', fontWeight: hasEvents ? 700 : 400, color: hasEvents ? '#000000' : '#707070', lineHeight: 1 }}>
                                                {item.day}
                                            </div>
                                            {item.events && item.events.length > 2 && (
                                                <span 
                                                    title={`${item.events.length} événements (Faites défiler pour tous les voir)`}
                                                    style={{ fontSize: '10px', backgroundColor: '#F1F5F9', color: '#2B4C7E', padding: '1px 6px', borderRadius: '10px', fontWeight: 600, fontFamily: DS.body }}
                                                >
                                                    {item.events.length}
                                                </span>
                                            )}
                                        </div>
                                        
                                        {/* Events Preview list with custom scrollbar */}
                                        {hasEvents && (
                                            <div 
                                                className="custom-calendar-scroll"
                                                style={{ 
                                                    flex: 1,
                                                    display: 'flex', 
                                                    flexDirection: 'column', 
                                                    gap: '4px',
                                                    overflowY: 'auto',
                                                    paddingRight: '2px'
                                                }}
                                            >
                                                {item.events.map((ev, i) => {
                                                    const theme = getCategoryColorScheme(ev.category);
                                                    return (
                                                        <div 
                                                            key={i} 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedEvent(ev);
                                                            }}
                                                            title={`Cliquer pour voir : ${ev.title}`}
                                                            style={{ 
                                                                width: '100%', 
                                                                padding: '4px 6px', 
                                                                backgroundColor: theme.bg,
                                                                borderLeft: `3px solid ${theme.border}`,
                                                                borderTop: `1px solid ${theme.border}25`,
                                                                borderRight: `1px solid ${theme.border}25`,
                                                                borderBottom: `1px solid ${theme.border}25`,
                                                                borderRadius: '4px',
                                                                cursor: 'pointer',
                                                                transition: 'all 150ms ease-in-out',
                                                                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                                                                boxSizing: 'border-box',
                                                                flexShrink: 0,
                                                                minHeight: '36px',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                justifyContent: 'center'
                                                            }}
                                                            onMouseEnter={e => {
                                                                e.currentTarget.style.transform = 'translateY(-1px)';
                                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                                                e.currentTarget.style.filter = 'brightness(1.03)';
                                                            }}
                                                            onMouseLeave={e => {
                                                                e.currentTarget.style.transform = 'translateY(0)';
                                                                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
                                                                e.currentTarget.style.filter = 'none';
                                                            }}
                                                        >
                                                            <div style={{ 
                                                                fontFamily: DS.body,
                                                                fontSize: '12px', 
                                                                fontWeight: 600, 
                                                                color: theme.text,
                                                                whiteSpace: 'nowrap', 
                                                                overflow: 'hidden', 
                                                                textOverflow: 'ellipsis',
                                                                lineHeight: '1.2'
                                                            }}>
                                                                {t(ev.title)}
                                                            </div>

                                                            <div style={{ 
                                                                fontFamily: DS.body,
                                                                fontSize: '11px', 
                                                                color: theme.labelColor, 
                                                                marginTop: '2px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '4px',
                                                                whiteSpace: 'nowrap', 
                                                                overflow: 'hidden', 
                                                                textOverflow: 'ellipsis',
                                                                lineHeight: '1.1'
                                                            }}>
                                                                <span style={{ 
                                                                    fontWeight: 500,
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    whiteSpace: 'nowrap'
                                                                }}>
                                                                    {ev.salle_name || ev.location}
                                                                </span>
                                                                {ev.time && (
                                                                    <span style={{ opacity: 0.85, marginLeft: 'auto', fontWeight: 600, flexShrink: 0 }}>
                                                                        {ev.time}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Event Modal */}
            {selectedEvent && (
                <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            )}
        </div>
    );
}

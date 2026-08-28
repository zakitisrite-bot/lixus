<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgendaController extends Controller
{
    /**
     * Affiche le calendrier avec les Events publiés ET les Réservations approuvées fusionnés.
     */
    public function index()
    {
        // ── 1. Events publiés ─────────────────────────────────────────────────
        $events = Agenda::where('status', 'Publié')
            ->orderBy('event_date', 'asc')
            ->get()
            ->map(fn($ev) => [
                'id'         => $ev->id,
                'source'     => 'event',                // pour distinguer côté React
                'title'      => $ev->title ?? $ev->titre,
                'category'   => $ev->category ?? $ev->categorie ?? 'Événement',
                'event_date' => $ev->event_date,
                'event_time' => $ev->event_time,
                'location'   => $ev->location ?? 'Centre Culturel Lixus',
                'image'      => $ev->image,
                'description' => $ev->description ?? '',
                'salle_id'   => $ev->salle_id,
            ]);

        // ── 2. Réservations approuvées ────────────────────────────────────────
        $reservations = Reservation::where('statut', 'approuvee')
            ->orderBy('date_activite', 'asc')
            ->with('salle')
            ->get()
            ->map(fn($r) => [
                'id'         => 'res-' . $r->id,        // préfixe pour ne pas collisionner avec les events
                'source'     => 'reservation',
                'title'      => $r->nom_association ?? 'Réservation',
                'category'   => 'Réservation',
                'event_date' => $r->date_activite->format('Y-m-d'),
                'event_time' => $r->heure_debut,
                'location'   => $r->salle?->nom_salle ?? 'Centre Culturel Lixus',
                'image'      => null,
                'description' => $r->description_activite ?? '',
                'salle_id'   => $r->salle_id,
            ]);

        // ── 3. Fusion et tri ──────────────────────────────────────────────────
        $merged = $events->concat($reservations)
            ->sortBy('event_date')
            ->values();

        return Inertia::render('Agenda', [
            'dbEvents' => $merged,
        ]);
    }

    /**
     * Page détail d'un événement.
     */
    public function show($id)
    {
        if (str_starts_with($id, 'demo-')) {
            $event = [
                'id'               => $id,
                'title'            => 'Événement de Démonstration',
                'category'         => 'Démonstration',
                'image'            => 'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=800',
                'description'      => 'Ceci est un événement de démonstration généré automatiquement car la base de données est vide.',
                'publication_date' => now()->toIso8601String(),
            ];
        } elseif (str_starts_with($id, 'res-')) {
            $realId = str_replace('res-', '', $id);
            $r = Reservation::with('salle')->findOrFail($realId);
            $event = [
                'id'               => $id,
                'title'            => $r->nom_association ?? 'Réservation',
                'category'         => 'Réservation',
                'image'            => null,
                'description'      => $r->description_activite ?? '',
                'publication_date' => $r->date_activite->toIso8601String(),
            ];
        } else {
            $ev = Agenda::findOrFail($id);
            $event = [
                'id'               => $ev->id,
                'title'            => $ev->titre ?? $ev->title,
                'category'         => $ev->category ?? $ev->categorie,
                'image'            => $ev->image,
                'description'      => $ev->description,
                'publication_date' => optional($ev->event_date)->toIso8601String()
                    ?? $ev->created_at->toIso8601String(),
            ];
        }

        return Inertia::render('Agenda/Show', [
            'actualite' => $event,
        ]);
    }
}

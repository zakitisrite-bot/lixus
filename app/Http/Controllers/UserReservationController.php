<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserReservationController extends Controller
{
    /**
     * Affiche uniquement les réservations du demandeur connecté,
     * triées de la plus récente à la plus ancienne.
     */
    public function index()
    {
        $reservations = Reservation::with('salle')
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($r) {
                return [
                    'id'                  => $r->id,
                    'salle_nom'           => optional($r->salle)->nom ?? '—',
                    'date_activite'       => $r->date_activite?->format('d/m/Y'),
                    'heure_debut'         => $r->heure_debut,
                    'heure_fin'           => $r->heure_fin,
                    'description_activite'=> $r->description_activite,
                    'statut'              => $r->statut,
                    'motif'               => $r->motif,
                    'created_at'          => $r->created_at->format('d/m/Y'),
                ];
            });

        return Inertia::render('User/MesReservations', [
            'reservations' => $reservations,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agenda;
use App\Models\Reservation;
use App\Models\Salle;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Statistiques
        $stats = [
            'reservations_attente' => Reservation::where('statut', 'En attente')->count(),
            'evenements_avenir' => Agenda::where('event_date', '>=', now()->toDateString())->count(),
            'salles_actives' => Salle::count(), // Supposons que toutes sont actives pour l'instant
            'nouveaux_demandeurs' => User::where('role', 'demandeur')
                                         ->whereMonth('created_at', now()->month)
                                         ->count(),
        ];

        // 2. Activité Récente (Historique unifié)
        $recentActivities = collect();

        // 2.1 Dernières Réservations
        $reservations = Reservation::with('user', 'salle')
                                   ->orderBy('created_at', 'desc')
                                   ->take(5)
                                   ->get()
                                   ->map(function ($res) {
                                       return [
                                           'id' => 'res_' . $res->id,
                                           'type' => 'Réservation',
                                           'user' => $res->user ? ($res->user->nom_association ?: $res->user->name) : 'Inconnu',
                                           'details' => 'Demande pour ' . ($res->salle ? $res->salle->nom_salle : 'Salle'),
                                           'time' => $res->created_at->diffForHumans(),
                                           'status' => $res->statut,
                                           'created_at' => $res->created_at
                                       ];
                                   });

        // 2.2 Derniers Utilisateurs
        $users = User::orderBy('created_at', 'desc')
                     ->take(5)
                     ->get()
                     ->map(function ($user) {
                         return [
                             'id' => 'user_' . $user->id,
                             'type' => 'Utilisateur',
                             'user' => $user->name,
                             'details' => 'Nouvelle inscription (' . ucfirst($user->role) . ')',
                             'time' => $user->created_at->diffForHumans(),
                             'status' => 'Validé',
                             'created_at' => $user->created_at
                         ];
                     });

        // 2.3 Derniers Événements (Agenda)
        $agendas = Agenda::orderBy('created_at', 'desc')
                       ->take(5)
                       ->get()
                       ->map(function ($agenda) {
                           return [
                               'id' => 'agenda_' . $agenda->id,
                               'type' => 'Agenda',
                               'user' => 'Admin',
                               'details' => 'Nouvel événement: ' . $agenda->title,
                               'time' => $agenda->created_at->diffForHumans(),
                               'status' => $agenda->status,
                               'created_at' => $agenda->created_at
                           ];
                       });

        // Combiner, trier par date et prendre les 8 plus récents
        $recentActivities = $recentActivities->concat($reservations)
                                             ->concat($users)
                                             ->concat($agendas)
                                             ->sortByDesc('created_at')
                                             ->take(8)
                                             ->values();

        return Inertia::render('Admin/Dashboard', compact('stats', 'recentActivities'));
    }
}

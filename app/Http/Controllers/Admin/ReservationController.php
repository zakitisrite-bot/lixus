<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Salle;
use App\Mail\ReservationStatusMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::with(['user', 'salle'])
            ->orderBy('created_at', 'desc')
            ->get();

        $salles = Salle::orderBy('nom_salle')->get(['id', 'nom_salle']);

        return Inertia::render('Admin/Reservations/Index', [
            'reservations' => $reservations,
            'salles'       => $salles,
        ]);
    }

    /**
     * Modifier les informations d'une réservation (salle, date, horaires, description).
     */
    public function update(Request $request, Reservation $reservation)
    {
        $validated = $request->validate([
            'salle_id'            => 'required|exists:salles,id',
            'date_activite'       => 'required|date',
            'heure_debut'         => 'required|date_format:H:i',
            'heure_fin'           => 'required|date_format:H:i|after:heure_debut',
            'description_activite'=> 'nullable|string|max:1000',
            'nom_association'     => 'nullable|string|max:255',
        ]);

        $reservation->update($validated);

        return back()->with('success', 'Réservation mise à jour avec succès.');
    }

    /**
     * Supprimer définitivement une réservation.
     */
    public function destroy(Reservation $reservation)
    {
        // Supprimer le fichier légal si présent
        if ($reservation->fichiers_legaux) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($reservation->fichiers_legaux);
        }

        $reservation->delete();

        return back()->with('success', 'Réservation supprimée avec succès.');
    }

    public function updateStatus(Request $request, Reservation $reservation)
    {
        $request->validate([
            'statut' => 'required|in:approuvee,rejetee',
            'motif'  => 'nullable|string|max:1000',
        ]);

        $reservation->update([
            'statut' => $request->statut,
            'motif'  => $request->motif,
        ]);

        $reservation->load(['user', 'salle']);

        // 1. Création automatique dans l'Agenda si la réservation est approuvée
        if ($request->statut === 'approuvee') {
            \App\Models\Agenda::create([
                'title'       => "Réservation : " . ($reservation->nom_association ?? 'Demande citoyenne'),
                'description' => $reservation->description_activite,
                'event_date'  => $reservation->date_activite,
                'event_time'  => $reservation->heure_debut,
                'location'    => optional($reservation->salle)->nom_salle,
                'salle_id'    => $reservation->salle_id,
                'category'    => 'Réservation',
                'status'      => 'Publié',
            ]);
        }

        $email = $reservation->email_contact ?? optional($reservation->user)->email;

        if ($email) {
            try {
                Mail::to($email)->send(new ReservationStatusMail($reservation));
            } catch (\Exception $e) {
                \Log::error('Échec envoi email réservation: ' . $e->getMessage());
            }
        }

        $label = $request->statut === 'approuvee' ? 'approuvée' : 'rejetée';
        return back()->with('success', "La réservation a été {$label} et un e-mail de notification a été envoyé à {$email}.");
    }
}

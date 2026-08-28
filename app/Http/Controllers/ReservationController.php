<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Salle;
use App\Rules\SalleLibreReservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function create()
    {
        $salles = Salle::all();
        return Inertia::render('Reservations/Create', [
            'salles' => $salles,
        ]);
    }

    public function store(Request $request)
    {
        // Server-side capacity check FIRST (anti-cheat)
        $salle = \App\Models\Salle::findOrFail($request->salle_id);

        $validated = $request->validate([
            'salle_id' => 'required|exists:salles,id',
            'nombre_personnes' => [
                'required',
                'integer',
                'min:1',
                'max:' . $salle->capacite,
            ],
            'date_activite' => 'required|date|after_or_equal:' . now()->addDays(15)->format('Y-m-d'),
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i|after:heure_debut',
            'description_activite' => 'required|string|max:1000',
            'nom_association' => 'required|string|max:255',
            'cin_responsable' => 'required|string|max:50',
            'email_contact' => 'required|email|max:255',
            'telephone' => 'nullable|string|max:20',
            'fichiers_legaux' => 'required|mimes:pdf,zip|max:2048',
            'conditions_acceptees' => 'required|accepted',
        ], [
            'nombre_personnes.max' => "Le nombre de personnes dépasse la capacité maximale de la salle choisie ({$salle->capacite} personnes).",
            'nombre_personnes.required' => 'Veuillez indiquer le nombre de personnes attendues.',
            'nombre_personnes.min' => 'Le nombre de personnes doit être au moins 1.',
        ]);

        // ── Anti-chevauchement (Bloque la journée complète pour la salle) ──────────────────
        $chevauchementRes = Reservation::where('salle_id', $validated['salle_id'])
            ->where('date_activite', $validated['date_activite'])
            ->whereIn('statut', ['en_attente', 'approuvee'])
            ->exists();

        if ($chevauchementRes) {
            return back()->withErrors([
                'date_activite' => "Cette salle est déjà réservée (ou en attente) pour cette date entière. Veuillez choisir un autre jour."
            ]);
        }

        // ── Anti-chevauchement Events officiels ──────────────────────────────
        $conflitEvent = new SalleLibreReservation(
            $validated['salle_id'],
            $validated['date_activite']
        );

        $errors = [];
        $conflitEvent->validate('date_activite', $validated['date_activite'], function ($msg) use (&$errors) {
            $errors['date_activite'] = $msg;
        });

        if (!empty($errors)) {
            return back()->withErrors($errors);
        }

        $filePath = null;
        if ($request->hasFile('fichiers_legaux')) {
            $filePath = $request->file('fichiers_legaux')->store('reservations/fichiers_legaux', 'public');
        }

        Reservation::create([
            'user_id' => auth()->id(),
            'salle_id' => $validated['salle_id'],
            'date_activite' => $validated['date_activite'],
            'heure_debut' => $validated['heure_debut'],
            'heure_fin' => $validated['heure_fin'],
            'description_activite' => $validated['description_activite'],
            'nom_association' => $validated['nom_association'],
            'cin_responsable' => $validated['cin_responsable'],
            'email_contact' => $validated['email_contact'],
            'telephone' => $validated['telephone'] ?? null,
            'fichiers_legaux' => $filePath,
            'conditions_acceptees' => true,
            'statut' => 'en_attente',
        ]);

        if (auth()->user() && auth()->user()->role === 'admin') {
            return redirect()->route('dashboard')->with('success', 'Réservation ajoutée avec succès.');
        }

        return redirect()->route('home')->with('success', "Votre demande de réservation a été envoyée avec succès. Elle est actuellement en attente de validation par l'administration.");
    }
}

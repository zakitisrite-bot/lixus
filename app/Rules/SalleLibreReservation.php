<?php

namespace App\Rules;

use App\Models\Agenda;
use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Vérifie qu'aucun Event (Agenda publié) ne bloque la salle
 * pour la date et la plage horaire demandées lors d'une Réservation.
 *
 * Usage dans ReservationController::store() :
 *   new SalleLibreReservation($request->salle_id, $request->date_activite,
 *                              $request->heure_debut, $request->heure_fin)
 */
class SalleLibreReservation implements ValidationRule
{
    public function __construct(
        private readonly int|string|null $salleId,
        private readonly string     $date,
        private readonly ?string    $ignoreReservationId = null,
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!$this->salleId) return;

        $hasEvent = Agenda::where('salle_id', $this->salleId)
            ->where('event_date', $this->date)
            ->where('status', 'Publié')
            ->exists();

        $queryReservation = \App\Models\Reservation::where('salle_id', $this->salleId)
            ->where('date_activite', $this->date)
            ->where('statut', 'approuvee');
            
        if ($this->ignoreReservationId) {
            $queryReservation->where('id', '!=', $this->ignoreReservationId);
        }

        if ($hasEvent || $queryReservation->exists()) {
            $fail(
                "La salle est déjà réservée ou occupée le " .
                Carbon::parse($this->date)->format('d/m/Y') .
                ". Veuillez choisir une autre date."
            );
        }
    }
}

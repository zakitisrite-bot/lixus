<?php

namespace App\Rules;

use App\Models\Reservation;
use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Vérifie qu'aucune Réservation (approuvée) ne bloque la salle
 * pour la date et l'heure demandées lors de la création d'un Event.
 *
 * Usage dans AgendaController::store() :
 *   new SalleLibreEvent($request->salle_id, $request->event_date, $request->event_time)
 */
class SalleLibreEvent implements ValidationRule
{
    public function __construct(
        private readonly int|string|null $salleId,
        private readonly string     $date,
        private readonly ?string    $ignoreEventId = null,
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!$this->salleId) return;

        $hasReservation = Reservation::where('salle_id', $this->salleId)
            ->where('date_activite', $this->date)
            ->where('statut', 'approuvee')
            ->exists();

        $queryAgenda = \App\Models\Agenda::where('salle_id', $this->salleId)
            ->where('event_date', $this->date)
            ->where('status', 'Publié');
        
        if ($this->ignoreEventId) {
            $queryAgenda->where('id', '!=', $this->ignoreEventId);
        }

        if ($hasReservation || $queryAgenda->exists()) {
            $fail(
                "La salle sélectionnée est déjà occupée le " . Carbon::parse($this->date)->format('d/m/Y') . " par un autre événement ou réservation."
            );
        }
    }
}

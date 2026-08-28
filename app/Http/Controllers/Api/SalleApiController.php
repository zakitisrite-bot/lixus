<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Salle;
use App\Models\Reservation;
use App\Models\Agenda;
use Illuminate\Http\Request;

class SalleApiController extends Controller
{
    /**
     * Retourne la liste des dates (YYYY-MM-DD) occupées par 
     * des événements publiés ou des réservations approuvées pour une salle donnée.
     */
    public function datesIndisponibles(Salle $salle)
    {
        $datesReservations = Reservation::where('salle_id', $salle->id)
            ->whereIn('statut', ['approuvee'])
            ->pluck('date_activite')
            ->toArray();

        $datesAgendas = Agenda::where('salle_id', $salle->id)
            ->where('status', 'Publié')
            ->pluck('event_date')
            ->toArray();

        $allDates = array_unique(array_merge($datesReservations, $datesAgendas));

        // Format dates to match Flatpickr dateFormat (Y-m-d)
        $formattedDates = array_map(function ($date) {
            return \Carbon\Carbon::parse($date)->format('Y-m-d');
        }, $allDates);

        return response()->json(array_values($formattedDates));
    }
}

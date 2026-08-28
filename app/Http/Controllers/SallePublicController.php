<?php

namespace App\Http\Controllers;

use App\Models\Salle;
use App\Services\TranslationService;
use Inertia\Inertia;

class SallePublicController extends Controller
{
    public function index()
    {
        $salles = Salle::orderBy('capacite', 'desc')->get()->map(function ($s) {
            $equipements = is_array($s->equipements) ? array_map(function ($eq) {
                return TranslationService::translate($eq);
            }, $s->equipements) : $s->equipements;

            return [
                'id'          => $s->id,
                'nom_salle'   => TranslationService::translate($s->nom_salle),
                'capacite'    => $s->capacite,
                'description' => TranslationService::translate($s->description),
                'equipements'  => $equipements,
                'image'        => $s->image,
                'images_salle' => $s->images_salle,
            ];
        });

        return Inertia::render('Salles/Index', [
            'salles' => $salles,
        ]);
    }

    public function show($id)
    {
        try {
            $salle = Salle::findOrFail($id);
            $equipements = is_array($salle->equipements) ? array_map(function ($eq) {
                return TranslationService::translate($eq);
            }, $salle->equipements) : ($salle->equipements ?? []);

            return Inertia::render('Salles/Show', [
                'salle' => [
                    'id'           => $salle->id,
                    'nom_salle'    => TranslationService::translate($salle->nom_salle),
                    'capacite'     => $salle->capacite,
                    'description'  => TranslationService::translate($salle->description),
                    'equipements'  => $equipements,
                    'image'        => $salle->image,
                    'images_salle' => $salle->images_salle,
                ]
            ]);
        } catch (\Exception $e) {
            return redirect()->route('salles.index')->with('error', 'Salle introuvable.');
        }
    }
}

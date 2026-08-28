<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SalleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Salle::create([
            'nom_salle' => 'Salle Polyvalente',
            'capacite' => 150,
            'equipements' => ['Vidéoprojecteur', 'Sonorisation', 'Scène', 'Climatisation'],
            'images_salle' => ['/storage/salles/polyvalente1.jpg'],
        ]);

        \App\Models\Salle::create([
            'nom_salle' => 'Salle de Réunion',
            'capacite' => 30,
            'equipements' => ['Écran Interactif', 'Table Ronde', 'Machine à café'],
            'images_salle' => ['/storage/salles/reunion1.jpg'],
        ]);
    }
}

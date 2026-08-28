<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Salle extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_salle',
        'description',
        'image',
        'capacite',
        'equipements',
        'images_salle',
    ];

    protected $casts = [
        'equipements' => 'array',
        'images_salle' => 'array',
    ];
}

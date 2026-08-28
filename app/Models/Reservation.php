<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    /**
     * Workflow à 1 étape (Admin = Directeur) :
     *  en_attente → approuvee | rejetee (+ motif_refus)
     */
    const STATUTS = ['en_attente', 'approuvee', 'rejetee'];

    const STATUT_LABELS = [
        'en_attente' => 'En attente',
        'approuvee'  => 'Approuvée',
        'rejetee'    => 'Rejetée',
    ];

    const STATUT_CLASSES = [
        'en_attente' => 'bg-amber-100 text-amber-800',
        'approuvee'  => 'bg-green-100 text-green-800',
        'rejetee'    => 'bg-red-100 text-red-800',
    ];

    protected $fillable = [
        'user_id',
        'salle_id',
        'date_demande',
        'date_activite',
        'heure_debut',
        'heure_fin',
        'description_activite',
        'est_interne',
        'statut',
        'motif',
        'nom_association',
        'cin_responsable',
        'email_contact',
        'telephone',
        'fichiers_legaux',
        'conditions_acceptees',
    ];

    protected $casts = [
        'date_demande'         => 'datetime',
        'date_activite'        => 'date',
        'est_interne'          => 'boolean',
        'conditions_acceptees' => 'boolean',
    ];

    // ── Accesseurs ────────────────────────────────────────────────────────────

    public function getStatutLabelAttribute(): string
    {
        return self::STATUT_LABELS[$this->statut] ?? $this->statut;
    }

    public function getStatutClassAttribute(): string
    {
        return self::STATUT_CLASSES[$this->statut] ?? 'bg-gray-100 text-gray-700';
    }

    public function isEnAttente(): bool { return $this->statut === 'en_attente'; }
    public function isApprouvee(): bool { return $this->statut === 'approuvee'; }
    public function isRejetee(): bool   { return $this->statut === 'rejetee'; }

    // ── Relations ─────────────────────────────────────────────────────────────

    public function user()  { return $this->belongsTo(User::class); }
    public function salle() { return $this->belongsTo(Salle::class); }
}

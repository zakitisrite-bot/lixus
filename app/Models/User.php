<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Rôles disponibles :
     *  - demandeur : citoyen / association
     *  - admin     : agent + directeur (validation en 1 étape)
     *  - ministre  : supervision, lecture seule
     */
    const ROLES = ['demandeur', 'admin', 'ministre'];

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'telephone',
        'nom_association',
        'fichier_legal',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    // ── Helpers de rôle ──────────────────────────────────────────────────────

    public function isAdmin(): bool      { return $this->role === 'admin'; }
    public function isMinistre(): bool   { return $this->role === 'ministre'; }
    public function isDemandeur(): bool  { return $this->role === 'demandeur'; }

    /** Accès au panneau d'administration */
    public function canAccessAdmin(): bool
    {
        return in_array($this->role, ['admin', 'ministre']);
    }

    // ── Relations ─────────────────────────────────────────────────────────────

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    // ── Vérification par code ─────────────────────────────────────────────────

    public function sendEmailVerificationNotification()
    {
        $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        $this->verification_code = $code;
        $this->save();

        \Illuminate\Support\Facades\Mail::to($this->email)->send(new \App\Mail\VerificationCodeMail($code));
    }
}

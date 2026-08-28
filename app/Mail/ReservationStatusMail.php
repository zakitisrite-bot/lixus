<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Reservation;

class ReservationStatusMail extends Mailable
{
    use Queueable, SerializesModels;

    public $reservation;

    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    public function envelope(): Envelope
    {
        $statut = $this->reservation->statut;

        if ($statut === 'approuvee') {
            $subject = '✅ Votre réservation a été approuvée — Centre Culturel Lixus';
        } elseif ($statut === 'rejetee') {
            $subject = '❌ Votre réservation a été refusée — Centre Culturel Lixus';
        } else {
            $subject = 'Mise à jour de votre réservation — Centre Culturel Lixus';
        }

        return new Envelope(subject: $subject);
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.reservations.status',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}

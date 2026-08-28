<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ], [
            'name.required'    => 'Veuillez entrer votre nom.',
            'email.required'   => 'Veuillez entrer votre adresse email.',
            'email.email'      => 'L\'adresse email n\'est pas valide.',
            'subject.required' => 'Veuillez entrer un sujet.',
            'message.required' => 'Veuillez entrer votre message.',
        ]);

        try {
            \App\Models\ContactMessage::create($validated);

            Mail::send([], [], function ($mail) use ($validated) {
                $mail->to('zakitisrite@gmail.com')
                     ->replyTo($validated['email'], $validated['name'])
                     ->subject('[Contact Lixus] ' . $validated['subject'])
                     ->html("
                        <div style='font-family: Georgia, serif; max-width: 600px; margin: 0 auto;'>
                            <div style='background: #000; padding: 24px 32px;'>
                                <h2 style='color: #97D2D4; font-weight: 300; margin: 0; font-size: 22px;'>Centre Culturel Lixus</h2>
                                <p style='color: #9D9D9D; margin: 4px 0 0; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase;'>Nouveau message de contact</p>
                            </div>
                            <div style='background: #f8f9fa; padding: 32px;'>
                                <table style='width: 100%; border-collapse: collapse;'>
                                    <tr><td style='padding: 8px 0; color: #9D9D9D; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 100px;'>De</td><td style='padding: 8px 0; font-size: 15px; color: #000;'>{$validated['name']}</td></tr>
                                    <tr><td style='padding: 8px 0; color: #9D9D9D; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;'>Email</td><td style='padding: 8px 0; font-size: 15px; color: #000;'><a href='mailto:{$validated['email']}' style='color: #C52034;'>{$validated['email']}</a></td></tr>
                                    <tr><td style='padding: 8px 0; color: #9D9D9D; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;'>Sujet</td><td style='padding: 8px 0; font-size: 15px; color: #000;'>{$validated['subject']}</td></tr>
                                </table>
                                <hr style='border: none; border-top: 1px solid #EDEDED; margin: 24px 0;'>
                                <p style='color: #9D9D9D; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;'>Message</p>
                                <p style='font-size: 15px; color: #3C3C3C; line-height: 1.7; white-space: pre-wrap;'>{$validated['message']}</p>
                            </div>
                            <div style='background: #000; padding: 16px 32px; text-align: center;'>
                                <p style='color: #9D9D9D; font-size: 11px; margin: 0;'>© " . date('Y') . " Centre Culturel Lixus — Larache, Maroc</p>
                            </div>
                        </div>
                     ");
            });

            return back()->with('success', 'Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.');
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Mail sending failed: ' . $e->getMessage());
            return back()->withErrors(['email' => 'Une erreur s\'est produite lors de l\'envoi (' . $e->getMessage() . '). Veuillez réessayer.']);
        }
    }
}

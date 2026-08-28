<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\ContactMessage;

class ReplyContactMessage extends Mailable
{
    use Queueable, SerializesModels;

    public $contactMessage;
    public $replyText;

    public function __construct(ContactMessage $contactMessage, string $replyText)
    {
        $this->contactMessage = $contactMessage;
        $this->replyText = $replyText;
    }

    public function build()
    {
        return $this->subject('RE: ' . $this->contactMessage->subject)
                    ->from(config('mail.from.address'), 'Centre Culturel LIXUS')
                    ->html("
                        <div style='font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #ededed;'>
                            <div style='background: #000; padding: 32px; text-align: center;'>
                                <h1 style='color: #FFFFFF; font-weight: 300; margin: 0; font-size: 28px; letter-spacing: 0.05em;'>LIXUS</h1>
                                <p style='color: #9D9D9D; margin: 8px 0 0; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;'>Centre Culturel — Larache</p>
                            </div>
                            <div style='padding: 40px 32px;'>
                                <p style='font-size: 16px; color: #000; margin-bottom: 24px;'>Bonjour <strong>{$this->contactMessage->name}</strong>,</p>
                                <p style='font-size: 16px; color: #3C3C3C; line-height: 1.8; margin-bottom: 32px; white-space: pre-wrap;'>{$this->replyText}</p>
                                <hr style='border: none; border-top: 1px solid #EDEDED; margin: 32px 0;'>
                                <p style='color: #9D9D9D; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;'>Rappel de votre message :</p>
                                <div style='background: #f8f9fa; padding: 20px; border-left: 3px solid #97D2D4;'>
                                    <p style='font-size: 14px; color: #666; margin: 0; font-style: italic; white-space: pre-wrap;'>{$this->contactMessage->message}</p>
                                </div>
                            </div>
                            <div style='background: #F8F9FA; padding: 24px 32px; text-align: center; border-top: 1px solid #EDEDED;'>
                                <p style='color: #9D9D9D; font-size: 12px; margin: 0;'>Centre Culturel Lixus<br>Avenue Mohammed V, Larache, Maroc</p>
                                <p style='color: #9D9D9D; font-size: 12px; margin: 8px 0 0;'><a href='" . config('app.url') . "' style='color: #C52034; text-decoration: none;'>www.lixusculture.ma</a></p>
                            </div>
                        </div>
                    ");
    }
}

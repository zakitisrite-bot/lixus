<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
            'codeSent' => session('code_sent', false),
            'sentEmail' => session('sent_email', ''),
        ]);
    }

    /**
     * Handle sending the 6-digit verification code via email.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ], [
            'email.exists' => 'Aucun compte n\'est associé à cette adresse email.',
            'email.required' => 'L\'adresse email est obligatoire.',
        ]);

        $code = str_pad(mt_rand(100000, 999999), 6, '0', STR_PAD_LEFT);
        
        session([
            'reset_email' => $request->email,
            'reset_code'  => $code,
            'code_sent'   => true,
            'sent_email'  => $request->email,
        ]);

        try {
            Mail::raw("Bonjour,\n\nVotre code de vérification pour réinitialiser votre mot de passe sur le Centre Culturel Lixus est : {$code}\n\nCe code est confidentiel. Ne le partagez avec personne.\n\nCordialement,\nCentre Culturel Lixus", function ($message) use ($request) {
                $message->to($request->email)
                        ->subject("Code de vérification - Centre Culturel Lixus");
            });
        } catch (\Throwable $e) {
            // Log mail error if any
            \Illuminate\Support\Facades\Log::error('Erreur envoi email: ' . $e->getMessage());
        }

        return back()->with([
            'status' => "Un code de vérification à 6 chiffres a été envoyé à l'adresse {$request->email}. Veuillez consulter votre boîte de réception (et vos spams).",
            'code_sent' => true,
            'sent_email' => $request->email,
        ]);
    }

    /**
     * Verify 6-digit code and reset password.
     */
    public function resetWithCode(Request $request): RedirectResponse
    {
        $request->validate([
            'email'    => 'required|email|exists:users,email',
            'code'     => 'required|string',
            'password' => 'required|string|min:6|confirmed',
        ], [
            'code.required' => 'Le code de vérification est obligatoire.',
            'password.min'  => 'Le mot de passe doit contenir au moins 6 chiffres / caractères.',
            'password.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
        ]);

        $cleanCode = preg_replace('/[^0-9]/', '', $request->code);
        $expectedCode = session('reset_code');

        if (!$expectedCode || $cleanCode !== $expectedCode) {
            throw ValidationException::withMessages([
                'code' => ['Code de vérification incorrect. Veuillez vérifier l\'email envoyé.'],
            ]);
        }

        $user = User::where('email', $request->email)->first();
        if ($user) {
            $user->password = Hash::make($request->password);
            $user->save();
        }

        session()->forget(['reset_code', 'reset_email', 'code_sent', 'sent_email']);

        return redirect()->route('login')->with('status', 'Votre mot de passe a été réinitialisé avec succès ! Vous pouvez maintenant vous connecter.');
    }
}

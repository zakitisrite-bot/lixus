<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReplyContactMessage;
use Inertia\Inertia;

class ContactMessageController extends Controller
{
    public function index()
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->paginate(15);
        return Inertia::render('Admin/Messages/Index', [
            'messages' => $messages
        ]);
    }

    public function show(ContactMessage $message)
    {
        if (!$message->read_at) {
            $message->update([
                'read_at' => now(),
                'status' => 'lu'
            ]);
        }

        return Inertia::render('Admin/Messages/Show', [
            'message' => $message
        ]);
    }

    public function reply(Request $request, ContactMessage $message)
    {
        $request->validate([
            'reply_message' => 'required|string',
        ], [
            'reply_message.required' => 'Veuillez saisir votre réponse.'
        ]);

        try {
            Mail::to($message->email)->send(new ReplyContactMessage($message, $request->reply_message));

            $message->update([
                'status' => 'répondu',
                'replied_at' => now()
            ]);

            return back()->with('success', 'Votre réponse a été envoyée avec succès.');
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Reply failed: ' . $e->getMessage());
            return back()->withErrors(['reply_message' => 'Erreur lors de l\'envoi de l\'email: ' . $e->getMessage()]);
        }
    }

    public function destroy(ContactMessage $message)
    {
        $message->delete();
        return redirect()->route('admin.messages.index')->with('success', 'Message supprimé avec succès.');
    }
}

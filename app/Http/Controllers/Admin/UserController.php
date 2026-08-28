<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index()
    {
        $utilisateurs = User::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Utilisateurs/Index', [
            'utilisateurs' => $utilisateurs
        ]);
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(User $utilisateur)
    {
        return Inertia::render('Admin/Utilisateurs/Edit', [
            'utilisateur' => $utilisateur
        ]);
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, User $utilisateur)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $utilisateur->id,
            'role' => 'required|string|in:user,admin,demandeur',
            'telephone' => 'nullable|string|max:20',
            'nom_association' => 'nullable|string|max:255',
        ]);

        $utilisateur->update($validated);

        return redirect()->route('admin.utilisateurs.index')->with('success', 'Utilisateur mis à jour avec succès.');
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(User $utilisateur)
    {
        // Supprimer les fichiers légaux s'ils existent (au cas où on gère les réservations/fichiers)
        if ($utilisateur->fichier_legal) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $utilisateur->fichier_legal));
        }
        
        $utilisateur->delete();

        return redirect()->route('admin.utilisateurs.index')->with('success', 'Utilisateur supprimé avec succès.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Galerie;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class GalerieController extends Controller
{
    public function index()
    {
        $galeries = Galerie::latest('created_at')->get();
        return Inertia::render('Admin/Galeries/Index', [
            'galeries' => $galeries
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Galeries/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|max:255',
            'status' => 'required|string',
            'media' => 'nullable|array',
            'media.*' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp,bmp,avif,mp4,mov,ogg,qt,webm|max:512000',
        ]);

        $mediaItems = [];
        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $file) {
                $path = $file->store('galerie', 'public');
                $mime = $file->getMimeType();
                $type = str_starts_with($mime, 'video/') ? 'video' : 'photo';
                $mediaItems[] = [
                    'type' => $type,
                    'url' => '/storage/' . $path
                ];
            }
        }
        $validated['media'] = $mediaItems;

        Galerie::create($validated);

        return redirect()->route('admin.galeries.index')->with('success', 'Images/Vidéos ajoutées à la galerie avec succès.');
    }

    public function edit(Galerie $galerie)
    {
        return Inertia::render('Admin/Galeries/Edit', [
            'galerie' => $galerie
        ]);
    }

    public function update(Request $request, Galerie $galerie)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|max:255',
            'status' => 'required|string',
            'media' => 'nullable|array',
            'media.*' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,webp,bmp,avif,mp4,mov,ogg,qt,webm|max:512000',
        ]);

        if ($request->hasFile('media')) {
            // Supprimer les anciens fichiers
            $oldMedia = $galerie->media ?? [];
            foreach ($oldMedia as $old) {
                if (!str_starts_with($old['url'], 'http')) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $old['url']));
                }
            }

            $mediaItems = [];
            foreach ($request->file('media') as $file) {
                $path = $file->store('galerie', 'public');
                $mime = $file->getMimeType();
                $type = str_starts_with($mime, 'video/') ? 'video' : 'photo';
                $mediaItems[] = [
                    'type' => $type,
                    'url' => '/storage/' . $path
                ];
            }
            $validated['media'] = $mediaItems;
        }

        $galerie->update($validated);

        return redirect()->route('admin.galeries.index')->with('success', 'Galerie mise à jour avec succès.');
    }

    public function destroy(Galerie $galerie)
    {
        $oldMedia = $galerie->media ?? [];
        foreach ($oldMedia as $old) {
            if (!str_starts_with($old['url'], 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $old['url']));
            }
        }
        $galerie->delete();

        return redirect()->route('admin.galeries.index')->with('success', 'Élément supprimé avec succès.');
    }
}

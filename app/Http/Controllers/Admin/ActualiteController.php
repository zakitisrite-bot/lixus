<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Actualite;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ActualiteController extends Controller
{
    public function index()
    {
        $actualites = Actualite::latest('created_at')->get();
        return Inertia::render('Admin/Actualites/Index', [
            'actualites' => $actualites
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Actualites/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'publication_date' => 'nullable|date',
            'status' => 'required|string',
            'is_featured' => 'boolean',
            'images' => 'nullable|array',
            'images.*' => 'file|mimetypes:image/jpeg,image/png,image/jpg,image/gif,image/svg+xml,image/webp,image/bmp,image/avif,video/mp4,video/webm,video/ogg|max:512000',
        ]);

        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('actualites', 'public');
                $imagePaths[] = '/storage/' . $path;
            }
        }
        $validated['images'] = empty($imagePaths) ? null : $imagePaths;

        Actualite::create($validated);

        return redirect()->route('admin.actualites.index')->with('success', 'Actualité créée avec succès.');
    }

    public function edit(Actualite $actualite)
    {
        return Inertia::render('Admin/Actualites/Edit', [
            'actualite' => $actualite
        ]);
    }

    public function update(Request $request, Actualite $actualite)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'publication_date' => 'nullable|date',
            'status' => 'required|string',
            'is_featured' => 'boolean',
            'existing_images' => 'nullable|array',
            'existing_images.*' => 'string',
            'images' => 'nullable|array',
            'images.*' => 'file|mimetypes:image/jpeg,image/png,image/jpg,image/gif,image/svg+xml,image/webp,image/bmp,image/avif,video/mp4,video/webm,video/ogg|max:512000',
        ]);

        if ($request->hasFile('images')) {
            if ($actualite->images) {
                foreach ($actualite->images as $img) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $img));
                }
            }
            $imagePaths = [];
            foreach ($request->file('images') as $file) {
                $path = $file->store('actualites', 'public');
                $imagePaths[] = '/storage/' . $path;
            }
            $validated['images'] = $imagePaths;
        } else {
            if ($request->has('existing_images')) {
                // The user may have reordered the existing images
                $validated['images'] = $request->input('existing_images');
            } else {
                unset($validated['images']);
            }
        }

        unset($validated['existing_images']);

        $actualite->update($validated);

        return redirect()->route('admin.actualites.index')->with('success', 'Actualité mise à jour avec succès.');
    }

    public function destroy(Actualite $actualite)
    {
        if ($actualite->images) {
            foreach ($actualite->images as $img) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $img));
            }
        }
        $actualite->delete();

        return redirect()->route('admin.actualites.index')->with('success', 'Actualité supprimée avec succès.');
    }

    public function feature(Actualite $actualite)
    {
        if ($actualite->is_featured) {
            $actualite->update(['is_featured' => false]);
            return redirect()->back()->with('success', 'L\'actualité n\'est plus à la une.');
        } else {
            Actualite::where('id', '!=', $actualite->id)->update(['is_featured' => false]);
            $actualite->update(['is_featured' => true]);
            return redirect()->back()->with('success', 'L\'actualité a été mise à la une.');
        }
    }

    public function toggleHome(Actualite $actualite)
    {
        $actualite->update(['show_on_home' => !$actualite->show_on_home]);
        $message = $actualite->show_on_home ? 'L\'actualité sera affichée sur l\'accueil.' : 'L\'actualité ne sera plus affichée sur l\'accueil.';
        return redirect()->back()->with('success', $message);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Salle;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SalleController extends Controller
{
    public function index()
    {
        $salles = Salle::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Salles/Index', [
            'salles' => $salles
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Salles/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom_salle'   => 'required|string|max:255',
            'description' => 'nullable|string',
            'capacite'    => 'required|integer|min:1',
            'equipements' => 'nullable|string',
            'image'       => 'nullable|image|max:10240', // 10MB, ALL image extensions
            'images_salle'=> 'nullable|array',
            'images_salle.*'=>'image|max:10240',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('salles', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        if ($request->hasFile('images_salle')) {
            $images_salle = [];
            foreach ($request->file('images_salle') as $file) {
                $path = $file->store('salles', 'public');
                $images_salle[] = '/storage/' . $path;
            }
            $validated['images_salle'] = $images_salle;
        }

        // Convert comma-separated equipements to array
        $validated['equipements'] = $validated['equipements']
            ? array_map('trim', explode(',', $validated['equipements']))
            : [];

        Salle::create($validated);

        return redirect()->route('admin.salles.index')->with('success', 'Salle ajoutée avec succès.');
    }

    public function edit(Salle $salle)
    {
        return Inertia::render('Admin/Salles/Edit', [
            'salle' => $salle
        ]);
    }

    public function update(Request $request, Salle $salle)
    {
        $validated = $request->validate([
            'nom_salle'   => 'required|string|max:255',
            'description' => 'nullable|string',
            'capacite'    => 'required|integer|min:1',
            'equipements' => 'nullable|string',
            'image'       => 'nullable|image|max:10240', // 10MB, ALL image extensions
            'images_salle'=> 'nullable|array',
            'images_salle.*'=>'image|max:10240',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($salle->image && str_starts_with($salle->image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $salle->image));
            }
            $path = $request->file('image')->store('salles', 'public');
            $validated['image'] = '/storage/' . $path;
        } else {
            // Keep existing image
            unset($validated['image']);
        }

        if ($request->hasFile('images_salle')) {
            // Delete old gallery
            if ($salle->images_salle && is_array($salle->images_salle)) {
                foreach ($salle->images_salle as $old_image) {
                    if (str_starts_with($old_image, '/storage/')) {
                        Storage::disk('public')->delete(str_replace('/storage/', '', $old_image));
                    }
                }
            }
            $images_salle = [];
            foreach ($request->file('images_salle') as $file) {
                $path = $file->store('salles', 'public');
                $images_salle[] = '/storage/' . $path;
            }
            $validated['images_salle'] = $images_salle;
        } else {
            unset($validated['images_salle']);
        }

        $validated['equipements'] = $validated['equipements']
            ? array_map('trim', explode(',', $validated['equipements']))
            : [];

        $salle->update($validated);

        return redirect()->route('admin.salles.index')->with('success', 'Salle mise à jour avec succès.');
    }

    public function destroy(Salle $salle)
    {
        if ($salle->image && str_starts_with($salle->image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $salle->image));
        }
        if ($salle->images_salle && is_array($salle->images_salle)) {
            foreach ($salle->images_salle as $old_image) {
                if (str_starts_with($old_image, '/storage/')) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $old_image));
                }
            }
        }
        $salle->delete();

        return redirect()->route('admin.salles.index')->with('success', 'Salle supprimée avec succès.');
    }
}

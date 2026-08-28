<?php

namespace App\Http\Controllers;

use App\Models\Actualite;
use App\Services\TranslationService;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class ActualitePublicController extends Controller
{
    public function index()
    {
        $actualites = [];
        try {
            if (Schema::hasTable('actualites')) {
                $actualites = Actualite::orderBy('is_featured', 'desc')
                    ->orderBy('created_at', 'desc')
                    ->where('status', 'publié')
                    ->get()
                    ->map(function ($a) {
                        $translatedTitle    = TranslationService::translate($a->title);
                        $translatedCategory = TranslationService::translate($a->category);
                        $translatedDesc     = TranslationService::translate($a->description);
                        return [
                            'id'               => $a->id,
                            'title'            => $translatedTitle,
                            'category'         => $translatedCategory,
                            'date'             => optional($a->publication_date)->format('d M Y') ?? $a->created_at->format('d M Y'),
                            'excerpt'          => \Illuminate\Support\Str::limit(strip_tags($translatedDesc), 200),
                            'description'      => $translatedDesc,
                            'images'           => $a->images,
                            'status'           => TranslationService::translate($a->status),
                            'is_featured'      => $a->is_featured,
                        ];
                    });
            }
        } catch (\Exception $e) {
            $actualites = [];
        }

        return Inertia::render('Actualites', [
            'actualites' => $actualites,
        ]);
    }

    public function show($id)
    {
        try {
            $actualite = Actualite::findOrFail($id);
            return Inertia::render('Actualites/Show', [
                'actualite' => [
                    'id'          => $actualite->id,
                    'title'       => TranslationService::translate($actualite->title),
                    'category'    => TranslationService::translate($actualite->category),
                    'date'        => optional($actualite->publication_date)->format('d M Y') ?? $actualite->created_at->format('d M Y'),
                    'description' => TranslationService::translate($actualite->description),
                    'images'      => $actualite->images,
                    'status'      => TranslationService::translate($actualite->status),
                ],
            ]);
        } catch (\Exception $e) {
            return redirect()->route('actualites.index')->with('error', 'Article introuvable.');
        }
    }
}

<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\Admin\ActualiteController;
use App\Http\Controllers\ActualitePublicController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\Actualite;
use Illuminate\Support\Facades\Schema;

use App\Services\TranslationService;

Route::get('/', function () {
    $actualites = [];
    try {
        if (Schema::hasTable('actualites')) {
            $actualites = Actualite::where('show_on_home', true)
                ->where('status', 'publié')
                ->latest('created_at')
                ->take(4)
                ->get()
                ->map(function ($a) {
                    $tTitle    = TranslationService::translate($a->title);
                    $tCategory = TranslationService::translate($a->category);
                    $tDesc     = TranslationService::translate($a->description);
                    return [
                        'id'          => $a->id,
                        'title'       => $tTitle,
                        'category'    => $tCategory,
                        'date'        => optional($a->publication_date)->format('d M Y') ?? $a->created_at->format('d M Y'),
                        'excerpt'     => \Illuminate\Support\Str::limit(strip_tags($tDesc), 200),
                        'description' => $tDesc,
                        'images'      => $a->images,
                        'is_featured' => $a->is_featured,
                    ];
                });
        }
    } catch (\Exception $e) {
        $actualites = [];
    }

    $stats = [
        'eventsCount' => 0,
        'sallesCount' => 0,
        'reservationsCount' => 0,
        'usersCount' => 0,
    ];

    try {
        if (Schema::hasTable('agendas')) {
            $stats['eventsCount'] = \App\Models\Agenda::count();
        }
        if (Schema::hasTable('salles')) {
            $stats['sallesCount'] = \App\Models\Salle::count();
        }
        if (Schema::hasTable('reservations')) {
            $stats['reservationsCount'] = \App\Models\Reservation::where('statut', 'approuvee')->count();
        }
        if (Schema::hasTable('users')) {
            $stats['usersCount'] = \App\Models\User::count();
        }
    } catch (\Exception $e) {
        // Fallback to 0 if any DB issue
    }

    return Inertia::render('Welcome', [
        'actualites' => $actualites,
        'stats' => $stats,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/salles', [App\Http\Controllers\SallePublicController::class, 'index'])->name('salles.index');
Route::get('/salles/{id}', [App\Http\Controllers\SallePublicController::class, 'show'])->name('salles.show');

Route::get('/agenda', [App\Http\Controllers\AgendaController::class, 'index'])->name('agenda.index');

Route::get('/agenda/{id}', [App\Http\Controllers\AgendaController::class, 'show'])->name('agenda.show');

Route::get('/galerie', function () {
    $galeries = [];
    try {
        if (\Illuminate\Support\Facades\Schema::hasTable('galeries')) {
            $galeries = \App\Models\Galerie::latest('created_at')->get()->map(function ($g) {
                return [
                    'id'          => $g->id,
                    'title'       => TranslationService::translate($g->title),
                    'category'    => TranslationService::translate($g->category),
                    'description' => TranslationService::translate($g->description),
                    'media'       => $g->media,
                    'created_at'  => $g->created_at,
                ];
            });
        }
    } catch (\Exception $e) {
        $galeries = [];
    }

    return Inertia::render('Galerie', [
        'galeries' => $galeries
    ]);
});

Route::get('/galerie/{id}', function ($id) {
    $g = \App\Models\Galerie::findOrFail($id);

    return Inertia::render('Galerie/Show', [
        'galerie' => [
            'id'          => $g->id,
            'title'       => TranslationService::translate($g->title),
            'category'    => TranslationService::translate($g->category),
            'description' => TranslationService::translate($g->description),
            'media'       => $g->media,
            'created_at'  => $g->created_at,
        ]
    ]);
})->name('galerie.show');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');
Route::post('/contact', [\App\Http\Controllers\ContactController::class, 'send'])->name('contact.send');

Route::get('/actualites', [ActualitePublicController::class, 'index'])->name('actualites.index');
Route::get('/actualites/{id}', [ActualitePublicController::class, 'show'])->name('actualites.show');

Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])
    ->middleware(['auth', 'admin'])
    ->name('dashboard');

// Espace Ministre (lecture seule)
Route::get('/ministre', [\App\Http\Controllers\MinistreController::class, 'dashboard'])
    ->middleware(['auth'])
    ->name('ministre.index');
Route::get('/ministre/dashboard', [\App\Http\Controllers\MinistreController::class, 'dashboard'])
    ->middleware(['auth'])
    ->name('ministre.dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Pages — protected by admin middleware
    Route::middleware('admin')->group(function () {
        Route::prefix('admin')->name('admin.')->group(function () {
            Route::resource('reservations', \App\Http\Controllers\Admin\ReservationController::class)->only(['index', 'update', 'destroy']);
            Route::patch('reservations/{reservation}/status', [\App\Http\Controllers\Admin\ReservationController::class, 'updateStatus'])->name('reservations.updateStatus');
            Route::resource('salles', \App\Http\Controllers\Admin\SalleController::class);
            Route::resource('actualites', ActualiteController::class);
            Route::patch('actualites/{actualite}/feature', [ActualiteController::class, 'feature'])->name('actualites.feature');
            Route::patch('actualites/{actualite}/toggleHome', [ActualiteController::class, 'toggleHome'])->name('actualites.toggleHome');
            Route::resource('agendas', \App\Http\Controllers\Admin\AgendaController::class);
            Route::resource('galeries', \App\Http\Controllers\Admin\GalerieController::class)->parameters([
                'galeries' => 'galerie'
            ]);
            Route::resource('utilisateurs', \App\Http\Controllers\Admin\UserController::class)->except(['create', 'store']);
            Route::get('messages', [\App\Http\Controllers\Admin\ContactMessageController::class, 'index'])->name('messages.index');
            Route::get('messages/{message}', [\App\Http\Controllers\Admin\ContactMessageController::class, 'show'])->name('messages.show');
            Route::post('messages/{message}/reply', [\App\Http\Controllers\Admin\ContactMessageController::class, 'reply'])->name('messages.reply');
            Route::delete('messages/{message}', [\App\Http\Controllers\Admin\ContactMessageController::class, 'destroy'])->name('messages.destroy');
        });
    });

    // Réservations
    Route::middleware('verified')->group(function () {
        Route::get('/reservation', [ReservationController::class, 'create'])->name('reservations.create');
        Route::post('/reservation', [ReservationController::class, 'store'])->name('reservations.store');

        // Espace Demandeur : mes réservations
        Route::get('/mes-reservations', [\App\Http\Controllers\UserReservationController::class, 'index'])
            ->name('user.reservations');
    });
});

Route::post('/language', function (\Illuminate\Http\Request $request) {
    $request->validate(['locale' => 'required|string|in:fr,ar,zgh']);
    session()->put('locale', $request->locale);
    return back();
})->name('language.switch');

// API Routes internes pour le calendrier
Route::get('/api/salles/{salle}/dates-indisponibles', [\App\Http\Controllers\Api\SalleApiController::class, 'datesIndisponibles'])
    ->name('api.salles.dates-indisponibles');

require __DIR__ . '/auth.php';

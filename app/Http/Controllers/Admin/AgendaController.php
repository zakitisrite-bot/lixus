<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agenda;
use App\Rules\SalleLibreEvent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AgendaController extends Controller
{
    public function index()
    {
        $agendas = Agenda::orderBy('event_date', 'asc')->get();
        return Inertia::render('Admin/Agenda/Index', [
            'agendas' => $agendas
        ]);
    }

    public function create()
    {
        $salles = \App\Models\Salle::all();
        return Inertia::render('Admin/Agenda/Create', [
            'salles' => $salles
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_date'  => ['required', 'date', new SalleLibreEvent(
                                $request->salle_id,
                                $request->event_date
                             )],
            'event_time'     => 'nullable|date_format:H:i',
            'event_end_time' => 'nullable|date_format:H:i|after:event_time',
            'location'       => 'nullable|string|max:255',
            'category'       => 'required|string|max:255',
            'status'         => 'required|string',
            'salle_id'       => 'nullable|exists:salles,id',
            'image'          => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp,bmp,avif|max:5120',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('agendas', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        Agenda::create($validated);

        return redirect()->route('admin.agendas.index')->with('success', 'Événement ajouté avec succès.');
    }

    public function edit(Agenda $agenda)
    {
        $salles = \App\Models\Salle::all();
        return Inertia::render('Admin/Agenda/Edit', [
            'agenda' => $agenda,
            'salles' => $salles
        ]);
    }

    public function update(Request $request, Agenda $agenda)
    {
        $validated = $request->validate([
            'title'          => 'required|string|max:255',
            'description'    => 'nullable|string',
            'event_date'     => ['required', 'date', new SalleLibreEvent(
                                    $request->salle_id,
                                    $request->event_date,
                                    $agenda->id
                                 )],
            'event_time'     => 'nullable|date_format:H:i',
            'event_end_time' => 'nullable|date_format:H:i|after:event_time',
            'location'       => 'nullable|string|max:255',
            'category'       => 'required|string|max:255',
            'status'         => 'required|string',
            'salle_id'       => 'nullable|exists:salles,id',
            'image'          => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp,bmp,avif|max:5120',
        ]);

        if ($request->hasFile('image')) {
            if ($agenda->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $agenda->image));
            }
            $path = $request->file('image')->store('agendas', 'public');
            $validated['image'] = '/storage/' . $path;
        }

        $agenda->update($validated);

        return redirect()->route('admin.agendas.index')->with('success', 'Événement mis à jour avec succès.');
    }

    public function destroy(Agenda $agenda)
    {
        if ($agenda->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $agenda->image));
        }
        $agenda->delete();

        return redirect()->route('admin.agendas.index')->with('success', 'Événement supprimé avec succès.');
    }
}

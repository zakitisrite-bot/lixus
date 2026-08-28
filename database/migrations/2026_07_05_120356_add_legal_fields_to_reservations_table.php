<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->string('nom_association')->nullable();
            $table->string('cin_responsable')->nullable();
            $table->string('fichiers_legaux')->nullable();
            $table->boolean('conditions_acceptees')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropColumn(['nom_association', 'cin_responsable', 'fichiers_legaux', 'conditions_acceptees']);
        });
    }
};

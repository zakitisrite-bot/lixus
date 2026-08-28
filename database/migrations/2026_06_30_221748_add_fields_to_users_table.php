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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['demandeur', 'admin', 'dir_regional', 'ministre'])->default('demandeur');
            $table->string('telephone')->nullable();
            $table->string('nom_association')->nullable();
            $table->string('fichier_legal')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'telephone', 'nom_association', 'fichier_legal']);
        });
    }
};

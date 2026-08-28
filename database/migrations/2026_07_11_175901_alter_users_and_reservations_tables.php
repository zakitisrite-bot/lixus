<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Workflow à 2 étapes :
     *   demandeur → soumet → en_attente_admin
     *   admin      → valide → validee_admin
     *   directeur  → approuve → approuvee_finale
     *   admin|dir  → refuse → rejetee (+ motif_refus obligatoire)
     */
    public function up(): void
    {
        // ─── 1. USERS : mise à jour du rôle ───────────────────────────────────
        // MySQL ne supporte pas ALTER COLUMN ENUM directement, on utilise CHANGE via raw SQL.
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('demandeur','admin','directeur','ministre') NOT NULL DEFAULT 'demandeur'");

        // ─── 2. RESERVATIONS : mise à jour du statut ──────────────────────────
        // Étape 1 : Mettre tous les anciens statuts vers 'en_attente_admin' (via varchar temporaire)
        DB::statement("ALTER TABLE reservations MODIFY COLUMN statut VARCHAR(50) NOT NULL DEFAULT 'en_attente_admin'");

        // Normaliser les anciennes valeurs vers les nouvelles
        DB::statement("UPDATE reservations SET statut = 'en_attente_admin'    WHERE statut IN ('en_attente')");
        DB::statement("UPDATE reservations SET statut = 'validee_admin'       WHERE statut IN ('valide_admin')");
        DB::statement("UPDATE reservations SET statut = 'approuvee_finale'    WHERE statut IN ('valide_finalement')");
        DB::statement("UPDATE reservations SET statut = 'rejetee'             WHERE statut IN ('refuse')");

        // Étape 2 : Reconvertir en ENUM avec les nouvelles valeurs
        DB::statement("ALTER TABLE reservations MODIFY COLUMN statut ENUM('en_attente_admin','validee_admin','approuvee_finale','rejetee') NOT NULL DEFAULT 'en_attente_admin'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revenir aux anciens ENUMs
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('demandeur','admin','dir_regional','ministre') NOT NULL DEFAULT 'demandeur'");

        DB::statement("ALTER TABLE reservations MODIFY COLUMN statut VARCHAR(50) NOT NULL DEFAULT 'en_attente'");
        DB::statement("UPDATE reservations SET statut = 'en_attente'       WHERE statut = 'en_attente_admin'");
        DB::statement("UPDATE reservations SET statut = 'valide_admin'     WHERE statut = 'validee_admin'");
        DB::statement("UPDATE reservations SET statut = 'valide_finalement' WHERE statut = 'approuvee_finale'");
        DB::statement("UPDATE reservations SET statut = 'refuse'           WHERE statut = 'rejetee'");

        DB::statement("ALTER TABLE reservations MODIFY COLUMN statut ENUM('en_attente','valide_admin','valide_finalement','refuse') NOT NULL DEFAULT 'en_attente'");
    }
};

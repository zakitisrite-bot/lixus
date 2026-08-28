<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Simplification :
     *  - users.role : demandeur | admin | ministre  (on supprime 'directeur')
     *  - reservations.statut : en_attente | approuvee | rejetee  (workflow 1 étape)
     */
    public function up(): void
    {
        // ── 1. USERS : réduire les rôles ──────────────────────────────────────
        // Convertir 'directeur' → 'admin' si quelqu'un avait ce rôle
        DB::statement("UPDATE users SET role = 'admin' WHERE role = 'directeur'");
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('demandeur','admin','ministre') NOT NULL DEFAULT 'demandeur'");

        // ── 2. RESERVATIONS : simplifier les statuts ──────────────────────────
        // D'abord passer en varchar pour pouvoir migrer les données
        DB::statement("ALTER TABLE reservations MODIFY COLUMN statut VARCHAR(50) NOT NULL DEFAULT 'en_attente'");

        // Normaliser toutes les anciennes valeurs vers les 3 nouvelles
        DB::statement("UPDATE reservations SET statut = 'en_attente' WHERE statut IN ('en_attente_admin','validee_admin')");
        DB::statement("UPDATE reservations SET statut = 'approuvee'  WHERE statut IN ('approuvee_finale','valide_finalement','valide_admin')");
        DB::statement("UPDATE reservations SET statut = 'rejetee'    WHERE statut IN ('refuse','rejected')");
        // Sécurité : tout ce qui reste → en_attente
        DB::statement("UPDATE reservations SET statut = 'en_attente' WHERE statut NOT IN ('en_attente','approuvee','rejetee')");

        // Reconvertir en ENUM strict
        DB::statement("ALTER TABLE reservations MODIFY COLUMN statut ENUM('en_attente','approuvee','rejetee') NOT NULL DEFAULT 'en_attente'");
    }

    public function down(): void
    {
        // Retour aux valeurs précédentes
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('demandeur','admin','directeur','ministre') NOT NULL DEFAULT 'demandeur'");
        DB::statement("ALTER TABLE reservations MODIFY COLUMN statut ENUM('en_attente_admin','validee_admin','approuvee_finale','rejetee') NOT NULL DEFAULT 'en_attente_admin'");
    }
};

# 🏛️ Support de Soutenance de Projet de Stage (11 Slides / 25 Minutes)
## Plateforme Web de Gestion d'Agenda & Réservation de Salles (Moteur Anti-Double Booking)
**Établissement** : Centre Culturel Lixus (Larache)  
**Réalisé par** : Zakariae Tisrite & Achraf El Morabit  
**Encadré par** : Youness Zbair  
**Diplôme** : TSDI (2025/2026)

---

## 📌 1. Page de Garde
- **Badge** : SOUTENANCE DE PROJET DE STAGE TSDI — 25 MIN
- **Titre** : Gestion d'Agenda & Réservation de Salles
- **Sous-titre** : Plateforme Web et Moteur Anti-Double Booking — Centre Culturel Lixus (Larache)
- **Réalisé par** : Zakariae Tisrite & Achraf El Morabit
- **Encadré par** : Youness Zbair
- **Année Académique** : 2025 / 2026

---

## 📖 2. Sommaire
1. Page de Garde
2. Sommaire
3. Introduction
4. Contexte et Problématique
5. Objectifs du Projet
6. Architecture du Système
7. Diagrammes avec Description (5 jomal)
8. Technologies Utilisées
9. Fonctionnalités Principales
10. Démonstration de la Plateforme
11. Conclusion et Remerciements

---

## 🌐 3. Introduction
> Le développement fulgurant des technologies de l'information a profondément transformé les modes de gestion des institutions. La transition numérique est devenue une nécessité impérieuse pour garantir l'efficacité et la transparence. C'est dans ce cadre de modernisation que s'inscrit notre projet de fin d'études TSDI. Nous avons collaboré avec le Centre Culturel Lixus à Larache, une institution phare dédiée à la culture, dotée de vastes infrastructures et sollicitée par plus de 120 associations locales.

---

## ⚠️ 4. Contexte et Problématique
- **Lourdeur & Lenteur** : La gestion des infrastructures reposait sur des registres papier (5 à 10 jours de traitement manuel).
- **Conflits d'Agendas** : Risque permanent de doubles réservations (Double Booking).
- **Opacité Publique** : Le grand public n'avait aucune visibilité en temps réel sur les événements et les salles.
- **Déficit de Suivi** : Absence de tableaux de bord pour la supervision de l'activité du centre par le ministère.

---

## 🎯 5. Objectifs du Projet
- **Dématérialisation totale** : Dépôt en ligne des demandes et des justificatifs légaux. (Objectif : 100% zéro papier).
- **Gestion centralisée** : Création d'un agenda numérique interactif anti-conflit.
- **Workflow hiérarchisé** : Système de rôles rigoureux pour la validation administrative et la supervision.
- **Vitrine interactive** : Un espace attrayant augmentant l'engagement public.

---

## 🏗️ 6. Architecture du Système
- **Architecture MVC** : Séparation de la logique métier (Backend Laravel) de l'interface utilisateur réactive (Frontend React).
- **Cartographie des Acteurs** :
  - **Public (Visiteur)** : Accès consultatif à l'Agenda.
  - **Demandeur** : Authentifié pour la réservation.
  - **Administrateur** : Validation et gestion CRUD.
  - **Ministre** : Accès exclusif aux statistiques (KPIs).

---

## 📐 7. Diagrammes et Modélisation
*Présentation des 4 diagrammes : Cas d'utilisation, Séquence, Classes, et MLD.*
**Description en 5 phrases (Jomal) :**
1. Le diagramme de cas d'utilisation définit les interactions des quatre acteurs principaux avec la plateforme.
2. Le diagramme de séquence illustre le workflow rigoureux de validation d'une réservation étape par étape.
3. Le diagramme de classes structure conceptuellement les entités fondamentales comme l'Utilisateur, la Salle et la Réservation.
4. Le Modèle Logique de Données (MLD) garantit l'intégrité référentielle et les relations strictes dans la base de données.
5. L'ensemble de cette modélisation assure un système robuste, sécurisé et protégé contre les doubles réservations.

---

## 💻 8. Technologies Utilisées
- **Laravel 11** : Sécurité intégrée, ORM Eloquent, RAD pour la logique serveur.
- **React.js** : DOM virtuel et composants pour une interface SPA fluide.
- **Tailwind CSS** : Design sur-mesure "utility-first" adapté à l'institution.
- **MySQL** : Base de données relationnelle sécurisant les transactions.

---

## ⚡ 9. Fonctionnalités Principales
- **Moteur Anti-Double Booking** : Verrous concurrentiels empêchant strictement l'approbation de deux événements sur le même créneau.
- **Agenda Dynamique & Galeries** : Grille mensuelle interactive, filtres par salle, infobulles et galeries photos en Lightbox.
- **Sécurité OTP & Téléversement** : Authentification par code OTP (Gmail SMTP) et téléversement sécurisé des fichiers légaux.

---

## 🖥️ 10. Démonstration de la Plateforme (Live Demo)
**Live Demo de l'Application** (`http://127.0.0.1:8000`) :
1. Exploration de la vitrine et de l'Agenda.
2. Soumission d'une réservation avec pièce jointe.
3. Validation par l'administrateur (test anti-conflit).
4. Affichage des statistiques Ministre.

---

## 🏁 11. Conclusion et Remerciements
### Bilan du Stage
> Ce projet a répondu à 100% aux exigences du Centre Culturel Lixus en dématérialisant les procédures et en éliminant les conflits d'agenda. Il a consolidé nos compétences Full-Stack et constitue un tremplin pour notre carrière TSDI.

### Remerciements
> Merci pour votre attention. Nous remercions la direction du Centre Lixus, notre encadrant M. Youness Zbair, et le corps professoral TSDI. (Ouverture aux questions du jury).

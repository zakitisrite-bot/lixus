# 🏛️ RAPPORT DE STAGE DE FIN D'ÉTUDES (TSDI)
## Plateforme Web de Gestion d'Agenda & Moteur Anti-Double Booking
**Organisme d'accueil** : Centre Culturel Lixus (Larache)  
**Réalisé par** : Zakariae Tisrite & Achraf El Morabit  
**Encadré par** : Youness Zbair  
**Diplôme visé** : Technicien Spécialisé en Développement Informatique (TSDI)  
**Année Académique** : 2025 / 2026  

---

## 📜 DÉDICACES

### À nos chers parents,
Aucune dédicace ne saurait exprimer l'amour, l'estime et le respect que nous vous portons. Vos sacrifices, votre soutien inconditionnel et vos prières ont été pour nous le plus grand des réconforts. Puisse ce travail être le couronnement de vos efforts et la source de votre fierté.

### À nos frères, sœurs et amis,
Pour vos encouragements constants, votre présence à nos côtés et les moments partagés. Merci de nous avoir soutenus dans les moments de doute.

### À nos formateurs et enseignants,
Pour la qualité de vos enseignements et les valeurs que vous nous avez transmises.

*Zakariae Tisrite et Achraf El Morabit*

---

## 🤝 REMERCIEMENTS

Avant d'entamer la présentation de ce rapport, il nous est particulièrement agréable d'exprimer notre profonde gratitude envers toutes les personnes qui ont contribué, de près ou de loin, à l'aboutissement de ce travail.

Nous tenons tout d'abord à adresser nos vifs remerciements à la direction du **Centre Culturel Lixus**, pour nous avoir accueillis au sein de son établissement et nous avoir accordé sa confiance en nous confiant la réalisation de cette plateforme numérique.

Nous exprimons notre reconnaissance particulière à notre encadrant de stage, **Monsieur Youness Zbair**, pour son accompagnement, sa disponibilité, ses conseils judicieux et son aide inestimable tout au long du développement de ce projet.

Nos remerciements vont également à l'ensemble du corps professoral et administratif de notre institut, pour la qualité de la formation théorique et pratique que nous avons reçue en vue de l'obtention de notre diplôme de **Technicien Spécialisé en Développement Informatique (TSDI)**.

Enfin, merci à toutes celles et ceux qui ont cru en nous et qui ont rendu cette expérience formatrice et enrichissante possible.

---

## 🌐 1. INTRODUCTION GÉNÉRALE

Le développement fulgurant des technologies de l'information et de la communication a profondément transformé les modes de gestion au sein des institutions, qu'elles soient publiques ou privées. Aujourd'hui, la transition numérique n'est plus un simple avantage concurrentiel, mais une nécessité impérieuse pour garantir l'efficacité, la transparence et l'accessibilité des services. C'est dans ce contexte de modernisation technologique que s'inscrit notre projet de fin d'études, réalisé en vue de l'obtention du diplôme de **Technicien Spécialisé en Développement Informatique (TSDI)**.

Durant notre période de stage, nous avons eu l'opportunité de collaborer avec le **Centre Culturel Lixus**, une institution phare dédiée à la promotion de l'art, de l'éducation et de la culture. Notre mission principale a consisté à concevoir et à développer une plateforme web de gestion et de réservation sur mesure, destinée à dématérialiser et à optimiser les processus administratifs du centre.

Ce rapport détaille les différentes phases de la réalisation de ce projet :
- **Chapitre 1** : Présentation de l'organisme d'accueil, des problématiques rencontrées avec le système traditionnel et des objectifs fixés.
- **Chapitre 2** : Étude technique et comparative approfondie des choix technologiques adoptés (Laravel 11, React.js, Tailwind CSS, MySQL).
- **Chapitre 3** : Phase d'analyse et de conception modélisant les besoins fonctionnels et l'architecture du système (UML & MLD).
- **Chapitre 4** : Phase de réalisation exposant les interfaces développées, l'expérience utilisateur et les fonctionnalités clés (Moteur anti-double booking, Espace sécurisé par code OTP, Dashboard Ministre).
- **Conclusion Générale** : Bilan du stage et perspectives professionnelles.

---

## 🏛️ CHAPITRE 1 : Présentation du Centre Culturel et Rôle de la Plateforme

### 1. Présentation du Centre Culturel Lixus
Le Centre Culturel Lixus est un établissement de renommée dédié à l'enrichissement intellectuel et artistique de la région. Agissant comme un véritable carrefour de rencontres, d'échanges et d'apprentissage, le centre propose tout au long de l'année une programmation riche et diversifiée. Ses installations comprennent notamment :
- **Un Grand Auditorium** (500 places) : Spectacles, opéras, pièces de théâtre et grands concerts.
- **Une Salle Polyvalente** : Ateliers pédagogiques, formations et réunions publiques.
- **Une Salle de Réunion** : Conférences administratives et comités exécutifs.
- **Une Galerie d'Exposition** : Expositions d'art visuel et vernissages.

En plus de sa programmation interne, le Centre Culturel Lixus met ses infrastructures à la disposition de divers acteurs externes (associations, citoyens, professionnels) qui souhaitent y organiser des événements. Le centre joue ainsi un rôle crucial dans le développement du tissu associatif et culturel local (plus de 120 associations partenaires).

### 2. Problématique et limites de la gestion actuelle
Avant notre intervention, la gestion des infrastructures et de la programmation du Centre Culturel Lixus reposait sur des méthodes traditionnelles, principalement manuelles et basées sur des supports papier :

1. **Lourdeur administrative et lenteur des processus** : Les demandes de réservation nécessitaient le déplacement physique des demandeurs, le dépôt de dossiers papier et un traitement manuel entraînant des délais de 5 à 10 jours.
2. **Risque d'erreurs et de conflits d'agendas (Double Booking)** : La gestion manuelle augmentait le risque de chevauchement d'événements dans une même salle, de perte de pièces légales et de confusion dans le planning.
3. **Manque de visibilité pour le grand public** : Absence de portail centralisé actualisé en temps réel pour consulter les événements à venir ou les salles disponibles.
4. **Déficit d'outils de suivi pour la direction** : La hiérarchie (direction et tutelle ministérielle) manquait de tableaux de bord centralisés offrant une vue d'ensemble sur le taux d'occupation des salles et le volume des événements.

### 3. Le rôle de la plateforme web et objectifs du projet
- **Dématérialisation et automatisation des demandes** : Espace en ligne sécurisé pour soumettre une demande, téléverser les pièces légales et suivre l'état du dossier.
- **Gestion centralisée de l'agenda et des infrastructures** : Outil d'administration pour planifier les événements, gérer la disponibilité des salles et publier des actualités.
- **Workflow de validation hiérarchisé** : Système de rôles rigoureux (Demandeur, Administrateur, Ministre).
- **Vitrine numérique interactive** : Front-Office attrayant avec calendrier dynamique et galeries photo.

---

## 💻 CHAPITRE 2 : Étude Technique et Comparaison des Outils

### 1. Les technologies utilisées
- **Backend (Logique Serveur)** : **Laravel 11** (MVC PHP, ORM Eloquent, Observers, sécurité XSS/CSRF).
- **Frontend (Interface Utilisateur)** : **React.js** (Composants réactifs, DOM virtuel, SPA via Inertia.js).
- **Design & UI** : **Tailwind CSS** (Utility-first sur-mesure aux normes de qualité du secteur public).
- **Base de Données** : **MySQL** (Intégrité relationnelle ACID et règles d'associations).

### 2. Étude comparative
- **Laravel vs Symfony & Node.js** : Laravel offre une rapidité de développement (RAD) supérieure via Artisan et Eloquent, avec des mécanismes de sécurité intégrés "out-of-the-box" pour des workflows institutionnels relationnels complexes.
- **React.js vs Vue.js** : React a été retenu pour son écosystème géant, sa flexibilité et sa maîtrise parfaite des états complexes pour l'agenda mensuel dynamique.
- **Tailwind CSS vs Bootstrap** : Tailwind permet d'éviter l'aspect générique "stéréotypé" de Bootstrap pour produire un design sur-mesure, élégant et léger.

---

## 📐 CHAPITRE 3 : Analyse et Conception (UML & MLD)

### 1. Identification des 4 Acteurs & Rôles
1. **Le Public (Visiteur non authentifié)** : Consultation de l'Agenda, exploration des salles, lecture des actualités et galeries.
2. **Le Demandeur (Citoyen / Association)** : Inscription, authentification par code OTP, formulaire de réservation, dépôt des pièces légal et suivi en temps réel.
3. **L'Administrateur (Agent / Directeur)** : Validation/Refus des requêtes, téléchargement des documents joints, gestion CRUD des salles, événements et actualités.
4. **Le Ministre (Superviseur)** : Accès analytique en "lecture seule" aux statistiques et indicateurs KPIs globaux.

### 2. Diagrammes UML & MLD
- **Cas d'Utilisation (Use Case)** : Cartographie des privilèges et accès par rôle.
- **Diagramme de Séquence** : Scénario complet de demande ➡️ vérification de disponibilité ➡️ dépôt des pièces légales ➡️ approbation Admin et blocage automatique du créneau.
- **Modèle Logique de Données (MLD)** : Tables relationnelles principales (`User`, `Salle`, `Reservation`, `Event`, `Actualite`).

---

## 🖥️ CHAPITRE 4 : Réalisation et Interfaces

### 1. Front-Office Public
- Vitrine réactive avec bannière dynamique.
- Agenda culturel mensuel filtrable par salle avec infobulles descriptives au survol.
- Catalogue des salles enrichi d'une galerie photo dynamique en plein écran (lightbox).

### 2. Espace Utilisateur & Sécurité OTP
- Formulaire guidé étape par étape avec téléversement obligatoire des pièces justificatives.
- Authentification et réinitialisation de mot de passe sécurisées par code OTP à 6 chiffres transmis par email réel (Gmail SMTP).
- Suivi du statut des requêtes avec badges colorés ("En attente", "Approuvée", "Refusée").

### 3. Back-Office Administrateur & Espace Ministre
- Module d'évaluation des réservations entrant avec vérification et téléchargement des documents légaux.
- Synchronisation automatique des réservations approuvées vers l'agenda public via `ReservationObserver`.
- Tableau de bord Ministre avec indicateurs de performance (KPIs) en temps réel.

---

## 🏁 CONCLUSION GÉNÉRALE

Le stage effectué au sein du **Centre Culturel Lixus** a constitué une étape charnière dans notre parcours de formation pour l'obtention du diplôme de **Technicien Spécialisé en Développement Informatique (TSDI)**. Il nous a confrontés aux réalités tangibles et aux exigences rigoureuses du monde professionnel, en nous confiant la responsabilité technique et conceptuelle d'un projet de digitalisation complet de bout en bout.

Grâce à ce projet, nous avons pu mettre en pratique nos connaissances théoriques tout en maîtrisant des technologies de pointe particulièrement plébiscitées par l'industrie, telles que **Laravel 11**, **React.js** et **Tailwind CSS**. De la phase d'étude et d'analyse des besoins, passant par l'architecture et la modélisation de la base de données, jusqu'à l'implémentation fine des interfaces interactives et des workflows de validation complexes, chaque étape fut immensément riche en apprentissages techniques.

La plateforme web livrée aujourd'hui répond avec succès et précision aux problématiques initiales soulevées par le centre : elle dématérialise intégralement et fluidifie la procédure de réservation des salles, offre une visibilité publique sans précédent sur l'agenda culturel de la région, et fournit à la direction générale des outils de gestion et de supervision robustes.

Au-delà des acquis techniques indéniables, cette expérience en immersion nous a permis de forger notre sens du travail collaboratif en binôme, notre capacité d'adaptation face aux requêtes évolutives du client, ainsi que notre rigueur professionnelle. Ce projet constitue sans conteste un tremplin inestimable et une solide référence pour le démarrage de notre future carrière de développeurs logiciels.

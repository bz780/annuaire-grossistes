# Mises à jour critiques en cours de build

## 1. Google Search Console verification

Inclure dans le `<head>` de TOUTES les pages HTML :

```html
<meta name="google-site-verification" content="UWuc8OiAlttc0mDnKwrJF613xKABK_a9zYQ7JdJQmYA" />
```

## 2. Design v2 (à utiliser, pas v1)

Le bundle `C:/tmp/design/grossite/` a été mis à jour vers la v2 :
- styles.css : 43.7 KB (était 38.7 KB) — nouveaux composants `how-flow`, `vs-grid`, `plans`, `cta-band`, `about-dl`
- chats/chat1.md : étendu — confirme palette bleue `#0f3a6b` comme défaut, ajoute 3 pages
- Pages additionnelles ajoutées au prototype :
  - **Comment ça marche** (flow 4 étapes : recherche → SIRET → demande → négociation, "ce qu'on fait / ne fait pas", FAQ d'accès)
  - **À propos** (éditorial sur méthode de vérification, modèle éco, indépendance + chiffres clés sidebar)
  - **Devenir membre** (3 plans : Standard gratuit / Premium 49€/mois / Sur-mesure, processus J+0 → J+5, FAQ grossistes)
- Compteurs hero amélioration : grand chiffre tabulaire 28px semi-bold + label en dessous, séparés par trait fin (pas de mono-font collé)

→ **Re-lire** `C:/tmp/design/grossite/chats/chat1.md` (now 7.3 KB) et `styles.css` (43.7 KB) avant de finaliser le code, surtout pour les pages "Comment ça marche", "À propos", "Devenir membre".

## 3. PageSpeed + Schema (rappel)

- Mobile ≥ 95, Desktop ≥ 99
- Critical CSS inline, Inter self-hosted, zero JS bloquant
- Schemas validés sur https://validator.schema.org/ avec zéro erreur
- FAQPage schema sur chaque catégorie (rich results)

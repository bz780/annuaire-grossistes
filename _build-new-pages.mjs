#!/usr/bin/env node
// Génère 10 nouvelles pages catégorie pour annuaire-grossistes.fr
// Structure identique à _build-pages.mjs mais sans encart EMD (pas de site partenaire associé)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;

// ─── 10 nouvelles niches ───────────────────────────────────────
const PAGES = [
  // P1 — volumes + intent commercial fort
  { slug: 'grossistes-defibrilateur',
    h1: 'Annuaire des grossistes en défibrillateurs',
    productSingular: 'défibrillateur', productPlural: 'défibrillateurs', productShort: 'défibrillateurs',
    metaTitle: 'Grossistes défibrillateurs B2B — Annuaire DAE vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en défibrillateurs DAE. Obligation légale ERP, marquage CE médical, fournisseurs vérifiés SIRET, contrats maintenance.',
    intro: 'Fournisseurs B2B de défibrillateurs automatisés externes (DAE) pour entreprises, ERP, collectivités, clubs sportifs. Obligation légale depuis 2020 pour les ERP catégories 1 à 4 et les ERP catégorie 5 du sport. Marques certifiées CE médical, contrats maintenance et formation incluse.',
    sections: [
      { h: 'Marché B2B du défibrillateur en France', p: 'La loi du 28 juin 2018 et son décret d\'application impose un DAE dans tous les ERP de catégories 1 à 4 (échéance 2020) et dans les ERP de catégorie 5 du sport (échéance 2022). Le parc installé dépasse 250 000 unités en 2026 et croît de 8 à 12% par an. Trois marques dominent l\'EU : Schiller (Suisse), Zoll (USA), Philips HeartStart, complétées par Mindray (Chine, segment public), Cardiac Science et Defibtech.' },
      { h: 'Familles d\'appareils', p: 'DAE entièrement automatique (recommandé pour grand public, choc délivré sans intervention), DAE semi-automatique (intervention secouriste pour validation choc). Tropicalisation (extérieur IP55) ou intérieur IP54. Boîtier mural alarmé, totem extérieur chauffant. Électrodes adultes (8 ans+) et pédiatriques. Batterie : durée de vie 4 à 5 ans, électrodes 2 à 4 ans selon marque.' },
      { h: 'MOQ, prix et contrats maintenance', p: 'MOQ 1 unité, prix grossiste de 950€ HT (entry-level Mindray) à 2400€ HT (Philips HeartStart Onsite). Boîtier extérieur chauffant alarmé : 380 à 650€ HT. Contrat maintenance annuel obligatoire : 80 à 180€ HT/an/appareil (vérification batterie, électrodes, journal d\'événements, formation refresh). Délai livraison 48-72h depuis stock France.' }
    ],
    faq: [
      { q: 'Quels ERP sont obligés d\'installer un défibrillateur ?', a: 'Tous les ERP de catégories 1 à 4 (capacité 300 personnes et plus) depuis le 1er janvier 2020, ainsi que les ERP catégorie 5 du sport (salles de sport, piscines, stades) depuis le 1er janvier 2022. Le décret 2018-1186 fixe la liste précise. Le défaut d\'installation peut engager la responsabilité civile et pénale du gérant en cas d\'accident.' },
      { q: 'Combien coûte un défibrillateur en gros ?', a: 'Entry-level conformes (Mindray BeneHeart C1A, Defibtech) : 900 à 1300€ HT. Milieu de gamme (Schiller Fred Easyport, Zoll AED Plus) : 1500 à 1900€ HT. Premium (Philips HeartStart, Lifepak CR2) : 2000 à 2400€ HT. Ajoutez le boîtier mural (180 à 300€), le boîtier extérieur chauffant (380 à 650€) et le contrat maintenance (80 à 180€/an).' },
      { q: 'Quelle marge en revente DAE ?', a: 'Coefficient revente 1,3 à 1,5 sur l\'appareil (concurrence prix internet forte sur les marques connues). La marge récurrente vient des contrats de maintenance (80 à 180€ HT/an/DAE) et des consommables : électrodes adultes 80-130€ HT, électrodes pédiatriques 110-160€ HT, batterie 200-450€ HT selon marque. Un parc de 100 DAE génère 12 à 18 k€ HT/an de revenus récurrents.' },
      { q: 'Formation utilisateurs : obligatoire ?', a: 'Pas légalement obligatoire mais fortement recommandée par l\'INRS et la Croix-Rouge. Formation initiale GQS (Gestes Qui Sauvent) : 2h, 25 à 60€ HT/personne. Le législateur prévoit une formation lors de la livraison du DAE. Le revendeur sérieux propose un pack appareil + formation initiale 5 à 8 personnes + maintenance 1 an.' }
    ],
    related: ['grossistes-distributeur-automatique', 'grossistes-eclairage-led', 'grossistes-cutter']
  },

  { slug: 'grossistes-panier',
    h1: 'Annuaire des grossistes en paniers',
    productSingular: 'panier', productPlural: 'paniers', productShort: 'paniers',
    metaTitle: 'Grossistes paniers B2B — Osier, garni, promotionnel — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en paniers. Osier, rotin, paniers garnis cadeau, paniers promotionnels, pique-nique. MOQ accessibles, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de paniers pour boutiques cadeaux, traiteurs, comités d\'entreprise, fleuristes, magasins de déco. Paniers en osier, en rotin, paniers garnis cadeau Noël et fin d\'année, paniers promotionnels, paniers pique-nique. Personnalisation et conditionnement disponibles.',
    sections: [
      { h: 'Marché B2B du panier en France', p: 'Le marché B2B paniers pèse 380 M€ annuels en France, structuré en quatre segments : panier garni cadeau (50% du chiffre, pic novembre-décembre, comité d\'entreprise), panier osier vide pour fleuristes et boutiques (20%), panier promotionnel et marketing (20%), panier pique-nique et plage (10%). Origines : vannerie traditionnelle française et portugaise pour le premium, import Chine et Indonésie pour l\'entry-level.' },
      { h: 'Familles et matières', p: 'Osier blanchi ou écorcé (vannerie traditionnelle, durabilité 10 ans), rotin tressé (léger, panier de pique-nique), bambou (segment ethnique, déco), carton kraft renforcé (panier promotionnel jetable), métal galvanisé (panier marché halles). Tailles : 25-30 cm (cadeau individuel), 35-40 cm (cadeau familial), 50-60 cm (panier garni 6-8 personnes), 70 cm+ (entreprise).' },
      { h: 'MOQ et conditions saison', p: 'Paniers vides : MOQ 12 à 24 pièces selon fournisseur. Paniers garnis personnalisables (composition au choix client) : MOQ 30 à 50 paniers, à passer entre août et octobre pour livraison décembre. Paniers promotionnels logo : MOQ 100 pièces, sérigraphie ou carte personnalisée. Délai 4-6 semaines pour personnalisation, 48-72h sur stock.' }
    ],
    faq: [
      { q: 'Quand commander des paniers garnis pour Noël ?', a: 'Les compositions sont à valider entre fin août et fin septembre, livraison entre mi-novembre et début décembre. Au-delà du 15 octobre, les fournisseurs sont en rupture sur les références phares (foie gras, champagne nominatif, conserves artisanales). Les CSE bouclent leurs commandes en moyenne le 30 octobre.' },
      { q: 'Panier osier vide ou garni : quelle marge ?', a: 'Panier osier vide : coefficient revente 2,5 à 3 (panier client final 12 à 35€ TTC). Panier garni (composition propriétaire) : coefficient 1,8 à 2,2 sur le coût total composition + contenant. Le garni a un panier moyen plus élevé (55 à 180€ TTC) mais une marge brute moins forte par unité.' },
      { q: 'MOQ pour panier promotionnel logo ?', a: '100 pièces minimum pour sérigraphie 1 couleur, 250 pièces pour impression 4 couleurs sublimation. Carte personnalisée glissée dans le panier : MOQ 50 cartes (option moins coûteuse pour les petits volumes). Délai 4 à 6 semaines depuis fabricant EU.' },
      { q: 'Vannerie française vs import Asie ?', a: 'Vannerie française (Villaines-les-Rochers, Indre-et-Loire) : 4 à 8x plus chère, durabilité supérieure, argument storytelling fort (40 vanniers en activité en 2026). Import Chine ou Indonésie : 70-80% du marché, qualité variable selon fournisseur. Pour un positionnement boutique cadeau premium : 30% vannerie française / 70% import sélectionné.' }
    ],
    related: ['grossistes-deco-bali', 'grossistes-deco', 'grossistes-carton']
  },

  { slug: 'grossistes-canape',
    h1: 'Annuaire des grossistes en canapés',
    productSingular: 'canapé', productPlural: 'canapés', productShort: 'canapés',
    metaTitle: 'Grossistes canapés B2B — Annuaire fabricants et importateurs vérifiés',
    metaDesc: 'Annuaire B2B des grossistes français en canapés. Tissu, cuir, convertible, modulable, fabrication FR + import Italie/Pologne. MOQ accessibles, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de canapés pour magasins de meuble, e-commerce ameublement, architectes d\'intérieur, hôtels et résidences services. Canapés fixes, convertibles, d\'angle, modulables. Tissu, cuir, velours. Fabrication française, polonaise, italienne, et import asiatique.',
    sections: [
      { h: 'Marché B2B du canapé en France', p: 'Le canapé est le poste le plus important du marché ameublement français avec 2,8 Md€ B2B en 2025 (16% des ventes meubles). Trois segments : entry-level (import asiatique, prix grossiste 250-500€ HT, structure agglo), mid-range (Pologne, Roumanie, 600-1400€ HT, structure pin/multiplis), premium (Italie, France, 1500-4500€ HT, structure hêtre, sangles élastiques). Le segment des canapés modulaires design (type bubble) tire la croissance depuis 2021.' },
      { h: 'Familles, garnissage et tissus', p: 'Canapé fixe 2/3/4 places, canapé d\'angle gauche/droit/réversible, canapé convertible (système BZ, clic-clac, à l\'italienne), méridienne, modulable bubble. Garnissages : mousse polyuréthane HD 28-32 kg/m³ (entry/mid), mousse à mémoire haute densité 35-40 kg/m³ (premium), plumes (luxe). Revêtements : polyester déperlant entry, microfibre suédine, tissus tissés (lin, coton, bouclette), velours côtelé, cuir aniline ou pigmenté.' },
      { h: 'MOQ, livraison et SAV', p: 'MOQ 1 unité chez la majorité des grossistes EU (modèle exposition). Pour ouvrir un compte revendeur : 5 000 à 15 000€ HT première commande, soit 4 à 8 modèles d\'exposition + assortiment standards. Livraison conteneur Pologne/Italie 4 à 8 semaines, 2 à 3 semaines depuis stocks France. SAV mousse : garantie 3 à 5 ans selon fabricant, structure 5 à 10 ans, tissu 2 ans hors usure normale. Pour une niche design spécifique : voir aussi notre page <a href="/grossistes-canape-bubble/">grossistes canapés bubble</a> (modulaires effet boules).' }
    ],
    faq: [
      { q: 'Combien coûte un canapé en gros ?', a: 'Canapé 3 places fixe entry-level : 280 à 450€ HT (import Asie). Mid-range polonais : 600 à 950€ HT. Premium italien ou français : 1300 à 2400€ HT. Canapé d\'angle convertible avec coffre : +250 à 500€ vs version fixe. Modèles design / éditeurs (Camaleonda, Togo) : 1800 à 4500€ HT.' },
      { q: 'Quelle structure exiger en revente ?', a: 'Structure pin massif ou multiplis (panneau bois aggloméré ou OSB pour entry seulement). Sangles élastiques croisées (60-70% taux d\'élasticité) pour le mid/premium, sangles tissées pour l\'entry. Garantie structure 5 à 10 ans selon fabricant. Évitez les structures aggloméré sur les canapés convertibles à usage quotidien (déformation rapide).' },
      { q: 'Délai livraison conteneur fournisseur ?', a: '2 à 3 semaines depuis stocks France/EU. 4 à 6 semaines pour fabrication Pologne sur commande (dimensions ou tissu spécifique). 8 à 12 semaines pour container 40\' depuis Asie. Comptez 4 à 6 jours supplémentaires pour livraison étage avec créneau client final.' },
      { q: 'Tissu ou cuir pour la revente ?', a: 'Tissu : 75% du marché B2B. Plus large palette de coloris, marges plus fortes (coefficient 2,2-2,5). Cuir : segment premium, panier client final +60-100% vs tissu équivalent, marges 1,8-2 (concurrence forte sur le cuir comparable). Bouclette polyester reste le best-seller 2024-2026.' }
    ],
    related: ['grossistes-canape-bubble', 'grossistes-coussin', 'grossistes-deco-bali']
  },

  // P2 — niches Noël
  { slug: 'grossistes-sapin-artificiel',
    h1: 'Annuaire des grossistes en sapins artificiels',
    productSingular: 'sapin artificiel', productPlural: 'sapins artificiels', productShort: 'sapins artificiels',
    metaTitle: 'Grossistes sapins artificiels B2B — Annuaire fournisseurs Noël vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en sapins artificiels. PE, PVC, mix, hauteurs 60 cm à 4 m, lumineux LED intégrés, MOQ palette, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de sapins artificiels pour boutiques de décoration, jardineries, hôtels, magasins événementiels et collectivités. PVC, PE, mix qualité premium, lumineux LED intégrés. Hauteurs 60 cm à 4 m. Livraison France métropolitaine.',
    sections: [
      { h: 'Marché B2B du sapin artificiel en France', p: 'Le sapin artificiel représente 130 M€ B2B annuels en France et 35% du marché total sapins (vs 65% pour le sapin naturel). Sa progression est régulière (+4 à 6% par an) portée par l\'argument écologique et la durabilité (durée de vie moyenne 8 ans). Trois segments : entry PVC (panier client 25-60€ TTC), mid-range PE/PVC (60-150€), premium 100% PE moulé (150-450€ TTC).' },
      { h: 'Matières et qualités', p: 'PVC standard : aiguilles plates découpées dans une feuille PVC, rendu correct mais peu réaliste. PE moulé : aiguilles 3D injectées dans un moule, rendu très proche du naturel, prix 2x supérieur. Mix PE/PVC : branches extérieures en PE (réalisme), intérieures en PVC (densité, prix maîtrisé) — best-seller actuel. Densité branches : 200 à 500 branches pour un 1,80 m, 700 à 1500 pour un 2,40 m premium.' },
      { h: 'MOQ, saison et livraison', p: 'MOQ 1 palette (12 à 30 sapins selon hauteur) chez la majorité des grossistes. Sapins lumineux LED intégrés : MOQ 24 unités (carton). Pour un compte revendeur : 4 000 à 8 000€ HT première commande. Commandes saison à passer entre mai et juillet pour livraison entre fin août et mi-octobre. Au-delà de mi-septembre, ruptures massives sur les hauteurs phares (1,80 m et 2,10 m).' }
    ],
    faq: [
      { q: 'PE ou PVC : quel sapin artificiel stocker en boutique ?', a: 'Stockez 60% mix PE/PVC (cœur de marché, panier 60-150€ TTC), 25% PVC entry (paniers cadeaux, 25-60€), 15% 100% PE premium (clientèle déco exigeante, 150-450€). Le PE pur a doublé son volume B2B 2020-2025, à cibler en boutique déco indépendante.' },
      { q: 'Quelle hauteur de sapin se vend le plus ?', a: 'Le 1,80 m (37% des ventes) et le 2,10 m (28%) couvrent 65% du volume. Le 1,50 m (15%) cible appartements et secondaires. Le 2,40 m+ (12%) cible maisons et hôtels. Les petits formats 60 à 90 cm (segment table, bureau) tirent la croissance depuis 2022.' },
      { q: 'Sapin pré-illuminé LED : surcoût et marge ?', a: 'Surcoût matériel : +35 à 60% vs sapin nu équivalent. Marge revente : coefficient 2 à 2,2 (vs 2,5-3 sur sapin nu) car forte comparaison prix internet. Argument vente : zéro montage guirlande, économies temps utilisateur, garantie LED 3 ans. Ce segment représente 22% des ventes B2B en 2025.' },
      { q: 'Norme feu pour sapin en ERP ?', a: 'Norme NF P 92-507 (M1 non-inflammable) obligatoire pour ERP (hôtels, restaurants, centres commerciaux). Le grossiste fournit le procès-verbal d\'essai au feu — exigez-le pour les ventes au secteur professionnel ERP. Surcoût ignifugation : +20 à 30% sur le prix grossiste.' }
    ],
    related: ['grossistes-decoration-noel', 'grossistes-illuminations-noel', 'grossistes-eclairage-led']
  },

  { slug: 'grossistes-illuminations-noel',
    h1: 'Annuaire des grossistes en illuminations de Noël',
    productSingular: 'illumination de Noël', productPlural: 'illuminations de Noël', productShort: 'illuminations Noël',
    metaTitle: 'Grossistes illuminations de Noël B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en illuminations de Noël professionnelles. Guirlandes LED, motifs lumineux, traversées de rue, MOQ accessibles, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B d\'illuminations de Noël pour collectivités, comités des fêtes, centres commerciaux, copropriétés et installateurs. Guirlandes LED extérieures IP44/IP65, motifs lumineux 2D/3D, traversées de rue, sapins lumineux extérieurs, rideaux LED. Marquage CE, garantie 3 ans, livraison France.',
    sections: [
      { h: 'Marché B2B des illuminations de Noël', p: 'Le marché B2B des illuminations Noël en France pèse 95 M€ annuels, dominé à 70% par les achats de collectivités (mairies, syndicats d\'agglomération) et à 30% par les centres commerciaux et copropriétés. Quatre fabricants français se partagent 40% du marché (Blachere Illumination, Decolum, Festilight, Le Feu Sacré), le reste étant import EU et Chine. Cycles d\'achat : appels d\'offres collectivités lancés en mars-avril, livraison fin septembre.' },
      { h: 'Familles produits et IP', p: 'Guirlandes LED rideau (1,5 à 6 m, IP44 balcon couvert / IP65 pleine pluie), guirlandes guirlande lumineuse classique (10 à 100 m, IP65), motifs 2D métal pour candélabres (étoiles, sapins, flocons, 80 cm à 3 m), motifs 3D structures filaires LED (rennes, traîneaux, sapins lumineux 2 à 6 m), traversées de rue (5 à 12 m de portée, IP65 obligatoire), rideaux LED façade. Tension 24V SELV (sécurité) ou 230V direct selon usage.' },
      { h: 'MOQ, appels d\'offres et délais', p: 'MOQ 1 à 5 unités sur catalogue selon fournisseur. Personnalisation motif sur-mesure : devis, MOQ 10 à 50 unités selon complexité, délai 8 à 14 semaines. Pour appels d\'offres collectivités : déposer le dossier en mars-mai, livraison contractuelle sous 6 à 8 semaines avant période d\'allumage. Stock fournisseur disponible août-octobre, ruptures fréquentes en novembre.' }
    ],
    faq: [
      { q: 'IP44 ou IP65 pour les illuminations extérieures ?', a: 'IP44 : protection contre projections d\'eau, suffit pour balcon couvert, abri, terrasse. IP65 : étanche pleine pluie, obligatoire pour pose en façade, candélabre rue, traversée de rue exposée. Pour les collectivités : exigez IP65 sur 100% du parc, sinon SAV récurrent dès la première saison.' },
      { q: 'Quelle puissance prévoir pour une rue de 100 m ?', a: 'Une rue de 100 m avec 25 candélabres équipés de motifs 2D LED 1,20 m consomme 1500 à 2500 W (60 à 100W par motif). Une traversée de rue 8 m LED RGB consomme 80 à 150 W. Prévoir une alimentation dédiée et un transfo 24V SELV pour la sécurité piéton.' },
      { q: 'Garantie standard sur illuminations LED pro ?', a: '3 ans pièces et main-d\'œuvre sur les marques françaises (Blachere, Decolum, Festilight) avec engagement maintien chromatique 80% à 30 000 heures. 1 à 2 ans seulement sur l\'import asiatique. Pour les collectivités : exigez 3 ans contractuels avec service de remplacement saison sous 72h.' },
      { q: 'Marge revente pour installateur professionnel ?', a: 'Coefficient 1,8 à 2,2 sur le matériel (concurrence forte sur les marques connues). La vraie marge est sur la prestation pose-dépose : 70 à 130€ HT par candélabre par saison, 250 à 450€ HT pour une traversée de rue. Sur un parc de 50 candélabres : 7 à 13 k€ HT/saison de prestation, hors matériel.' }
    ],
    related: ['grossistes-decoration-noel', 'grossistes-projecteurs-noel', 'grossistes-eclairage-led']
  },

  { slug: 'grossistes-projecteurs-noel',
    h1: 'Annuaire des grossistes en projecteurs de Noël',
    productSingular: 'projecteur de Noël', productPlural: 'projecteurs de Noël', productShort: 'projecteurs Noël',
    metaTitle: 'Grossistes projecteurs de Noël B2B — Laser et LED vérifiés',
    metaDesc: 'Annuaire B2B des grossistes français en projecteurs de Noël laser et LED. Motifs flocons, rennes, étoiles, IP65 extérieur, MOQ accessibles, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de projecteurs de Noël pour magasins de bricolage, jardineries, sites e-commerce, centres commerciaux. Projecteurs laser RGB extérieurs IP65, projecteurs LED motifs animés, gobos étoiles et flocons. Norme laser classe 2 (sécurité oculaire). Personnalisation motifs disponible.',
    sections: [
      { h: 'Marché B2B du projecteur de Noël', p: 'Le projecteur laser et LED de Noël est apparu sur le marché grand public en 2015 et a connu un boom 2018-2022. Le marché B2B pèse 40 M€ annuels en France, en plateau depuis 2023 (saturation grand public, croissance pro). Origines : 90% import Chine, 10% fabrication EU. Trois familles : laser RGB animé, LED projecteur statique gobos, projecteurs hybrides laser+LED multi-effets.' },
      { h: 'Technologies et sécurité', p: 'Laser classe 2 (P max 1 mW, sécurité oculaire passive) obligatoire pour grand public et ERP. Laser classe 3R (1-5 mW) réservé pro avec affichage zone interdite. LED projecteur motifs gobos rotatifs : 8 à 24 motifs par appareil, IP65 extérieur. Hybrides : projection laser + LED, télécommande RF jusqu\'à 30 m. Norme CE EN 60825 obligatoire avec marquage classe laser.' },
      { h: 'MOQ et marges revente', p: 'MOQ 12 unités sur entry import, 24 sur mid-range, 6 sur premium fabrication EU. Prix grossiste : 18-35€ HT entry, 45-90€ HT mid-range, 120-280€ HT premium. Pour un compte revendeur : 1500 à 3000€ HT première commande. Coefficient revente : 2,5 à 3 sur entry/mid (panier client 45-220€ TTC), 2 à 2,3 sur premium (concurrence prix forte).' }
    ],
    faq: [
      { q: 'Projecteur laser ou LED gobo : que conseiller ?', a: 'Laser RGB animé : effet immersif (millions de points lumineux), couvre une grande surface façade (50 à 200 m²), impact visuel fort. LED gobo : projection nette de motifs précis (étoiles, flocons identifiables), mieux pour décor sapin extérieur ou allée. Stockez 60% laser / 40% LED gobo en boutique grand public.' },
      { q: 'Norme laser obligatoire en France ?', a: 'Classe 2 (P max 1 mW) : sécurité oculaire passive, autorisée grand public et ERP sans restriction. Classe 3R (1-5 mW) : usage pro, affichage obligatoire "Ne pas regarder le faisceau". Marquage CE EN 60825 obligatoire, ainsi que la déclaration de conformité fournisseur. Refusez tout projecteur sans certification.' },
      { q: 'Quelle distance projection efficace ?', a: 'Laser classe 2 : 5 à 12 m de la façade pour une couverture 50 à 200 m² selon angle d\'ouverture (60° à 110°). LED gobo : 3 à 8 m pour un motif net 2 à 6 m de diamètre. Au-delà : motifs flous. Communiquez clairement les portées sur fiche produit boutique.' },
      { q: 'IP65 et utilisation extérieure permanente ?', a: 'IP65 : protection eau et poussière, utilisation extérieure pluie OK. Mais évitez l\'utilisation par températures négatives < -10°C (condensation interne, panne LED ou laser). Stockez en intérieur l\'appareil dès janvier. Garantie typique 2 ans, étendue à 3 ans sur fabrication EU.' }
    ],
    related: ['grossistes-illuminations-noel', 'grossistes-decoration-noel', 'grossistes-eclairage-led']
  },

  { slug: 'grossistes-costume-pere-noel',
    h1: 'Annuaire des grossistes en costumes de Père Noël',
    productSingular: 'costume de Père Noël', productPlural: 'costumes de Père Noël', productShort: 'costumes Père Noël',
    metaTitle: 'Grossistes costumes Père Noël B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en costumes de Père Noël. Velours, polaire, deluxe, animation entreprise, MOQ accessibles, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de costumes de Père Noël pour magasins de déguisement, agences d\'animation, comités d\'entreprise, photographes événementiels et centres commerciaux. Costumes économiques polaire, mid-range velours, deluxe coton tissé. Tailles M à XXL, ensemble complet veste-pantalon-ceinture-bonnet-barbe.',
    sections: [
      { h: 'Marché B2B du costume Père Noël', p: 'Le marché B2B du costume de Père Noël pèse 18 M€ annuels en France, ultra-saisonnier (90% des ventes octobre-décembre). Quatre segments : entry polaire jetable (3-5 utilisations, 8-15€ HT, magasins discount), mid-range velours (15-30€ HT, paniers familles), deluxe coton tissé doublé (50-110€ HT, animation pro), professionnel sur-mesure (200-500€ HT, théâtre, parc d\'attraction).' },
      { h: 'Composition et finitions', p: 'Ensemble standard : veste à capuche bordure fausse fourrure blanche, pantalon, ceinture imitation cuir noir, bonnet, barbe synthétique avec moustache, gants blancs. Lunettes rondes optionnelles. Sac de jouets en jute imprimé. Bottes noires (souvent vendues séparément). Le velours (mid-range) reste le best-seller en 2025-2026 : meilleur rendu photo que la polaire, prix accessible vs coton tissé.' },
      { h: 'MOQ et saison', p: 'MOQ 12 pièces par taille chez les grossistes import, 6 pièces chez les fabricants polonais. Pour un compte revendeur : 1500 à 3000€ HT première commande sur 4 à 6 modèles + tailles assorties. Commandes à passer entre mai et juillet pour livraison fin septembre. Au-delà de mi-octobre : ruptures massives sur le mid-range et deluxe.' }
    ],
    faq: [
      { q: 'Polaire ou velours : que stocker en boutique ?', a: 'Polaire : entry jetable (3-5 utilisations max), panier client 25-45€ TTC, marge 2,5-3, cible familles et fêtes scolaires. Velours : mid-range, 15-25 utilisations, panier 60-130€ TTC, marge 2,2-2,5, cible animation entreprise et photographe. Stockez 50% polaire / 40% velours / 10% deluxe coton tissé.' },
      { q: 'Quelle taille de costume Père Noël prévoir ?', a: 'M (38-44 client), L (46-50, taille la plus vendue, 35% du volume), XL (52-56, 30%), XXL (58-62). Le standard est élastique (taille unique adulte) à 60% du volume entry. Pour les paniers pro animation : prévoir un assortiment 1 M / 2 L / 2 XL / 1 XXL.' },
      { q: 'Norme inflammabilité costume déguisement ?', a: 'Norme EN 71-2 (jouets) si ciblé enfant, ou EN 14878 (vêtements de nuit enfant) si vente avec mention enfant. Pour adulte : pas de norme spécifique en France, mais affichez la mention "Tenir éloigné des flammes" obligatoire sur emballage. Le grossiste sérieux fournit l\'attestation.' },
      { q: 'Délai livraison fournisseur sur commande tardive ?', a: '48-72h depuis stocks France pour les références standard. 4 à 6 semaines pour fabrication import (Chine, Pakistan) — refusé après début octobre. Pour une commande corporate centre commercial : passer commande au plus tard fin août pour les modèles deluxe.' }
    ],
    related: ['grossistes-decoration-noel', 'grossistes-pyjama', 'grossistes-bonnet']
  },

  { slug: 'grossistes-automates-noel',
    h1: 'Annuaire des grossistes en automates de Noël',
    productSingular: 'automate de Noël', productPlural: 'automates de Noël', productShort: 'automates Noël',
    metaTitle: 'Grossistes automates de Noël B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en automates animés de Noël. Père Noël, rennes, lutins, vitrines magasins, hauteurs 30 cm à 1,80 m, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B d\'automates animés de Noël pour vitrines de magasins, centres commerciaux, hôtels, marchés de Noël, parcs et résidences haut de gamme. Pères Noël, rennes, lutins, ours animés, scénettes complètes. Hauteurs 30 cm à 1,80 m. Fabrication italienne et chinoise.',
    sections: [
      { h: 'Marché B2B des automates de Noël', p: 'L\'automate de Noël est un marché B2B de niche (12 M€ annuels en France) très concentré : 85% des achats sont réalisés par les centres commerciaux, vitrines de grands magasins (Galeries Lafayette, Printemps), parcs d\'attractions et marchés de Noël municipaux. Origines : Italie pour le premium artisanal (Bottega Italia, Marini), Chine pour le mid-range volume. Durée de vie 5 à 8 saisons en utilisation pro saisonnière.' },
      { h: 'Familles et hauteurs', p: 'Petits formats vitrine 30-60 cm (pères Noël à pile, scénettes table), formats moyens 80-120 cm (rennes animés, lutins forgerons), grands formats 1,40-1,80 m (Pères Noël grandeur nature animés tête + bras). Animations : mouvements tête (2 axes), bras (1-2 axes), corps oscillant, sourire LED, son intégré (musique boîte ou voix synthèse). Alimentation 220V ou pile selon taille.' },
      { h: 'MOQ, livraison et SAV', p: 'MOQ 1 unité chez la majorité des grossistes (achat unitaire fréquent en B2B). Pour ouvrir compte revendeur : 3 000 à 8 000€ HT première commande. Prix grossiste : 80 à 250€ HT entry, 350 à 850€ HT mid-range, 1200 à 3500€ HT premium 1,80 m grandeur nature. Délais 4 à 8 semaines depuis Italie (fabrication sur commande), 48-72h sur stock France. SAV moteur : garantie 2 ans, pièces détachées 5 ans pour les marques italiennes.' }
    ],
    faq: [
      { q: 'Combien coûte un automate de Noël grandeur nature ?', a: 'Père Noël 1,80 m animé tête + bras + sourire LED : 1500 à 2800€ HT en mid-range chinois, 2800 à 5500€ HT en fabrication italienne premium. Renne 1,40 m animé : 850 à 2200€ HT. Scénette complète atelier lutins forgerons (5 personnages animés) : 4500 à 9000€ HT.' },
      { q: 'Stockage hors saison : quelles précautions ?', a: 'Stockage en pièce sèche entre 5 et 25°C, à l\'abri de la lumière directe. Démontage des piles obligatoire pour les modèles à pile (corrosion). Housse plastique anti-poussière fournie par le fabricant — exigez-la. Le grossiste sérieux propose un service de stockage saisonnier 80 à 250€ HT/saison/automate.' },
      { q: 'Quelle puissance électrique prévoir ?', a: 'Petit format 30-60 cm : 5-15 W (pile ou 220V). Mi-format 80-120 cm : 25-45 W. Grand format 1,80 m grandeur nature : 60-120 W. Pour une vitrine avec 5 automates grandeur nature : prévoir une ligne dédiée 16A 220V protégée par disjoncteur différentiel 30 mA.' },
      { q: 'Marge en revente automate Noël ?', a: 'Coefficient revente 1,8 à 2,2 sur entry/mid-range (concurrence prix internet forte). Coefficient 2,5 à 3 sur le premium italien artisanal (faible comparaison prix). La vraie marge est sur les contrats de vente + installation + maintenance saison aux centres commerciaux : 800 à 2500€ HT/automate/saison hors matériel.' }
    ],
    related: ['grossistes-decoration-noel', 'grossistes-illuminations-noel', 'grossistes-statue-animal-resine']
  },

  { slug: 'grossistes-serre-tete-noel',
    h1: 'Annuaire des grossistes en serre-têtes de Noël',
    productSingular: 'serre-tête de Noël', productPlural: 'serre-têtes de Noël', productShort: 'serre-têtes Noël',
    metaTitle: 'Grossistes serre-têtes de Noël B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en serre-têtes et accessoires de Noël. Bois renne, bonnet lutin, sapin lumineux LED, MOQ accessibles, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de serre-têtes et accessoires de Noël pour boutiques de déguisement, comités d\'entreprise, animation, fêtes scolaires. Bois de renne, oreilles d\'elfe, sapin lumineux LED, étoiles brillantes, bonnet lutin clochette. MOQ 50 à 100 pièces, personnalisation logo possible.',
    sections: [
      { h: 'Marché B2B du serre-tête de Noël', p: 'Marché ultra-saisonnier (95% des ventes octobre-décembre) pesant 6 M€ B2B annuels en France. Trois usages : fêtes scolaires (40%, paniers maternelle et primaire), animation entreprise (35%, soirée fin d\'année), boutique déguisement (25%, ventes unitaires). Origines : 95% import Chine, 5% fabrication PME française pour le segment LED clignotant.' },
      { h: 'Familles et finitions', p: 'Bois de renne (pelage marron + grelot rouge) : best-seller intemporel, 1,20 à 2,50€ HT pièce. Sapin lumineux LED clignotant + pile bouton : panier corporate, 2,50 à 4,50€ HT. Étoile dorée pailletée 3D : 1,80 à 3€ HT. Bonnet lutin avec oreilles intégrées : 2 à 3,50€ HT. Couronne houx + baies rouges (tendance feutrine) : 2,80 à 4€ HT. Sets assortis 4 modèles différents : MOQ 200 sets.' },
      { h: 'MOQ et personnalisation', p: 'MOQ 50 pièces par modèle chez les grossistes import (paniers entreprise), 100 pièces chez les fabricants logo personnalisé. Sérigraphie 1 couleur sur bandeau : MOQ 250 pièces, +0,40-0,80€ HT/pièce. Délais 4-6 semaines depuis fabricant Chine pour personnalisation, 48-72h sur stock standard. Pour CSE et corporate Noël : passer commande avant fin août pour livraison novembre.' }
    ],
    faq: [
      { q: 'Quel modèle de serre-tête se vend le plus en B2B ?', a: 'Le bois de renne classique pelage marron + grelot rouge représente 35% du volume B2B (intemporel, polyvalent). Le sapin lumineux LED clignotant tire la croissance corporate (+18%/an), désormais 22% du marché. Stockez 40% bois renne / 25% sapin LED / 15% étoile dorée / 20% autres modèles.' },
      { q: 'Norme jouet pour serre-tête de Noël ?', a: 'Si vendu pour enfant 3-14 ans : norme EN 71-1, EN 71-2 et EN 71-3 obligatoires (sécurité mécanique, inflammabilité, migration métaux lourds). Marquage CE jouet sur emballage. Le grossiste fournit la déclaration de conformité — refusez tout produit sans CE jouet pour vente boutique enfant.' },
      { q: 'Personnalisation logo entreprise pour CSE ?', a: 'MOQ 250 pièces minimum pour sérigraphie 1 couleur sur bandeau plastique (logo simple, lettres+symbole). Impression sublimation 4 couleurs : MOQ 500 pièces, qualité photo, surcoût +0,80-1,20€ HT/pièce. Délai 5-7 semaines pour personnalisation depuis Chine — passer commande avant fin août.' },
      { q: 'Marge revente boutique déguisement ?', a: 'Coefficient revente 3 à 4 sur les serre-têtes (panier client final 4-12€ TTC, prix grossiste 1,20-3€ HT). Marge brute forte car panier addon spontané et faible comparaison prix internet (achat impulsif boutique physique). Stockage volume faible, ROI rapide en saison.' }
    ],
    related: ['grossistes-costume-pere-noel', 'grossistes-decoration-noel', 'grossistes-bonnet']
  },

  { slug: 'grossistes-lutin-farceur',
    h1: 'Annuaire des grossistes en lutins farceurs de Noël',
    productSingular: 'lutin farceur', productPlural: 'lutins farceurs', productShort: 'lutins farceurs',
    metaTitle: 'Grossistes lutins farceurs de Noël B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en lutins farceurs de Noël (Elf on the Shelf style). Personnages tissu jambes pliables, accessoires et kits, MOQ accessibles.',
    intro: 'Fournisseurs B2B de lutins farceurs de Noël pour boutiques de jouets, magasins de déco, librairies et grandes surfaces. Personnages tissu et résine avec jambes pliables, accessoires (mini ski, parachute, voiture), kits 24 jours d\'animation. Concept inspiré Elf on the Shelf (USA), explosion du marché FR depuis 2020.',
    sections: [
      { h: 'Marché B2B du lutin farceur en France', p: 'Le concept Elf on the Shelf (livre + lutin, 2005, USA) a déclenché en France à partir de 2018 une catégorie « lutin farceur » avec un boom 2020-2023 (TikTok, parents partagent les mises en scène quotidiennes). Marché B2B 2025 : 22 M€ annuels en France, en croissance +15-20%/an. Origines : 90% import Chine (volume), 10% éditeurs livres jouets français (Hachette, Auzou). Saisonnalité : 95% des ventes octobre-décembre.' },
      { h: 'Familles produits et accessoires', p: 'Lutin tissu hauteur 30-45 cm avec jambes et bras pliables fil de fer (best-seller, 4-9€ HT) — coloris vert, rouge, blanc, mixte. Lutin résine décoratif non-articulé 15-25 cm (accessoire vitrine, 3-6€ HT). Accessoires miniatures : mini ski, mini snowboard, mini parachute, mini voiture, mini gâteau, kit médecin (1-2,50€ HT pièce). Coffrets calendrier 24 jours d\'idées avec lutin + carnet : 12-22€ HT, MOQ 50.' },
      { h: 'MOQ et saison de commande', p: 'MOQ 24 pièces par référence chez les grossistes import sur les lutins articulés tissu, 50 pièces sur les accessoires miniatures, 30 sur les coffrets. Pour un compte revendeur boutique jouet : 1500 à 3500€ HT première commande sur 8 à 12 références. Commandes à passer entre mai et juillet pour livraison septembre. Au-delà du 15 octobre : ruptures fortes sur les coffrets calendrier 24 jours.' }
    ],
    faq: [
      { q: 'Quelle référence de lutin se vend le plus ?', a: 'Le lutin tissu vert ou rouge avec jambes pliables fil de fer hauteur 35-40 cm représente 60% du volume B2B (le format de référence Elf on the Shelf). Le coffret calendrier 24 jours d\'idées (lutin + livret) tire la croissance B2B depuis 2022, désormais 25% du marché. Stockez 60% lutin classique / 25% coffret 24 jours / 15% accessoires.' },
      { q: 'Norme jouet pour lutin farceur ?', a: 'Norme EN 71-1, EN 71-2, EN 71-3 obligatoires si vente avec mention enfant (3+ ans). Marquage CE jouet sur emballage et notice. Attention au fil de fer interne des jambes pliables : test résistance flexion 100 cycles obligatoire. Le grossiste sérieux fournit la déclaration de conformité — refusez tout produit non CE jouet.' },
      { q: 'Coffret calendrier 24 jours : MOQ et marge ?', a: 'MOQ 30 à 50 coffrets selon fournisseur. Prix grossiste 12-22€ HT pour un coffret avec lutin + carnet d\'idées 24 jours + sticker autocollants. Coefficient revente 2 à 2,3 (panier client 28-50€ TTC). Format cadeau idéal pour boutique jouet et librairie indépendante.' },
      { q: 'Quelle marge sur les accessoires miniatures ?', a: 'Coefficient revente 3 à 4 sur les accessoires unitaires (mini ski, mini parachute, mini voiture). Prix grossiste 1-2,50€ HT, panier client 4-12€ TTC. Panier addon spontané fort (achat impulsif après le lutin principal). Stockage volume faible, marge brute attractive.' }
    ],
    related: ['grossistes-decoration-noel', 'grossistes-serre-tete-noel', 'grossistes-costume-pere-noel']
  }
];

// ─── Composants HTML (réutilisés depuis _build-pages.mjs) ──────
const HEADER = `<header class="hdr" id="hdr">
  <div class="container hdr-inner">
    <a href="/" class="hdr-brand" aria-label="Annuaire Grossistes — accueil">
      <span class="mark" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor"/><path d="M7 17V9l5-3 5 3v8" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 17v-4h4v4" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <span class="hdr-brand-name"><b>Annuaire</b><span>-Grossistes.fr</span></span>
    </a>
    <nav class="hdr-nav" aria-label="Navigation principale">
      <a href="/categories/">Catégories</a>
      <a href="/comment-ca-marche/">Comment ça marche</a>
      <a href="/devenir-grossiste/">Devenir membre</a>
      <a href="/glossaire/">Glossaire</a>
      <a href="/a-propos/">À propos</a>
    </nav>
    <div class="hdr-spacer"></div>
    <div class="hdr-actions">
      <a href="/contact/" class="btn btn-secondary btn-md">Contact</a>
      <a href="/devenir-grossiste/" class="btn btn-primary btn-md">Inscrire mon entreprise</a>
    </div>
  </div>
</header>`;

const FOOTER = `<footer class="ftr">
  <div class="container">
    <div class="ftr-cols">
      <div class="ftr-brand">
        <a href="/" class="hdr-brand"><span class="mark"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor"/><path d="M7 17V9l5-3 5 3v8" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 17v-4h4v4" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="hdr-brand-name"><b>Annuaire</b><span>-Grossistes.fr</span></span></a>
        <p class="ftr-tag">Annuaire B2B sélectif des grossistes français vérifiés. Inscription réservée aux acheteurs déclarés.</p>
      </div>
      <div class="ftr-col"><p class="ftr-heading">Catégories</p><ul><li><a href="/grossistes-bougie/">Bougies</a></li><li><a href="/grossistes-eclairage-led/">Éclairage LED</a></li><li><a href="/grossistes-decoration-noel/">Décorations Noël</a></li><li><a href="/grossistes-coussin/">Coussins</a></li><li><a href="/grossistes-laine/">Laine</a></li><li><a href="/grossistes-mug/">Mugs</a></li><li><a href="/grossistes-carton/">Cartons</a></li><li><a href="/categories/">Toutes les catégories</a></li></ul></div>
      <div class="ftr-col"><p class="ftr-heading">Ressources</p><ul><li><a href="/comment-ca-marche/">Comment ça marche</a></li><li><a href="/devenir-grossiste/">Inscrire mon entreprise</a></li><li><a href="/glossaire/">Glossaire incoterms</a></li><li><a href="/contact/">Contact</a></li><li><a href="/sitemap.xml">Plan du site</a></li></ul></div>
      <div class="ftr-col"><p class="ftr-heading">Légal</p><ul><li><a href="/mentions-legales/">Mentions légales</a></li><li><a href="/cgu/">CGU</a></li><li><a href="/politique-confidentialite/">Confidentialité</a></li><li><a href="/a-propos/">À propos</a></li></ul></div>
    </div>
    <div class="ftr-bottom">
      <span>© 2026 Annuaire-Grossistes.fr — Tous droits réservés</span>
      <div class="ftr-bottom-links"><a href="/mentions-legales/">Mentions légales</a><a href="/cgu/">CGU</a><a href="/politique-confidentialite/">Confidentialité</a></div>
    </div>
  </div>
</footer>`;

const SCRIPT = `<script defer>
(function(){
var h=document.getElementById('hdr');
if(h){var on=function(){h.classList.toggle('hdr-scrolled',window.scrollY>10)};window.addEventListener('scroll',on,{passive:true});on()}
var f=document.getElementById('contact-form');
if(f){var TS_LOAD=Date.now();var tsl=f.querySelector('[name=ts_load]');if(tsl)tsl.value=String(TS_LOAD);var tst=f.querySelector('[name=ts_token]');if(tst){try{tst.value=btoa(location.href+'|'+TS_LOAD).slice(0,24)}catch(_){tst.value=String(TS_LOAD%9973)}}f.addEventListener('submit',function(e){e.preventDefault();var btn=f.querySelector('button[type=submit]');if(btn.disabled)return;var s=document.getElementById('cf-status');var hp=f.querySelector('[name=_honeypot]');if(hp&&hp.value){e.preventDefault();return}var elapsed=Date.now()-TS_LOAD;var els=f.querySelector('[name=ts_elapsed]');if(els)els.value=String(elapsed);if(elapsed<2000){s.textContent='Veuillez prendre quelques secondes pour remplir le formulaire.';return}var ua=(navigator.userAgent||'').toLowerCase();if(/curl|wget|python-requests|headlesschrome|phantomjs/.test(ua)){s.textContent='Erreur. Réessayez depuis un navigateur standard.';return}btn.disabled=true;var bt=btn.textContent;btn.textContent='Envoi en cours…';btn.style.opacity='0.7';btn.style.cursor='wait';s.textContent='Envoi…';fetch(f.action,{method:'POST',body:new FormData(f),headers:{'Accept':'application/json'}}).then(function(r){return r.json()}).then(function(d){if(d.success){s.textContent='Message envoyé. Réponse sous 24h ouvrées.';f.reset();btn.textContent='Message envoyé';}else{s.textContent='Erreur. Vérifiez vos champs et réessayez.';btn.disabled=false;btn.textContent=bt;btn.style.opacity='';btn.style.cursor=''}}).catch(function(){s.textContent='Erreur réseau. Réessayez plus tard.';btn.disabled=false;btn.textContent=bt;btn.style.opacity='';btn.style.cursor=''})})}
})();
</script>`;

const CONTACT_FORM = `<section class="section" id="contact">
  <div class="container">
    <div class="section-h section-h-center">
      <span class="eyebrow">Contact</span>
      <h2>Une question ? Écrivez-nous</h2>
      <p>Réponse sous 24h ouvrées.</p>
    </div>
    <form class="contact-form" id="contact-form" action="https://formsubmit.co/ajax/admin@accessibledigital.com" method="POST">
      <div class="contact-grid">
        <div class="field"><label class="field-label" for="cf-name">Nom <span class="field-req">*</span></label><input class="field-input" id="cf-name" name="name" required></div>
        <div class="field"><label class="field-label" for="cf-email">Email pro <span class="field-req">*</span></label><input class="field-input" id="cf-email" name="email" type="email" required></div>
      </div>
      <div class="contact-grid">
        <div class="field"><label class="field-label" for="cf-company">Entreprise</label><input class="field-input" id="cf-company" name="company"></div>
        <div class="field"><label class="field-label" for="cf-siret">SIRET</label><input class="field-input" id="cf-siret" name="siret" inputmode="numeric"></div>
      </div>
      <div class="field"><label class="field-label" for="cf-message">Message <span class="field-req">*</span></label><textarea class="field-textarea" id="cf-message" name="message" required rows="5"></textarea></div>
      <input type="hidden" name="_subject" value="Contact — Annuaire-Grossistes.fr">
      <input type="hidden" name="_captcha" value="false">
      <input type="text" name="_honeypot" style="display:none" tabindex="-1" autocomplete="off">
      <input type="hidden" name="ts_load" value="">
      <input type="hidden" name="ts_token" value="">
      <input type="hidden" name="ts_elapsed" value="">
      <div class="contact-foot">
        <span class="contact-legal">En envoyant, vous acceptez notre <a href="/politique-confidentialite/">politique de confidentialité</a>.</span>
        <button class="btn btn-primary btn-lg" type="submit">Envoyer le message</button>
      </div>
      <div id="cf-status" role="status" aria-live="polite"></div>
    </form>
  </div>
</section>`;

const INLINE_CSS = `@font-face{font-family:'Inter';src:url('/assets/fonts/InterVariable.woff2') format('woff2-variations');font-weight:100 900;font-display:swap}
:root{--primary:#0f3a6b;--primary-hover:#0b2d54;--primary-soft:#e6edf5;--primary-tint:rgba(15,58,107,.06);--accent:#b8893d;--accent-soft:#f3e9d5;--n-0:#fff;--n-25:#fbfaf8;--n-50:#f6f5f1;--n-100:#ecebe5;--n-200:#d9d8d1;--n-500:#6b6962;--n-600:#4a4945;--n-900:#18181a;--bg:var(--n-25);--surface:var(--n-0);--surface-2:var(--n-50);--border:var(--n-100);--border-strong:var(--n-200);--text:var(--n-900);--text-2:var(--n-600);--text-3:var(--n-500);--success:#16794a;--font-sans:'Inter',ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;--font-mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;--fs-xs:clamp(11px,.72rem,12px);--fs-sm:clamp(13px,.84rem,14px);--fs-body:clamp(15px,.95rem,16px);--fs-md:clamp(16px,1rem,17px);--fs-lg:clamp(18px,1.15rem,20px);--fs-h3:clamp(20px,1.4rem,24px);--fs-h2:clamp(28px,2.2vw + 1rem,40px);--fs-h1:clamp(36px,3.4vw + 1rem,60px);--s-2:8px;--s-3:12px;--s-4:16px;--s-5:20px;--s-6:24px;--s-8:32px;--s-10:40px;--s-12:48px;--s-16:64px;--r-md:6px;--r-lg:8px;--r-pill:999px;--r-xl:12px;--sh-1:0 1px 2px rgba(15,25,20,.04);--sh-2:0 2px 4px rgba(15,25,20,.04),0 4px 12px rgba(15,25,20,.05);--sh-3:0 6px 16px rgba(15,25,20,.08),0 12px 36px rgba(15,25,20,.06);--sh-focus:0 0 0 3px rgba(15,58,107,.18)}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:var(--font-sans);font-size:var(--fs-body);line-height:1.55;-webkit-font-smoothing:antialiased}
a{color:var(--primary);text-decoration:none}
img{max-width:100%;display:block}
h1,h2,h3{margin:0;line-height:1.1;letter-spacing:-.015em;font-weight:600}
h1{font-size:var(--fs-h1);letter-spacing:-.025em}
h2{font-size:var(--fs-h2);letter-spacing:-.02em}
.container{max-width:1200px;margin:0 auto;padding:0 var(--s-6)}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--s-2);border:1px solid transparent;border-radius:var(--r-md);font-weight:500;font-size:var(--fs-sm);cursor:pointer;text-decoration:none;line-height:1;font-family:inherit;height:38px;padding:0 var(--s-4)}
.btn-md{height:38px}
.btn-lg{height:46px;padding:0 var(--s-5)}
.btn-primary{background:var(--primary);color:#fff;box-shadow:var(--sh-1)}
.btn-secondary{background:var(--surface);color:var(--text);border-color:var(--border-strong)}
.hdr{position:sticky;top:0;z-index:50;background:rgba(251,250,248,.78);-webkit-backdrop-filter:saturate(160%) blur(14px);backdrop-filter:saturate(160%) blur(14px);border-bottom:1px solid transparent}
.hdr-inner{display:flex;align-items:center;height:64px;gap:var(--s-8)}
.hdr-brand{display:inline-flex;align-items:center;gap:10px;color:var(--text);font-weight:600;font-size:15px;letter-spacing:-.01em}
.hdr-brand .mark{color:var(--primary);display:inline-flex}
.hdr-brand-name b{font-weight:600}
.hdr-brand-name span{font-weight:400;color:var(--text-2)}
.hdr-nav{display:flex;align-items:center;gap:4px;margin-left:var(--s-4)}
.hdr-nav a{padding:8px 12px;font-size:var(--fs-sm);font-weight:500;color:var(--text-2);border-radius:var(--r-md)}
.hdr-spacer{flex:1}
.hdr-actions{display:flex;align-items:center;gap:var(--s-2)}
@media (max-width:920px){.hdr-nav,.hdr-actions a:first-child{display:none}}
.section{padding:var(--s-16) 0}
.section-h{display:flex;flex-direction:column;gap:var(--s-3);margin-bottom:var(--s-10);max-width:720px}
.section-h-center{margin:0 auto var(--s-10);align-items:center;text-align:center}
.eyebrow{font-size:var(--fs-xs);text-transform:uppercase;letter-spacing:.12em;color:var(--text-3);font-weight:500;font-family:var(--font-mono)}
.field{display:flex;flex-direction:column;gap:6px}
.field-label{font-size:var(--fs-sm);font-weight:500;color:var(--text-2)}
.field-req{color:#a33232;margin-left:2px}
.field-input,.field-textarea{width:100%;height:40px;padding:0 var(--s-3);border:1px solid var(--border-strong);border-radius:var(--r-md);background:var(--surface);color:var(--text);font:inherit;font-size:var(--fs-sm);outline:none}
.field-textarea{height:auto;padding:var(--s-3);resize:vertical;line-height:1.5;min-height:120px}
.contact-form{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-xl);padding:var(--s-8);display:flex;flex-direction:column;gap:var(--s-5);max-width:720px;margin:0 auto}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:var(--s-4)}
@media (max-width:600px){.contact-grid{grid-template-columns:1fr}}
.contact-foot{display:flex;justify-content:space-between;align-items:center;gap:var(--s-4);flex-wrap:wrap}
.contact-legal{font-size:var(--fs-xs);color:var(--text-3)}
.ftr{border-top:1px solid var(--border);background:var(--bg);padding:var(--s-16) 0 var(--s-8);margin-top:var(--s-12)}
.ftr-cols{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:var(--s-8);margin-bottom:var(--s-12)}
.ftr-brand{display:flex;flex-direction:column;gap:var(--s-3);max-width:36ch}
.ftr-tag{color:var(--text-2);font-size:var(--fs-sm)}
.ftr-col .ftr-heading{font-size:var(--fs-xs);text-transform:uppercase;letter-spacing:.1em;color:var(--text-3);font-weight:500;font-family:var(--font-mono);margin-bottom:var(--s-4)}
.ftr-col ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:var(--s-2)}
.ftr-col a{color:var(--text-2);font-size:var(--fs-sm)}
.ftr-bottom{border-top:1px solid var(--border);padding-top:var(--s-6);display:flex;justify-content:space-between;flex-wrap:wrap;gap:var(--s-3);font-size:var(--fs-xs);color:var(--text-3)}
.ftr-bottom-links{display:flex;gap:var(--s-5);flex-wrap:wrap}
.ftr-bottom-links a{color:var(--text-3)}
@media (max-width:800px){.ftr-cols{grid-template-columns:1fr 1fr}}
@media (max-width:500px){.ftr-cols{grid-template-columns:1fr}}`;

const CAT_LABELS = {
  'grossistes-bougie':'Bougies','grossistes-vaisselle':'Vaisselle','grossistes-deco':'Décoration',
  'grossistes-casquette':'Casquettes','grossistes-laine':'Laine','grossistes-mug':'Mugs',
  'grossistes-carton':'Cartons','grossistes-parapluie':'Parapluies','grossistes-france':'Made in France',
  'grossistes-brule-parfum':'Brûle-parfum','grossistes-couche':'Couches bébé',
  'grossistes-decoration-noel':'Décorations Noël','grossistes-diamond-painting':'Diamond painting',
  'grossistes-canape-bubble':'Canapés bubble','grossistes-eclairage-led':'Éclairage LED',
  'grossistes-distributeur-automatique':'Distributeurs auto','grossistes-echarpe':'Écharpes',
  'grossistes-bonnet':'Bonnets','grossistes-deco-bali':'Déco Bali','grossistes-pyjama':'Pyjamas',
  'grossistes-robe':'Robes','grossistes-nappe':'Nappes','grossistes-gourde':'Gourdes',
  'grossistes-cutter':'Cutters','grossistes-coussin':'Coussins','grossistes-lunettes-eclipse':'Lunettes éclipse',
  'grossistes-valise':'Valises','grossistes-panneau-solaire':'Panneaux solaires','grossistes-eventail':'Éventails',
  'grossistes-statue-animal-resine':'Statues animales résine',
  // Nouvelles catégories
  'grossistes-defibrilateur':'Défibrillateurs','grossistes-panier':'Paniers','grossistes-canape':'Canapés',
  'grossistes-sapin-artificiel':'Sapins artificiels','grossistes-illuminations-noel':'Illuminations Noël',
  'grossistes-projecteurs-noel':'Projecteurs Noël','grossistes-costume-pere-noel':'Costumes Père Noël',
  'grossistes-automates-noel':'Automates Noël','grossistes-serre-tete-noel':'Serre-têtes Noël',
  'grossistes-lutin-farceur':'Lutins farceurs'
};

function buildJSONLD(page) {
  const url = `https://www.annuaire-grossistes.fr/${page.slug}/`;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": url, "url": url, "name": page.h1, "description": page.metaDesc, "inLanguage": "fr-FR", "isPartOf": { "@id": "https://www.annuaire-grossistes.fr/#website" } },
      { "@type": "BreadcrumbList", "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.annuaire-grossistes.fr/" },
        { "@type": "ListItem", "position": 2, "name": page.h1 }
      ] },
      { "@type": "FAQPage", "mainEntity": page.faq.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) }
    ]
  });
}

function buildNewPage(page) {
  const url = `https://www.annuaire-grossistes.fr/${page.slug}/`;
  const sectionsHTML = page.sections.map(s =>
    `<h2 style="font-size:24px;margin-top:32px;margin-bottom:16px;color:var(--text)">${s.h}</h2>\n<p style="margin-bottom:16px">${s.p}</p>`
  ).join('\n');
  const faqHTML = page.faq.map(f =>
    `<details style="padding:20px;border:1px solid var(--border);border-radius:8px;background:var(--surface)"><summary style="font-weight:600;cursor:pointer">${f.q}</summary><p style="margin-top:12px;color:var(--text-2);line-height:1.6">${f.a}</p></details>`
  ).join('\n');
  const relatedHTML = page.related.map(r =>
    `<a href="/${r}/" style="padding:24px;border:1px solid var(--border);border-radius:8px;background:var(--surface);color:var(--text);font-weight:500">Grossistes ${CAT_LABELS[r] || r}</a>`
  ).join('\n');

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${page.metaTitle}</title>
<meta name="description" content="${page.metaDesc}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="google-site-verification" content="UWuc8OiAlttc0mDnKwrJF613xKABK_a9zYQ7JdJQmYA">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="canonical" href="${url}">
<meta property="og:type" content="article">
<meta property="og:title" content="${page.h1}">
<meta property="og:description" content="${page.metaDesc}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="fr_FR">
<link rel="preload" href="/assets/fonts/InterVariable.woff2" as="font" type="font/woff2" crossorigin>
<style>${INLINE_CSS}</style>
<script type="application/ld+json">${buildJSONLD(page)}</script>
</head>
<body>
${HEADER}
<main>
<section class="section" style="padding-top:48px">
<div class="container">
<nav class="breadcrumb" aria-label="Fil d'Ariane" style="font-size:13px;color:var(--text-2);margin-bottom:24px"><a href="/" style="color:var(--text-2)">Accueil</a> <span style="margin:0 8px">/</span> <a href="/categories/" style="color:var(--text-2)">Catégories</a> <span style="margin:0 8px">/</span> <span>${page.h1}</span></nav>
<h1 style="font-size:clamp(28px,2.6vw + 1rem,44px);margin-bottom:16px">${page.h1}</h1>
<p style="font-size:18px;color:var(--text-2);max-width:65ch;margin-bottom:32px">${page.intro}</p>
<div style="max-width:75ch;line-height:1.7;color:var(--text-2)">
${sectionsHTML}
</div>

<h2 style="font-size:28px;margin-top:64px;margin-bottom:24px">Questions fréquentes</h2>
<div style="display:grid;gap:16px">
${faqHTML}
</div>

<h2 style="font-size:24px;margin-top:64px;margin-bottom:24px">Catégories proches</h2>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
${relatedHTML}
</div>
</div>
</section>

${CONTACT_FORM}

</main>
${FOOTER}
${SCRIPT}
</body>
</html>`;
}

// ─── Main ──────────────────────────────────────────────────────
let createdNew = 0, skipped = 0;
for (const p of PAGES) {
  const dir = path.join(ROOT, p.slug);
  if (fs.existsSync(dir)) {
    console.log(`  [SKIP] ${p.slug} — dossier déjà existant`);
    skipped++;
    continue;
  }
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildNewPage(p), 'utf8');
  console.log(`  [NEW]  ${p.slug}`);
  createdNew++;
}
console.log(`\nCréées: ${createdNew} | Skippées: ${skipped}`);

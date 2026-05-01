#!/usr/bin/env node
// Génère / patche les pages catégorie de annuaire-grossistes.fr
// Voir mapping EMD ci-dessous

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;

// ─── Mapping EMD → page catégorie ──────────────────────────────
// status: 'NEW' = créer | 'EXISTS' = patcher
const PAGES = [
  // NEW
  { slug: 'grossistes-decoration-noel', emd: 'grossiste-decorations-noel.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en décorations de Noël',
    productSingular: 'décoration de Noël', productPlural: 'décorations de Noël', productShort: 'décorations Noël',
    metaTitle: 'Grossistes décorations de Noël B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en décorations de Noël. Boules, guirlandes, sapins, MOQ carton, fournisseurs vérifiés SIRET.',
    intro: 'Sélection de fournisseurs B2B en décorations de Noël (boules, guirlandes lumineuses, sapins artificiels, sujets en résine). Saison courte, marges fortes, livraisons concentrées août-novembre.',
    sections: [
      { h: 'Marché B2B des décorations de Noël en France', p: 'Le marché français des décorations de Noël pèse 480 M€ en 2025. La saison commerciale démarre en septembre pour les fleuristes et boutiques, et représente jusqu\'à 35% du chiffre annuel des magasins de déco. Deux circuits dominent : import Asie via grossistes français (volumes, prix bas) et fabricants européens (verre soufflé Pologne, résine Italie, lumineux Allemagne).' },
      { h: 'Familles de produits', p: 'Boules de Noël (verre, plastique, papier mâché), guirlandes électriques LED (intérieur/extérieur, IP44 minimum), sapins artificiels (PVC, PE, mix), sujets en résine (santons, crèches), couronnes de l\'avent, ornements personnalisables. La part LED a remplacé 95% des guirlandes incandescence depuis 2022.' },
      { h: 'MOQ et conditions saison', p: 'Boules verre : carton 30-60 unités, MOQ 6 cartons. Guirlandes LED : MOQ 50 pièces. Sapins artificiels : MOQ 1 palette (12-24 pièces selon hauteur). Commandes à passer entre mai et juillet pour livraison septembre — au-delà, ruptures fréquentes sur les références phares.' }
    ],
    faq: [
      { q: 'Quand commander ses décorations de Noël chez un grossiste ?', a: 'Idéalement entre mai et juillet pour une livraison fin août / début septembre. Passé août, les fournisseurs sont en rupture sur 30 à 50% du catalogue, surtout sur les nouveautés et les références best-sellers.' },
      { q: 'Quelle marge moyenne en revente déco de Noël ?', a: 'La marge brute revente est de 2,2 à 2,8 (coefficient appliqué au prix grossiste HT). En boutique physique, le rotation est rapide entre fin novembre et le 24 décembre — anticipez les soldes post-Noël à -50% pour écouler le stock.' },
      { q: 'Guirlandes LED extérieur : quelle norme exiger ?', a: 'IP44 minimum pour balcon couvert, IP65 pour pose pleine pluie. Norme CE obligatoire avec marquage sur emballage et notice. Demandez le rapport de test EN 60598 au fournisseur — un grossiste sérieux le fournit sans détour.' },
      { q: 'Sapin artificiel : différence PE vs PVC ?', a: 'Le PE (polyéthylène) imite mieux les aiguilles naturelles avec un effet 3D, mais coûte 2x plus cher que le PVC. Mix PE/PVC : compromis qualité/prix, branches extérieures en PE, intérieures en PVC.' }
    ],
    related: ['grossistes-deco', 'grossistes-bougie', 'grossistes-deco-bali']
  },

  { slug: 'grossistes-diamond-painting', emd: 'grossiste-diamond-painting.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en diamond painting',
    productSingular: 'diamond painting', productPlural: 'kits diamond painting', productShort: 'diamond painting',
    metaTitle: 'Grossistes diamond painting B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en kits diamond painting. Toiles AB, perles 5D, MOQ accessibles, fournisseurs vérifiés SIRET.',
    intro: 'Sélection de fournisseurs B2B en kits diamond painting (broderie diamant). Toile pré-encollée, perles résine 5D, planche de tri, applicateur. MOQ accessibles aux merceries et boutiques loisirs créatifs.',
    sections: [
      { h: 'Marché B2B du diamond painting en France', p: 'Le diamond painting est entré sur le marché français en 2018, avec un boom post-COVID. Le marché B2B pèse 25 M€ en 2025, alimenté par les boutiques de loisirs créatifs, merceries en ligne, et corners spécialisés. Les fournisseurs sont quasi exclusivement importateurs (Chine, parfois Pologne).' },
      { h: 'Composantes d\'un kit', p: 'Toile en lin synthétique pré-imprimée et encollée, perles résine taillées 5D (effet AB pour irisation), planche de tri à compartiments, stylet applicateur, cire de fixation. Formats : 30×40 cm (entrée), 40×50 cm (best-seller), 50×70 cm et 60×80 cm pour le segment premium.' },
      { h: 'MOQ et conditions', p: 'Kits 30×40 : MOQ 30 unités mixées (motifs au choix). Kits 50×70 : MOQ 12 unités. Toiles personnalisées photo client : MOQ 1, délai 3 semaines. Perles en vrac (sachets de 200 par couleur) : MOQ 100 sachets toutes couleurs confondues. Référencement DMC pour 447 nuances.' }
    ],
    faq: [
      { q: 'Différence diamond painting full drill vs partial drill ?', a: 'Full drill : toile entièrement recouverte de perles (rendu uniforme, prix plus élevé). Partial drill : seul le motif est en perles, le fond reste imprimé. Le full drill représente 80% du marché B2B aujourd\'hui.' },
      { q: 'Perles rondes ou carrées : que choisir ?', a: 'Carrées (square drill) : rendu mosaïque net, plus précis pour les détails fins. Rondes (round drill) : pose plus rapide, débutants. Le carré domine le marché premium depuis 2023, avec un surcoût de 10-15%.' },
      { q: 'MOQ minimum pour ouvrir un compte revendeur ?', a: 'Première commande 500 à 1500€ HT selon le grossiste, avec un panel de 30 à 60 références. Réassorts ensuite à partir de 200-300€. Les fournisseurs sérieux exigent un Kbis et un numéro TVA intracommunautaire.' },
      { q: 'Conformité jouets : faut-il une norme CE ?', a: 'Diamond painting destiné aux 14+ : pas de norme CE jouet requise. Pour kits enfants 8-12 ans : test EN 71-3 (migration métaux lourds des perles) à exiger du fournisseur.' }
    ],
    related: ['grossistes-laine', 'grossistes-deco', 'grossistes-coussin']
  },

  { slug: 'grossistes-canape-bubble', emd: 'canapes-bubble.com', status: 'NEW',
    h1: 'Annuaire des grossistes de canapés bubble',
    productSingular: 'canapé bubble', productPlural: 'canapés bubble', productShort: 'canapés bubble',
    metaTitle: 'Grossistes canapés bubble B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes et fabricants de canapés bubble (effet boules). Tissu bouclette, modulaire, livraison France, fournisseurs SIRET.',
    intro: 'Fournisseurs et fabricants B2B de canapés bubble (canapés modulaires effet boules en tissu bouclette). Inspiration design Mario Bellini, modèles 2 à 5 places, livraison France métropolitaine.',
    sections: [
      { h: 'Le canapé bubble : un segment design en pleine croissance', p: 'Le canapé bubble (réinterprétation du Camaleonda de Bellini, 1971) est devenu une icône Instagram depuis 2021. Le marché B2B se structure autour de fabricants italiens (Pologne pour le mid-range), et de quelques distributeurs français qui assurent SAV et livraison à domicile. Prix grossiste : 800 à 2400€ HT selon dimensions.' },
      { h: 'Caractéristiques techniques', p: 'Structure : panneaux MDF + sangles, mousse haute densité 30-35 kg/m³, garnissage plumes ou mousse à mémoire. Tissu : bouclette polyester 100% (entry), laine bouclette (premium), velours côtelé (best-seller couleur). Modules indépendants assemblés par crochets cachés ou velcro renforcé.' },
      { h: 'MOQ, livraison et SAV', p: 'MOQ 1 unité chez la majorité des fabricants (modèle exposé). Pour ouvrir un compte revendeur : commande initiale 5000 à 10000€ HT, soit 4-6 modèles d\'exposition. Livraison conteneur 4-8 semaines depuis l\'Italie, 2-3 semaines depuis stocks France. SAV mousse : garantie 5 ans, tissu : 2 ans hors usure.' }
    ],
    faq: [
      { q: 'Combien coûte un canapé bubble en gros ?', a: 'Modèle 3 places fixe : 1100 à 1800€ HT. Modèle modulaire 4 places : 1900 à 2800€ HT. Configuration d\'angle 5 places avec méridienne : 2800 à 4200€ HT. Les prix dépendent fortement du tissu (bouclette polyester vs laine).' },
      { q: 'Délai livraison fournisseur grossiste France ?', a: '2 à 3 semaines pour un modèle en stock, 6 à 10 semaines pour un sur-mesure (tissu ou dimensions spécifiques). Comptez 4 jours supplémentaires pour la livraison étage avec créneau.' },
      { q: 'Tissu bouclette : entretien revente ?', a: 'Aspirateur brosse douce hebdomadaire, nettoyage humide tampon (savon de Marseille dilué). Éviter détachants chimiques (jaunissement). Housse non amovible sur la majorité des modèles — préciser au client final.' },
      { q: 'Garantie commerciale standard ?', a: 'Mousse et structure : 5 ans. Tissu : 2 ans hors usure normale. Coutures : 2 ans. Le revendeur applique la garantie en relais du fabricant — vérifier les conditions de retour avant ouverture compte.' }
    ],
    related: ['grossistes-deco', 'grossistes-coussin', 'grossistes-deco-bali']
  },

  { slug: 'grossistes-eclairage-led', emd: 'sol-led.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en éclairage LED',
    productSingular: 'éclairage LED', productPlural: 'éclairages LED', productShort: 'éclairage LED',
    metaTitle: 'Grossistes éclairage LED B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en éclairage LED. Spots, dalles, rubans, downlights, fournisseurs vérifiés SIRET, livraison rapide.',
    intro: 'Fournisseurs B2B d\'éclairage LED pour électriciens, installateurs, magasins de bricolage et architectes d\'intérieur. Spots encastrables, dalles plafond, rubans, panneaux solaires intégrés.',
    sections: [
      { h: 'Marché B2B de l\'éclairage LED en France', p: 'Le LED a remplacé 88% du parc fluocompact et 95% du halogène depuis 2018 (interdiction halogène 2018, fluo 2023). Le marché B2B français pèse 1,4 Md€ en 2025, dominé par 3 importateurs majeurs et 200 grossistes régionaux. Les fabricants français (Aric, Sylvania) couvrent surtout le segment professionnel haut de gamme.' },
      { h: 'Familles produits et certifications', p: 'Spots GU10 / G4 (résidentiel), dalles 600×600 (tertiaire bureaux), downlights étanches (cuisine, salle de bain), rubans LED COB (déco), projecteurs IP65 (extérieur), tubes T8 (industriel, garages). Exigez : marquage CE, IRC ≥ 80, certificat RoHS, classe énergétique (A à G nouvelle échelle 2021).' },
      { h: 'MOQ et conditions revendeur', p: 'Spots : carton 10 unités, MOQ 5 cartons. Dalles : carton de 4, MOQ 2 cartons. Rubans 5m : MOQ 50 rouleaux. Pour ouvrir un compte revendeur : Kbis + 1500€ HT première commande. Délais : 48-72h en stock, 4-6 semaines pour l\'import direct conteneur.' }
    ],
    faq: [
      { q: 'Quelle température de couleur LED choisir en revente ?', a: 'Pour le résidentiel : 2700K-3000K (blanc chaud, 80% des ventes). Bureaux et commerce : 4000K (blanc neutre). Atelier, garage : 5000K-6500K (blanc froid). Stockez prioritairement le 2700K et 4000K, qui couvrent 90% des demandes.' },
      { q: 'IRC : pourquoi c\'est crucial pour la revente ?', a: 'L\'IRC (indice rendu couleur) mesure la fidélité chromatique : 80 minimum pour résidentiel, 90+ pour magasins de mode, photographie, cuisines pro. Un IRC < 80 fait remonter des plaintes clients (couleurs ternes, peau jaune en miroir).' },
      { q: 'Garantie LED standard B2B ?', a: '3 ans pour le résidentiel, 5 ans pour le tertiaire (driver inclus), 2 ans seulement pour les rubans déco. Le fabricant remplace le luminaire défectueux mais ne couvre pas la main-d\'œuvre de pose — précisez au client.' },
      { q: 'Avantage solaire intégré pour la revente ?', a: 'Spots solaires extérieurs (jardin, allée) : marge 2,5 à 3, démarrage saison avril-juin. Pas d\'installation électrique = panier client autonome bricoleur. Stockez avant mai pour éviter les ruptures juin-juillet.' }
    ],
    related: ['grossistes-deco', 'grossistes-panneau-solaire', 'grossistes-eventail']
  },

  { slug: 'grossistes-distributeur-automatique', emd: 'grossiste-distributeur-automatique.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en distributeurs automatiques',
    productSingular: 'distributeur automatique', productPlural: 'distributeurs automatiques', productShort: 'distributeurs automatiques',
    metaTitle: 'Grossistes distributeurs automatiques B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en distributeurs automatiques. Snack, boissons, café, MOQ unitaire, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de distributeurs automatiques (snack, boissons fraîches, café grain, eau filtrée, produits hygiène). Vente neuf et reconditionné, contrats de gestion ou achat sec, livraison France métro.',
    sections: [
      { h: 'Marché B2B de la distribution automatique', p: 'La France compte 600 000 distributeurs automatiques en activité (entreprises, écoles, gares, hôpitaux). Le marché B2B équipement pèse 380 M€ en 2025. Trois segments : neuf premium (Necta, Bianchi, Jofemar), neuf entry-level (import asiatique), et reconditionné garanti 6-12 mois (40% du volume revendeur).' },
      { h: 'Familles de machines', p: 'Snack à spirales (jusqu\'à 36 sélections), distributeurs réfrigérés boissons (canettes/bouteilles), machines café grain professionnelles, fontaines à eau filtrée connectées, distributeurs hygiène (préservatifs, EPI). Capacité 200 à 600 produits selon modèle.' },
      { h: 'MOQ, paiement et SAV', p: 'MOQ 1 unité, à partir de 1800€ HT en reconditionné, 4500€ HT en neuf entry. Modes paiement : achat sec, leasing 36-60 mois, contrat de gestion (le fournisseur exploite, partage du chiffre). SAV obligatoire dans un rayon de 100 km. Pièces détachées garanties 5 ans pour les marques européennes.' }
    ],
    faq: [
      { q: 'Distributeur neuf ou reconditionné : que conseiller au client ?', a: 'Reconditionné pour un placement test ou un site < 100 passages/jour (ROI plus rapide). Neuf pour un site > 200 passages/jour, garantie 24 mois et image de marque. Le reconditionné représente 40% des ventes B2B en 2025.' },
      { q: 'Paiement par carte / sans contact : surcoût ?', a: 'Module CB sans contact + télémétrie : +600 à 900€ HT par machine, retour sur investissement en 8-14 mois (panier moyen +35% avec CB vs espèces seules). Indispensable pour les sites < 25 ans.' },
      { q: 'Quelle marge en revente distributeur ?', a: 'Coefficient revente 1,3 à 1,5 sur le matériel (marge moins forte qu\'un consommable car gros panier). Le vrai chiffre est sur les contrats de maintenance (300-600€ HT/an/machine) et l\'approvisionnement consommables.' },
      { q: 'Norme NF en distribution automatique ?', a: 'NF EN 16767 pour distributeurs alimentaires, NF EN 60335-2-75 pour la sécurité électrique. Marquage CE obligatoire, déclaration de conformité à fournir au client final professionnel.' }
    ],
    related: ['grossistes-mug', 'grossistes-gourde', 'grossistes-carton']
  },

  { slug: 'grossistes-echarpe', emd: 'grossiste-echarpes.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en écharpes',
    productSingular: 'écharpe', productPlural: 'écharpes', productShort: 'écharpes',
    metaTitle: 'Grossistes écharpes B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en écharpes. Laine, cachemire, soie, fabrication FR et import, MOQ accessibles, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B d\'écharpes pour boutiques mode, prêt-à-porter, accessoiristes. Laine, cachemire, soie, mélanges. Fabrication française tissée et import qualité.',
    sections: [
      { h: 'Marché B2B de l\'écharpe en France', p: 'L\'écharpe pèse 410 M€ B2B annuel en France, avec un pic novembre-février (60% des ventes annuelles). Trois segments coexistent : luxe (cachemire, soie tissée, fabriqué Italie ou Écosse), milieu de gamme (laine mélangée, fabrication portugaise ou turque), et entry-level (acrylique, import Chine).' },
      { h: 'Matières et fabrications', p: 'Cachemire (Mongolie, Népal) : prix grossiste 28-65€ HT pièce. Mérinos extrafine : 12-22€ HT. Soie naturelle imprimée Côme : 18-40€ HT. Acrylique brossé effet laine : 2-5€ HT. Mélanges (laine-acrylique, laine-soie) couvrent le coeur de marché à 6-12€ HT.' },
      { h: 'MOQ et saisonnalité', p: 'MOQ 12 pièces par référence chez les fabricants, 24 pièces minimum chez les grossistes import. Pour un assortiment crédible boutique mode : 80-120 références (3 matières × 4 coloris × 6 motifs). Commandes saison hiver à passer mai-juin pour livraison septembre-octobre.' }
    ],
    faq: [
      { q: 'Écharpe vs étole vs châle : différences B2B ?', a: 'Écharpe : 25-35 cm × 160-200 cm. Étole : 50-80 cm × 180-220 cm (plus enveloppante). Châle : 100×200 cm minimum (carré ou rectangle, souvent franges). MOQ identique mais panier client différent — l\'étole se vend 1,5 à 2× plus cher que l\'écharpe.' },
      { q: 'Comment vérifier qu\'un cachemire est authentique ?', a: 'Test brûlure (mèche prélevée discret, odeur cheveu brûlé, cendre fragile = laine fine). Étiquette composition : "100% cachemire" exigible (pas "cachemire mélangé"). Origine plateaux Mongolie ou Népal valorisée. Le fournisseur sérieux fournit l\'attestation Cashmere Standard.' },
      { q: 'Saison écharpe : quand commander ?', a: 'Commandes hiver : mai à juillet pour livraison septembre. Mi-saison (étoles légères) : février-mars pour livraison avril-mai. Soldes janvier permettent d\'écouler 70% du stock résiduel à -50%.' },
      { q: 'Personnalisation logo / monogramme ?', a: 'Brodage monogramme : MOQ 50 pièces, +2-4€ HT/pièce. Tissage jacquard avec logo intégré : MOQ 300 pièces, devis sur mesure. Délais 6-10 semaines pour personnalisation depuis import.' }
    ],
    related: ['grossistes-bonnet', 'grossistes-laine', 'grossistes-casquette']
  },

  { slug: 'grossistes-bonnet', emd: 'grossiste-bonnets.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en bonnets',
    productSingular: 'bonnet', productPlural: 'bonnets', productShort: 'bonnets',
    metaTitle: 'Grossistes bonnets B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en bonnets. Mérinos, acrylique, polaire, personnalisation, MOQ accessibles, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de bonnets pour boutiques, équipementiers sport, goodies entreprise. Mérinos, acrylique, polaire, mailles côtelées, à pompon. Personnalisation broderie disponible.',
    sections: [
      { h: 'Marché B2B du bonnet en France', p: 'Le bonnet pèse 180 M€ annuels B2B en France, avec une saisonnalité concentrée octobre-février. Le segment goodies entreprise (corporate gifts) représente 25% du chiffre, avec broderie ou patch logo. Les marques sport (équipementiers ski, montagne) achètent 40% du volume premium.' },
      { h: 'Matières et finitions', p: 'Acrylique 100% (entry, 1,80-3,50€ HT), mélange laine-acrylique (3-6€ HT), mérinos extrafine (8-18€ HT), polaire microfibre (4-8€ HT). Finitions : maille côtelée double, à revers, à pompon faux-fourrure ou véritable, doublé polaire. Marques techniques exigent un test ASTM F2879 pour ski.' },
      { h: 'MOQ et personnalisation', p: 'MOQ 12 pièces par référence chez les fabricants, 24 pièces chez les grossistes import. Patch en cuir : MOQ 50 pièces, +1,20-2€ HT. Broderie 3D : MOQ 100 pièces, +1,50-3€ HT, gabarit jusqu\'à 8×4 cm. Tissage jacquard intégré : MOQ 300 pièces, devis personnalisé.' }
    ],
    faq: [
      { q: 'MOQ minimum bonnets personnalisés ?', a: '50 pièces pour un patch cuir cousu, 100 pièces pour broderie 3D fil de qualité. En dessous, comptez les MOQ standard fabricant (12 à 24 pièces) sans logo.' },
      { q: 'Mérinos ou acrylique pour la revente ?', a: 'Acrylique 100% : marge 2,5-3, panier client 8-15€ TTC en boutique. Mérinos : marge 2,2-2,5, panier 25-50€ TTC. Stockez 70% acrylique / 30% mérinos pour couvrir entry-level et premium.' },
      { q: 'Délai livraison sur bonnet personnalisé ?', a: '3 à 4 semaines pour broderie sur stock disponible, 8 à 10 semaines pour fabrication import + broderie. Pour les commandes corporate Noël : passer commande avant fin août.' },
      { q: 'Norme bonnet bébé / enfant ?', a: 'Norme EN 14682 (cordons et liens dans les vêtements enfants) : pas de cordon de serrage sur 0-7 ans. Test EN 71-3 (migration métaux lourds) pour patchs métalliques. Le grossiste fournit l\'attestation à exiger.' }
    ],
    related: ['grossistes-echarpe', 'grossistes-laine', 'grossistes-casquette']
  },

  { slug: 'grossistes-deco-bali', emd: 'grossiste-deco-bali.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en déco bali',
    productSingular: 'décoration bali', productPlural: 'décorations bali', productShort: 'déco bali',
    metaTitle: 'Grossistes déco bali B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes en décoration style Bali. Bois flotté, rotin, macramé, lampes en bambou, MOQ palette, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de décoration style Bali / wabi-sabi / bohème. Bois flotté, rotin tressé, macramé, lampes en bambou, vases en céramique brute, miroirs en coquillages. Import Indonésie direct ou via importateur français.',
    sections: [
      { h: 'Marché B2B de la déco bali en France', p: 'La déco bali / bohème a porté 95 M€ de ventes B2B en 2025, en croissance de +12% par an depuis 2020. La cible : boutiques cadeaux, magasins de meuble bohème, hôtels boutique, AirBnB premium. L\'import direct depuis Java et Bali nécessite un container 20\' (15-20 k€) — la majorité des revendeurs passe par un importateur français.' },
      { h: 'Familles de produits', p: 'Lampes suspension en bambou ou rotin (40-90 cm Ø), miroirs en coquillage ou rotin tressé, vases en terre cuite et bois flotté, suspensions macramé (jute, coton naturel), poufs en cuir tressé, paniers de rangement en feuilles de palmier. Saisonnalité faible — pic mai-août pour la décoration jardin/extérieur.' },
      { h: 'MOQ, conteneurs et délais', p: 'Via importateur français : MOQ 1 unité (catalogue stock), commande min 800€ HT. Direct Indonésie : MOQ container mixte 15-20 m³, 8-12 semaines port-à-port. Délai conditionnement 4-5 semaines + 6-8 semaines transport maritime + dédouanement 5 jours. Privilégier l\'importateur français pour démarrer.' }
    ],
    faq: [
      { q: 'Import Bali direct ou via importateur français ?', a: 'Importateur français : MOQ 1 unité, marge revente moins forte mais zéro risque qualité, livraison 48-72h. Direct Bali : économies 30-40% mais conteneur complet (15 k€), gestion douane, risque casse. Démarrez via importateur, basculez direct après 18-24 mois si volume.' },
      { q: 'Quelle traçabilité du bois exiger ?', a: 'Certificat SVLK (Sistem Verifikasi Legalitas Kayu) obligatoire à l\'import EU depuis 2013. Le fournisseur sérieux fournit le SVLK + facture export Indonésie. Le règlement RBUE 2024 rend ce contrôle plus strict — exigez systématiquement.' },
      { q: 'Marges revente en boutique déco bali ?', a: 'Coefficient 2,8 à 3,5 sur du petit objet, 2,2 à 2,8 sur les meubles (suspensions, miroirs grands formats). Marge plus forte que la déco classique car peu de comparaison prix possible (chaque pièce est artisanale).' },
      { q: 'Macramé : risque de moisissure en revente ?', a: 'Coton brut non traité : risque dans environnement humide (salle de bain, stockage cave). Demandez la certification "anti-moisi" (traitement borate) ou stockage en pièce sèche. Conditionnement individuel sachet plastique avec sachet absorbeur.' }
    ],
    related: ['grossistes-deco', 'grossistes-coussin', 'grossistes-decoration-noel']
  },

  { slug: 'grossistes-pyjama', emd: 'grossiste-pyjamas.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en pyjamas',
    productSingular: 'pyjama', productPlural: 'pyjamas', productShort: 'pyjamas',
    metaTitle: 'Grossistes pyjamas B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en pyjamas femme, homme, enfant. Coton bio, satin, polaire, MOQ accessibles, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de pyjamas pour boutiques de lingerie, prêt-à-porter, magasins enfance. Femme, homme, enfant. Coton, coton bio, satin de coton, polaire microfibre, jersey extensible.',
    sections: [
      { h: 'Marché B2B du pyjama en France', p: 'Le pyjama est un segment vendu 540 M€ B2B en 2025, en croissance constante depuis le COVID (le "loungewear" a dépassé la lingerie traditionnelle en chiffre). La segmentation : femme (55%), enfant (25%), homme (20%). Origines : fabrication portugaise et turque pour le milieu/haut de gamme, Bangladesh / Inde pour l\'entry.' },
      { h: 'Matières et coupes', p: 'Coton 100% jersey (basique entry-level), coton bio GOTS (premium éco-conscient), satin de coton (haut de gamme féminin), polaire microfibre (hiver, segment enfant), modal et bambou (luxe technique). Coupes : ensemble haut/bas chemise + pantalon, combishort, robe de nuit, kigurumi animal (saisonnier Noël).' },
      { h: 'MOQ et conditions revendeur', p: 'MOQ 12 pièces par référence chez les fabricants portugais, 24 pièces minimum chez import asiatique. Pour ouvrir compte revendeur : 1500-3000€ HT première commande. Cycles : collection automne-hiver à passer en mai, printemps-été en novembre. Réassorts continus possibles sur basiques.' }
    ],
    faq: [
      { q: 'Coton bio ou coton standard pour la revente ?', a: 'Coton bio GOTS : +30 à 40% au prix grossiste, justifie un panier final +50% en boutique éco-positionnée. Coton standard reste 60% des ventes B2B en 2025. L\'argument bio est puissant sur le segment bébé/enfant et lingerie féminine premium.' },
      { q: 'Pyjama enfant : norme et précautions ?', a: 'Norme EN 14878 (inflammabilité) obligatoire pour pyjamas 0-14 ans en France/EU. Pas de cordons de serrage (norme EN 14682). Pas d\'éléments décoratifs détachables 0-3 ans. Le grossiste fournit les certificats.' },
      { q: 'Saisonnalité commande pyjama B2B ?', a: 'Polaire et flanelle : commander avril-mai pour livraison septembre. Coton léger / satin été : commander octobre-novembre pour livraison février-mars. Basiques jersey vendus toute l\'année — réassorts mensuels.' },
      { q: 'Personnalisation logo / monogramme ?', a: 'Broderie monogramme : MOQ 50 pièces, +2-3€ HT. Sublimation imprimé personnalisé : MOQ 100 pièces, +3-5€ HT, délai 4-6 semaines. Pour les commandes corporate Noël : valider la maquette avant fin septembre.' }
    ],
    related: ['grossistes-robe', 'grossistes-coussin', 'grossistes-laine']
  },

  { slug: 'grossistes-robe', emd: 'grossiste-robes.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en robes',
    productSingular: 'robe', productPlural: 'robes', productShort: 'robes',
    metaTitle: 'Grossistes robes B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en robes femme. Été, soirée, tailleur, MOQ accessibles, fabrication portugaise et import, fournisseurs SIRET.',
    intro: 'Fournisseurs B2B de robes femme pour boutiques de prêt-à-porter, e-commerce mode, dépôts-vente. Robes d\'été, de soirée, de cocktail, tailleurs. Fabrication portugaise et turque, import qualité.',
    sections: [
      { h: 'Marché B2B de la robe en France', p: 'La robe est l\'item phare du prêt-à-porter féminin avec 1,2 Md€ de ventes B2B en 2025. La saisonnalité est marquée : 65% des ventes annuelles concentrées avril-septembre (robes légères), 20% novembre-décembre (robes de fête). Origines majoritaires : Portugal, Turquie, Italie pour le mid-range, Chine et Bangladesh pour l\'entry-level.' },
      { h: 'Familles et coupes', p: 'Robe d\'été (lin, viscose, jersey léger), robe de cocktail (satin, jersey crêpe), robe de soirée longue, robe portefeuille, robe trapèze, robe chemise. Tailles standardisées XS-XL en mid-range, du 36 au 50 en grande taille (segment +18% depuis 2022).' },
      { h: 'MOQ et conditions saison', p: 'MOQ 6 pièces par référence en taille assortie (S-M-L-XL × 1-2 par taille) chez les fabricants portugais. 12 pièces minimum chez les importateurs Turquie. Pour un compte revendeur : 2000-4000€ HT première commande. Réassorts possibles à 800€ HT minimum sur best-sellers.' }
    ],
    faq: [
      { q: 'Quelle saison commander une collection robes été ?', a: 'Commander en novembre-décembre pour livraison février-mars (mise en boutique mars-avril). Pour collection automne-hiver (robes pulls, robes laine) : commander mai-juin pour livraison août-septembre.' },
      { q: 'Panel taille à constituer en boutique mode ?', a: 'Sur 100 robes en boutique : 35 en M, 30 en L, 20 en S, 10 en XL, 5 en XS. Adaptez selon votre clientèle locale — un quartier jeune urbain ira plus sur S-M, un secteur familial sur L-XL.' },
      { q: 'Robes grandes tailles : quel positionnement ?', a: 'Marché en croissance +18%/an depuis 2022. Coupes spécifiques nécessaires (pas un simple agrandissement homothétique). Marques spécialisées : Joanna Hope, Castaluna, Kiabi Inclusive. MOQ identique aux tailles standard chez les fabricants portugais.' },
      { q: 'Délais et retours invendus ?', a: '3-4 semaines depuis stock fournisseur portugais, 6-10 semaines depuis Turquie pour fabrication. Retour invendus : très rare en B2B mode (max 5-10% en accord négocié, contre échange ou avoir). Préférez un assortiment serré qu\'un excédent de stock.' }
    ],
    related: ['grossistes-pyjama', 'grossistes-echarpe', 'grossistes-bonnet']
  },

  { slug: 'grossistes-nappe', emd: 'grossiste-nappe.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en nappes',
    productSingular: 'nappe', productPlural: 'nappes', productShort: 'nappes',
    metaTitle: 'Grossistes nappes B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en nappes. Coton, lin, polyester anti-tache, restauration et particuliers, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de nappes pour restaurants, traiteurs, hôtels, salles de réception et magasins arts de la table. Coton, lin, polyester anti-tache, formats standards et sur-mesure.',
    sections: [
      { h: 'Marché B2B de la nappe en France', p: 'Le marché B2B nappes pèse 220 M€ annuels en France, dominé par les ventes restauration (60%) et hôtellerie (20%). Le segment particulier (boutiques arts de la table) représente 20% du marché. Quatre matières dominent : polyester anti-tache (HoReCa), coton tissé (mid-range maison), lin (premium), tissus enduits (terrasses, extérieur).' },
      { h: 'Formats et matières', p: 'Formats standard : 140×140 cm (carré 4 places), 140×220 cm (rectangulaire 6 places), 140×280 cm (8 places), 140×340 cm (10-12 places), 250×250 cm (rond grande table). Polyester 200g/m² standard HoReCa, lin lavé 240g/m² premium, coton damassé jacquard pour réceptions.' },
      { h: 'MOQ, conditions et entretien', p: 'MOQ 6 pièces par référence chez les fabricants portugais et turcs, 12 pièces chez import asiatique. Pour HoReCa : commandes par panel taille (souvent en 24 ou 48 pièces). Lavage industriel 60-90°C exigé pour polyester restauration — vérifier la résistance étiquette fournisseur.' }
    ],
    faq: [
      { q: 'Quelle nappe choisir pour un restaurant ?', a: 'Polyester anti-tache 200g/m² blanc cassé : meilleur rapport qualité/durée. Résiste 200+ lavages industriels 60°C. Évitez le coton 100% (rétrécit au lavage répété, jaunit). Le lin tient 5-7 ans en restauration, mais coût d\'entretien double.' },
      { q: 'Nappe ronde diamètre standard ?', a: '180 cm Ø (table 4-6 personnes), 230 cm Ø (table 6-8), 300 cm Ø (table 10-12). Mesurez le diamètre table + 30 cm de retombée minimum (60 cm pour réception protocolaire).' },
      { q: 'Anti-tache : quel traitement chimique ?', a: 'Téflon (anciens stocks) ou Sanitized actuel. Vérifiez la fiche technique : durabilité 50 lavages minimum (sinon le traitement disparaît rapidement). Étiquette "Greenshield" ou équivalent éco pour les hôteliers responsables.' },
      { q: 'Nappes jetables vs lavables : marché ?', a: 'Jetables intissées : marché HoReCa low-cost et événementiel (+8%/an), prix grossiste 0,40-1,20€ HT pièce. Lavables tissu : positionnement qualitatif. Les hôtels 3-4* basculent partiellement en intissé pour les petits-déjeuners depuis 2023.' }
    ],
    related: ['grossistes-vaisselle', 'grossistes-mug', 'grossistes-deco']
  },

  { slug: 'grossistes-gourde', emd: 'grossiste-gourde.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en gourdes',
    productSingular: 'gourde', productPlural: 'gourdes', productShort: 'gourdes',
    metaTitle: 'Grossistes gourdes B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en gourdes. Inox isotherme, plastique tritan, marquage logo, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de gourdes inox isothermes, gourdes tritan sans BPA, gourdes en verre. Personnalisation logo gravure laser ou impression. Pour boutiques sport, goodies entreprise, écoles et magasins bio.',
    sections: [
      { h: 'Marché B2B de la gourde en France', p: 'Le marché de la gourde réutilisable a explosé depuis 2018 (interdiction bouteilles plastique en restauration scolaire 2022). Volume B2B 290 M€ en 2025, dominé par l\'inox isotherme double paroi (75% du chiffre). Segments : sport, scolaire, goodies entreprise (40% du volume B2B), retail bio.' },
      { h: 'Matières et formats', p: 'Inox 304 ou 316L double paroi (isolation chaud 12h / froid 24h), capacités 350 / 500 / 750 / 1000 ml. Tritan™ Eastman (sans BPA) : capacités 500 / 750 ml, lavable lave-vaisselle. Verre borosilicate avec gaine silicone. Bouchon : sport (à vis), bambou (premium), pailles intégrées.' },
      { h: 'MOQ et personnalisation', p: 'MOQ 50 pièces sans personnalisation chez la majorité des grossistes français. Avec gravure laser logo : MOQ 100 pièces, +1,50-2,50€ HT/pièce. Impression couleur sublimation : MOQ 200 pièces, +1,80-3€ HT. Délais 4-6 semaines pour personnalisation, 48-72h sans.' }
    ],
    faq: [
      { q: 'Gourde inox 304 ou 316L : quelle différence ?', a: 'Inox 304 : standard alimentaire, suffit pour eau et boissons neutres. Inox 316L : meilleure résistance corrosion (boissons acides type smoothie, jus citron), surcoût 15-25%. La majorité du marché B2B est en 304 — préférez 316L pour le segment sport intensif.' },
      { q: 'BPA, BPS : quelle norme exiger ?', a: 'Norme EU 10/2011 (matériaux contact alimentaire) obligatoire. Sans BPA, BPS, BPF (les 3 principaux phtalates remplaçants). Le grossiste sérieux fournit l\'attestation alimentaire et le rapport de migration.' },
      { q: 'MOQ pour personnalisation logo entreprise ?', a: '100 pièces minimum pour gravure laser monochrome (logo cuit dans l\'inox, indélébile). 200 pièces pour impression sublimation couleur (qualité photo, durabilité 200+ lavages). Maquette 3D fournie sous 5 jours ouvrés.' },
      { q: 'Délai conservation chaud / froid réel ?', a: 'Inox double paroi 500 ml : 8-10h chaud >50°C, 18-24h froid <10°C en utilisation réelle (vs 12h/24h annoncés). Test SGS Hong Kong fait foi — exigez le rapport pour la fiche produit boutique.' }
    ],
    related: ['grossistes-mug', 'grossistes-distributeur-automatique', 'grossistes-carton']
  },

  { slug: 'grossistes-cutter', emd: 'grossiste-cutter.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en cutters',
    productSingular: 'cutter', productPlural: 'cutters', productShort: 'cutters',
    metaTitle: 'Grossistes cutters B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en cutters. Lames sécables, professionnels, sécurité, MOQ accessibles, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de cutters professionnels, cutters de sécurité, lames sécables 9 et 18 mm. Pour magasins de bricolage, fournitures industrielles, logistique, déménageurs, ateliers.',
    sections: [
      { h: 'Marché B2B du cutter en France', p: 'Le marché B2B cutter pèse 75 M€ en France, segmenté en 3 catégories : standard sécable (9 mm résidentiel, 18 mm pro), cutter de sécurité (lame rétractable auto pour entrepôts), cutter à lame fixe (charpente, bâtiment). Marques de référence : Olfa (Japon, premium), Stanley (USA), Tajima (volume), Martor (sécurité).' },
      { h: 'Familles et standards', p: 'Lames 9 mm (papier, carton léger, fournitures bureau), 18 mm (carton fort, déballage logistique), lames trapézoïdales (moquette, plâtre). Cutter de sécurité : lame rétractable au relâchement de la pression (norme ISO 23537), réduction de 90% des accidents en entrepôt. Lames de remplacement : sachets 10 unités, MOQ 50 sachets.' },
      { h: 'MOQ et marges revente', p: 'MOQ 12 unités par référence chez les grossistes français, 24 chez les importateurs. Marge revente standard : coefficient 2,2 sur cutter générique (panier 4-12€ TTC client final), coefficient 1,8 sur cutter pro Olfa/Stanley (concurrence prix internet forte). Lames : marge plus forte (coef 2,5-3) car panier addon spontané.' }
    ],
    faq: [
      { q: 'Cutter de sécurité : obligatoire en entreprise ?', a: 'Pas légalement obligatoire mais fortement recommandé par l\'INRS pour les entrepôts logistiques (réduction 90% accidents main). Les sociétés certifiées ISO 45001 imposent souvent la lame rétractable. Marché en croissance +12%/an depuis 2020.' },
      { q: 'Olfa, Stanley, Tajima : que stocker en boutique ?', a: 'Olfa : panel essentiel pro et amateur exigeant (image qualité Japon). Stanley : grande surface bricolage et clientèle bricoleur. Tajima : segment carrelage et bâtiment. Stock-type 60% Olfa / 30% Stanley / 10% Tajima en magasin de bricolage indépendant.' },
      { q: 'Lames : remplacer à quelle fréquence ?', a: 'Une lame 18 mm sécable industrielle = 200-300 ouvertures de cartons standard. À usage intensif : remplacer toutes les 2 semaines. Les pros achètent en sachets de 10 ou 50, dispenseur magnétique conseillé.' },
      { q: 'Personnalisation logo cutter pour goodie ?', a: 'Marquage tampographie une couleur : MOQ 250 pièces, +0,80-1,20€ HT. Boîtier cutter ABS uni : meilleur support pour logo. Le segment goodies représente 8% du marché B2B cutter (essentiellement secteur logistique et BTP).' }
    ],
    related: ['grossistes-carton', 'grossistes-distributeur-automatique', 'grossistes-mug']
  },

  { slug: 'grossistes-coussin', emd: 'grossiste-coussins.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en coussins',
    productSingular: 'coussin', productPlural: 'coussins', productShort: 'coussins',
    metaTitle: 'Grossistes coussins B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en coussins déco. Velours, lin, bouclette, formats variés, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de coussins décoratifs pour boutiques de déco, magasins de meuble, hôtels, AirBnB, architectes d\'intérieur. Velours, lin lavé, bouclette, jacquard, motifs ethniques.',
    sections: [
      { h: 'Marché B2B du coussin déco en France', p: 'Le coussin décoratif est un best-seller de la déco intérieure, avec 380 M€ B2B annuels en France. Panier moyen revente : 18-45€ TTC en boutique. Origines : fabrication Portugal et Turquie pour le mid/premium, import Inde et Chine pour l\'entry-level. Le segment hôtellerie représente 25% du marché.' },
      { h: 'Formats et matières', p: 'Formats standard : 30×50 cm (lombaire), 40×40 cm, 45×45 cm, 50×50 cm, 60×60 cm (plus rare). Garnissages : plumes (premium, très volumineux), polyester silicone (best-seller), mousse mémoire (technique). Matières housse : velours côtelé, lin lavé, bouclette laine, jacquard ethnique, coton imprimé numérique.' },
      { h: 'MOQ et best-sellers', p: 'MOQ 12 pièces par référence chez les fabricants portugais. Housses seules (garnissage en option) : MOQ 24 pièces. Pour boutique déco indépendante : un panel de 30-50 références couvre 80% des paniers. Réassorts en continu sur les coloris best-sellers (terracotta, vert sauge, bleu nuit).' }
    ],
    faq: [
      { q: 'Garnissage plumes ou polyester pour la revente ?', a: 'Plumes : aspect premium, écrase joliment, prix grossiste +60-80% vs polyester. Polyester silicone : tient sa forme, lavable machine, marché de masse. Stockez 70% polyester / 30% plumes pour couvrir entry et premium en boutique déco.' },
      { q: 'Saisonnalité du coussin déco ?', a: 'Pics ventes : avril-juin (refresh printemps) et septembre-novembre (cocooning automnal). Tons chauds (terracotta, ocre, bordeaux) : automne-hiver. Tons frais (lin naturel, vert sauge, bleu pâle) : printemps-été. 2-3 collections par an chez les revendeurs sérieux.' },
      { q: 'Housse de coussin sans garnissage : intérêt ?', a: 'Marché en croissance +15%/an : le client final possède déjà ses garnissages, change l\'habillage selon saison. Housse seule = panier client 12-25€ TTC vs 25-45€ ensemble complet. Stockage et logistique allégés.' },
      { q: 'Norme feu pour hôtellerie / ERP ?', a: 'Norme NF P 92-503 (M1 non-inflammable) obligatoire en ERP (hôtels, restaurants). Le grossiste fournit le procès-verbal d\'essai au feu — exigez-le pour les ventes au secteur hôtelier. Surcoût ignifugation : +15-20% prix.' }
    ],
    related: ['grossistes-canape-bubble', 'grossistes-deco', 'grossistes-deco-bali']
  },

  { slug: 'grossistes-lunettes-eclipse', emd: 'lunettes-eclipse.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en lunettes d\'éclipse',
    productSingular: 'lunettes d\'éclipse', productPlural: 'lunettes d\'éclipse', productShort: 'lunettes éclipse',
    metaTitle: 'Grossistes lunettes d\'éclipse B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes en lunettes d\'éclipse certifiées ISO 12312-2. Filtre solaire, MOQ accessibles, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de lunettes d\'observation solaire et d\'éclipse certifiées ISO 12312-2. Pour boutiques d\'astronomie, opticiens, sciences-loisirs, événementiel scientifique. Personnalisation logo possible.',
    sections: [
      { h: 'Marché B2B des lunettes d\'éclipse', p: 'Marché ultra-saisonnier piloté par les éclipses solaires visibles depuis l\'Europe (prochaine totale Espagne 12 août 2026). Volume B2B 6-8 M€ annuels en année normale, ×10 ou ×20 sur les 6 mois précédant une éclipse majeure. Trois fabricants certifiés dominent l\'EU : Baader Planetarium (Allemagne), American Paper Optics (USA distribué EU), Solar Eclipse Glasses Europe.' },
      { h: 'Norme et certification', p: 'Norme ISO 12312-2:2015 obligatoire (filtre densité 5+, transmission ≤ 0,003% du visible, 0% UV/IR). Marquage CE catégorie 4 (protection solaire extrême). Tout produit non certifié est INTERDIT à la commercialisation et engage la responsabilité civile et pénale du revendeur en cas d\'accident oculaire.' },
      { h: 'MOQ, stockage, péremption', p: 'MOQ 100 pièces chez la majorité des grossistes certifiés (livraison ~5-10 jours). Personnalisation logo : MOQ 500-1000 pièces, +0,40-0,80€ HT. Durée de vie : 3 ans à compter de la fabrication SI conditionnement intact (pas de rayure, pas d\'humidité). Stockage à plat à l\'abri de la lumière directe.' }
    ],
    faq: [
      { q: 'Comment vérifier qu\'une lunette d\'éclipse est conforme ?', a: 'Marquage ISO 12312-2 + CE catégorie 4 lisible sur la lunette ET sur l\'emballage. Numéro d\'organisme notifié EU obligatoire (4 chiffres). Le fabricant fournit le rapport de test laboratoire indépendant — exigez-le avant achat. Méfiance sur les marketplaces : 30% des produits Amazon testés en 2024 étaient non conformes.' },
      { q: 'Quelle marge revente avant une éclipse majeure ?', a: 'Coefficient 4 à 6 dans les 3 mois précédant une éclipse totale visible (rareté, urgence). Coefficient 2,5-3 en année normale. Achetez votre stock 6 mois minimum avant l\'éclipse — au-delà des 60 jours qui précèdent, ruptures massives garanties.' },
      { q: 'Personnalisation logo : MOQ et délais ?', a: 'MOQ 500 pièces minimum (impression offset 4 couleurs sur monture carton). Délais 6-8 semaines depuis fabricant EU, 10-12 semaines depuis USA. Pour les éclipses majeures : passer commande 9-12 mois à l\'avance pour éviter saturation usine.' },
      { q: 'Lunettes d\'éclipse et observation Vénus / Mercure ?', a: 'Lunettes ISO 12312-2 utilisables uniquement pour le Soleil (transit Vénus / Mercure devant le Soleil OK). Pas adaptées à l\'observation lunaire ou planétaire (filtre trop dense). Le revendeur doit communiquer cette restriction au client final.' }
    ],
    related: ['grossistes-eventail', 'grossistes-eclairage-led', 'grossistes-distributeur-automatique']
  },

  { slug: 'grossistes-valise', emd: 'grossiste-valise.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en valises',
    productSingular: 'valise', productPlural: 'valises', productShort: 'valises',
    metaTitle: 'Grossistes valises B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en valises rigides et souples. ABS, polycarbonate, cabine, soute, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de valises rigides et souples pour boutiques de maroquinerie, bagagerie, voyage, magasins discount. ABS, polycarbonate, polyester. Tailles cabine, soute, set 3 pièces.',
    sections: [
      { h: 'Marché B2B de la valise en France', p: 'Le marché B2B de la valise pèse 320 M€ en France, en croissance post-COVID (+9%/an depuis 2022). Trois segments : entry-level ABS (Chine, prix 18-35€ HT), mid-range polycarbonate (Pologne, Turquie, 45-90€ HT), premium (Samsonite, Delsey, Tumi). La distribution se partage 60% retail spécialisé, 25% e-commerce, 15% grandes surfaces.' },
      { h: 'Matières et tailles', p: 'ABS : entry-level, légèreté correcte, résistance moyenne (2-3 ans usage régulier). Polycarbonate : durabilité, légèreté, résistance impact (5-7 ans). Polyester souple : compartiments multiples, absorbe les chocs, idéal voyage train/voiture. Tailles : cabine 55 cm (max 100% des compagnies), médium 65 cm, grande 75 cm, set 3 pièces.' },
      { h: 'MOQ, garantie, casse retour', p: 'MOQ 12 pièces par référence chez les grossistes import, 24 chez les fabricants Pologne/Turquie. Garantie standard : 2 ans (ABS), 5 ans (polycarbonate marques connues). Taux casse retour : 3-5% en revente classique (charnières, roues principalement). Stockez les pièces détachées (roues, poignées) sur les références phares.' }
    ],
    faq: [
      { q: 'Valise cabine : dimensions universelles ?', a: '55×40×20 cm (Air France, KLM, Lufthansa, IAG). 55×40×23 cm (Easyjet, Ryanair en Priority). Stockez prioritairement le 55×40×20 — il passe partout. Au-delà du cabine 56 cm, comptez sur des frais d\'enregistrement client final.' },
      { q: 'ABS ou polycarbonate pour la revente ?', a: 'ABS : panier client 35-65€ TTC, marge 2,5, public familles voyage occasionnel. Polycarbonate : panier 80-180€, marge 2,2, public voyageur fréquent. Stockez 60% ABS / 40% polycarbonate pour couvrir les deux segments.' },
      { q: 'Délai livraison fournisseur grossiste ?', a: '48-72h depuis stocks France/EU, 8-12 semaines pour import direct conteneur. Pour les pics saisonniers (mai-juillet vacances été) : passer commande mars-avril, ruptures fréquentes en juin sur les couleurs trendy.' },
      { q: 'TSA cadenas : intégré ou séparé ?', a: 'TSA intégré (norme USA, douane peut ouvrir sans casser) : standard sur 80% des valises 2025. Surcoût marginal (+1-2€ HT). Évitez les valises sans TSA pour la clientèle US/Canada — risque casse en cas de contrôle douanier.' }
    ],
    related: ['grossistes-carton', 'grossistes-cutter', 'grossistes-parapluie']
  },

  { slug: 'grossistes-panneau-solaire', emd: 'grossiste-panneau-solaire.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en panneaux solaires',
    productSingular: 'panneau solaire', productPlural: 'panneaux solaires', productShort: 'panneaux solaires',
    metaTitle: 'Grossistes panneaux solaires B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en panneaux photovoltaïques. Monocristallin, kit autoconsommation, MOQ palette, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B de panneaux photovoltaïques pour installateurs RGE, magasins de bricolage, e-commerce solaire. Modules monocristallins 400-550 W, micro-onduleurs, kits autoconsommation prêts à brancher.',
    sections: [
      { h: 'Marché B2B du panneau solaire en France', p: 'Le marché B2B photovoltaïque pèse 4,2 Md€ en France (2025), boosté par MaPrimeRénov\' et la prime à l\'autoconsommation. Trois segments : kits prêts-à-brancher 800W (boom 2023-2025, marché grand public), installation RGE résidentielle 3-9 kWc, installation tertiaire 10-100 kWc. Les modules sont à 95% chinois (LONGi, JA Solar, Trina), 5% européens (Meyer Burger).' },
      { h: 'Technologies et certifications', p: 'Monocristallin TOPCon (rendement 21-22%, prix de référence), HJT (hétérojunction, rendement 22-24%, premium). Norme IEC 61215, IEC 61730 obligatoires. Garantie produit : 12-15 ans, garantie performance : 25-30 ans (≥80% du Wc d\'origine à 25 ans). Onduleurs : centraux, micro-onduleurs (Enphase, APsystems), optimiseurs (SolarEdge).' },
      { h: 'MOQ et logistique', p: 'MOQ 1 palette (30-36 modules selon dimensions) chez la majorité des grossistes français. Pour ouvrir compte revendeur : 5000-15000€ HT première commande, Kbis + qualification RGE de préférence. Livraison palette transporteur spécialisé (poids 25 kg/module). Délais 48-72h en stock, 4-8 semaines depuis Chine sur référence non stockée.' }
    ],
    faq: [
      { q: 'Kit 800W prêt à brancher : faut-il être RGE pour le revendre ?', a: 'Non — la qualification RGE est requise pour bénéficier des aides (MaPrimeRénov\', TVA 5,5%). Sans RGE, vous pouvez vendre le matériel mais le client final n\'aura pas droit aux aides. Le kit 800W "plug-and-play" est en croissance +85%/an depuis 2023, panier client 800-1500€ TTC.' },
      { q: 'Garantie produit vs garantie performance ?', a: 'Garantie produit : remplacement gratuit en cas de défaut (12-15 ans selon fabricant). Garantie performance : engagement de production (≥80% du Wc à 25 ans). Vérifiez bien les deux dans la fiche technique — un panneau Tier-1 sérieux porte ces deux garanties.' },
      { q: 'TOPCon vs HJT : que conseiller ?', a: 'TOPCon : rendement 21-22%, rapport qualité/prix optimal en 2026, 80% du marché. HJT : 22-24%, premium pour toitures contraintes en surface, surcoût +15-20%. Pour la majorité des installations résidentielles 6-9 kWc : TOPCon LONGi ou JA Solar.' },
      { q: 'Quel onduleur pour quelle taille d\'installation ?', a: 'Onduleur central monophasé : 3-6 kWc résidentiel simple toit. Micro-onduleurs Enphase : multi-orientations, ombrage partiel, surcoût +25%. Onduleur triphasé : >9 kWc et tertiaire. SolarEdge avec optimiseurs : compromis ombrage / coût onduleur central.' }
    ],
    related: ['grossistes-eclairage-led', 'grossistes-distributeur-automatique', 'grossistes-eventail']
  },

  { slug: 'grossistes-eventail', emd: 'grossiste-eventail.fr', status: 'NEW',
    h1: 'Annuaire des grossistes en éventails',
    productSingular: 'éventail', productPlural: 'éventails', productShort: 'éventails',
    metaTitle: 'Grossistes éventails B2B — Annuaire vérifié',
    metaDesc: 'Annuaire B2B des grossistes français en éventails. Bois, bambou, tissu, mariage, événementiel, fournisseurs vérifiés SIRET.',
    intro: 'Fournisseurs B2B d\'éventails pour boutiques mariage, événementiel, festivals, goodies entreprise. Bois sculpté, bambou, tissu imprimé, dentelle. Personnalisation impression couleur disponible.',
    sections: [
      { h: 'Marché B2B de l\'éventail en France', p: 'Le marché B2B éventail pèse 18 M€ annuels en France, segmenté en 3 axes : mariage (40%, panier élevé, MOQ 50-100), événementiel/festival (35%, MOQ 500-1000), goodies entreprise (25%, marquage logo). Origines : Espagne (premium artisanal Valence), Chine (volume), Inde (segment ethnique). Saisonnalité forte : pic mai-août.' },
      { h: 'Matières et formats', p: 'Bois (cèdre, hêtre, sandalwood) ajouré ou sculpté : segment premium / déco. Bambou + tissu (papier ou polyester imprimé) : best-seller mariage et plage. Dentelle espagnole : premium mariage. Carton imprimé : événementiel low-cost. Tailles : 21 cm (poche), 23 cm (standard), 30 cm (grand format spectacle).' },
      { h: 'MOQ et personnalisation', p: 'MOQ standard 100 pièces chez les grossistes import, 50 pièces chez les fabricants espagnols (premium). Impression personnalisée 1 couleur : MOQ 250 pièces, +0,80€ HT/pièce. Impression sublimation 4 couleurs photo : MOQ 500 pièces, +1,20-1,80€ HT. Délais 4-6 semaines depuis Chine, 2-3 semaines depuis Espagne.' }
    ],
    faq: [
      { q: 'Éventail mariage : MOQ et délai pour des invités personnalisés ?', a: 'MOQ 100 pièces avec impression photo couple en sublimation 4 couleurs : 4-5 semaines depuis fabricant espagnol, 7-8 semaines depuis Chine. Comptez 1,80-3€ HT par pièce avec personnalisation, soit 4-7€ TTC revente unitaire au couple.' },
      { q: 'Bois ou bambou pour la durabilité ?', a: 'Bois (cèdre, hêtre) : durée 10+ ans en bon usage. Bambou : 3-5 ans, plus fragile mais 60% moins cher. Pour mariage / déco : bois. Pour festival / goodie : bambou. Le marché grand public bascule vers le bois recyclé certifié FSC depuis 2022.' },
      { q: 'Éventail publicitaire : impression sur quoi ?', a: 'Sur le tissu (sublimation 4 couleurs photo réaliste) ou directement sur les lattes bois (gravure laser ou impression UV). Le tissu offre une plus grande surface d\'impression et une lecture immédiate. La gravure bois est plus discrète, plus haut de gamme.' },
      { q: 'Saisonnalité commande éventail B2B ?', a: 'Mariage : commande 4-6 mois avant la saison (commander en novembre-février pour mai-août). Festival/événementiel : 3-4 mois avant. Goodies entreprise : pic mai-juin pour Noël corporate (commander en juillet pour livraison octobre).' }
    ],
    related: ['grossistes-parapluie', 'grossistes-lunettes-eclipse', 'grossistes-decoration-noel']
  },

  // EXISTS — patcher pour ajouter encart EMD
  { slug: 'grossistes-laine', emd: 'grossiste-laine.fr', status: 'EXISTS',
    productPlural: 'laine', productShort: 'laine' },
  { slug: 'grossistes-bougie', emd: 'grossiste-bougie.fr', status: 'EXISTS',
    productPlural: 'bougies', productShort: 'bougies' },
  { slug: 'grossistes-carton', emd: 'grossiste-carton.fr', status: 'EXISTS',
    productPlural: 'cartons', productShort: 'cartons' },
  { slug: 'grossistes-mug', emd: 'grossiste-mug.fr', status: 'EXISTS',
    productPlural: 'mugs', productShort: 'mugs' },
  { slug: 'grossistes-parapluie', emd: 'grossiste-parapluie.fr', status: 'EXISTS',
    productPlural: 'parapluies', productShort: 'parapluies' },
  { slug: 'grossistes-casquette', emd: 'grossiste-casquette.fr', status: 'EXISTS',
    productPlural: 'casquettes', productShort: 'casquettes' },
  { slug: 'grossistes-brule-parfum', emd: 'grossiste-brule-parfum.fr', status: 'EXISTS',
    productPlural: 'brûle-parfums', productShort: 'brûle-parfum' },
];

// ─── EMD descriptions ──────────────────────────────────────────
const EMD_DATA = {
  'grossiste-decorations-noel.fr': {
    desc: 'Distributeur français spécialisé en décorations de Noël B2B. Boules verre, guirlandes LED, sapins artificiels. Stock saisonnier permanent, livraison 48-72h.',
    points: ['Stock 800+ références', 'Livraison 48h métropole', 'MOQ accessibles']
  },
  'grossiste-diamond-painting.fr': {
    desc: 'Grossiste français de kits diamond painting. Toiles AB, perles 5D, formats 30×40 à 60×80. MOQ 30 pièces, mix de motifs au choix.',
    points: ['Catalogue 600+ motifs', 'MOQ 30 pièces', 'Livraison France 72h']
  },
  'grossiste-laine.fr': {
    desc: 'Grossiste français de laine et fils à tricoter pour merceries et créateurs. Mérinos extrafine, alpaga, coton mercerisé. Catalogue filateurs européens.',
    points: ['Filateurs FR + EU', 'MOQ pelote 12 unités', 'Devis 24h']
  },
  'canapes-bubble.com': {
    desc: 'Fabricant français de canapés bubble (effet boules) en tissu bouclette. Modulaire 2 à 5 places, livraison France métro avec créneau étage.',
    points: ['Fabrication France', 'Garantie mousse 5 ans', 'Livraison étage']
  },
  'sol-led.fr': {
    desc: 'Grossiste éclairage LED B2B : spots GU10, dalles 600×600, rubans, panneaux solaires intégrés. Stock permanent, livraison 48-72h.',
    points: ['IRC ≥ 80 garanti', 'Garantie 5 ans tertiaire', 'Marquage CE / RoHS']
  },
  'grossiste-distributeur-automatique.fr': {
    desc: 'Grossiste français de distributeurs automatiques snack, boissons, café grain. Neuf et reconditionné garanti, SAV France métropole.',
    points: ['Neuf + reconditionné', 'SAV national 100 km', 'Leasing 36-60 mois']
  },
  'grossiste-echarpes.fr': {
    desc: 'Grossiste français d\'écharpes femme et homme. Mérinos extrafine, cachemire, soie imprimée. MOQ 12 pièces par référence.',
    points: ['Cachemire authentique', 'MOQ 12 pièces', 'Livraison 72h']
  },
  'grossiste-bonnets.fr': {
    desc: 'Grossiste français de bonnets pour boutiques et corporate. Mérinos, acrylique, polaire, broderie / patch logo possible.',
    points: ['Personnalisation logo', 'MOQ 12 sans broderie', 'Norme EN 14682']
  },
  'grossiste-bougie.fr': {
    desc: 'Grossiste français de bougies parfumées et votives. Cire de soja, paraffine, conformité EN 15426 et IFRA. MOQ carton accessibles.',
    points: ['Cire soja + paraffine', 'Conformité IFRA', 'MOQ carton 60 pièces']
  },
  'grossiste-deco-bali.fr': {
    desc: 'Importateur français spécialisé déco style Bali / bohème. Bois flotté, rotin, macramé, lampes bambou. SVLK certifié.',
    points: ['SVLK certifié', 'MOQ 1 unité', 'Stock France 800+ pièces']
  },
  'grossiste-pyjamas.fr': {
    desc: 'Grossiste français de pyjamas femme, homme, enfant. Coton bio GOTS, satin, polaire. Norme EN 14878 inflammabilité enfant.',
    points: ['Coton bio GOTS', 'Norme EN 14878', 'MOQ 12 pièces']
  },
  'grossiste-robes.fr': {
    desc: 'Grossiste français de robes femme. Été, soirée, cocktail, grandes tailles. Fabrication portugaise, MOQ 6 pièces taille assortie.',
    points: ['Fabrication Portugal', 'MOQ 6 pièces', 'Tailles 36-50']
  },
  'grossiste-nappe.fr': {
    desc: 'Grossiste français de nappes pour restauration et particuliers. Polyester anti-tache, lin lavé, formats jusqu\'à 340 cm.',
    points: ['Polyester pro 200g/m²', 'Lin lavé premium', 'Lavage 90°C']
  },
  'grossiste-gourde.fr': {
    desc: 'Grossiste français de gourdes inox isothermes et tritan. Gravure laser logo dès 100 pièces. Norme alimentaire EU 10/2011.',
    points: ['Gravure laser logo', 'Sans BPA / BPS', 'Isolation 12h chaud']
  },
  'grossiste-carton.fr': {
    desc: 'Grossiste français d\'emballages cartons B2B. Caisses américaines, cartons à plat, bandes adhésives, calage. Livraison 48h.',
    points: ['Stock 600+ références', 'Livraison 48h', 'Devis 24h']
  },
  'grossiste-cutter.fr': {
    desc: 'Grossiste français de cutters pro Olfa, Stanley, Tajima et lames sécables. Cutter de sécurité ISO 23537 disponible.',
    points: ['Olfa / Stanley / Tajima', 'Cutter sécurité ISO', 'MOQ 12 unités']
  },
  'grossiste-mug.fr': {
    desc: 'Grossiste français de mugs céramique et porcelaine. Sublimation logo, gravure laser. MOQ 36 pièces sans personnalisation.',
    points: ['Sublimation logo', 'MOQ 36 pièces', 'Norme alimentaire']
  },
  'grossiste-parapluie.fr': {
    desc: 'Grossiste français de parapluies droits, pliants, golf. Fibre verre, automatique, marquage logo possible. MOQ 50 pièces.',
    points: ['Fibre verre anti-vent', 'Marquage logo', 'MOQ 50 pièces']
  },
  'grossiste-casquette.fr': {
    desc: 'Grossiste français de casquettes baseball, snapback, trucker. Coton, polyester, broderie 3D / patch cuir. MOQ 50 pièces.',
    points: ['Broderie 3D / patch', 'MOQ 50 pièces', 'Délai 3-4 semaines']
  },
  'grossiste-coussins.fr': {
    desc: 'Grossiste français de coussins déco. Velours, lin lavé, bouclette, jacquard. Garnissage plumes ou polyester. Norme M1 ERP.',
    points: ['Norme M1 ERP', 'Plumes ou polyester', 'MOQ 12 pièces']
  },
  'grossiste-brule-parfum.fr': {
    desc: 'Grossiste français de brûle-parfum céramique, métal, verre. Compatible huiles essentielles et cire fondante. MOQ 24 unités.',
    points: ['Céramique / métal / verre', 'MOQ 24 pièces', 'Norme alimentaire']
  },
  'lunettes-eclipse.fr': {
    desc: 'Grossiste français de lunettes d\'observation solaire ISO 12312-2. CE catégorie 4. Personnalisation logo dès 500 pièces.',
    points: ['ISO 12312-2 certifié', 'CE catégorie 4', 'MOQ 100 pièces']
  },
  'grossiste-valise.fr': {
    desc: 'Grossiste français de valises rigides et souples. ABS, polycarbonate, cabine 55×40×20, soute. TSA intégré.',
    points: ['Cabine universelle 55cm', 'TSA intégré', 'MOQ 12 pièces']
  },
  'grossiste-panneau-solaire.fr': {
    desc: 'Grossiste français de panneaux photovoltaïques TOPCon 400-550W. LONGi, JA Solar, Trina. Garantie 25 ans performance.',
    points: ['TOPCon Tier-1', 'Garantie 25 ans', 'IEC 61215 / 61730']
  },
  'grossiste-eventail.fr': {
    desc: 'Grossiste français d\'éventails mariage et événementiel. Bois, bambou, dentelle. Impression sublimation 4 couleurs personnalisée.',
    points: ['Mariage + événementiel', 'Sublimation logo', 'MOQ 100 pièces']
  }
};

// ─── Composants HTML ──────────────────────────────────────────
function emdCardHTML(emd, productPlural) {
  const data = EMD_DATA[emd];
  if (!data) throw new Error('EMD data missing for ' + emd);
  return `<aside class="emd-card" aria-labelledby="emd-${emd.replace(/[^a-z0-9]/gi,'-')}-title">
  <div class="emd-badge">Recommandé 2026</div>
  <div class="emd-body">
    <h3 class="emd-title" id="emd-${emd.replace(/[^a-z0-9]/gi,'-')}-title">Le meilleur fournisseur de <span>${productPlural}</span> fiable en 2026</h3>
    <p class="emd-desc">${data.desc}</p>
    <ul class="emd-points">${data.points.map(p => `<li>✓ ${p}</li>`).join('')}</ul>
    <a class="emd-cta" href="https://www.${emd}/" target="_blank" rel="noopener">Voir le fournisseur sur ${emd} →</a>
  </div>
</aside>`;
}

const EMD_CSS = `
.emd-card{position:relative;background:linear-gradient(135deg,#fff 0%,var(--primary-soft) 100%);border:1px solid var(--primary);border-radius:var(--r-xl);padding:var(--s-8);margin:var(--s-12) 0;box-shadow:0 8px 24px rgba(15,58,107,.12)}
.emd-badge{position:absolute;top:-12px;left:var(--s-6);background:var(--accent);color:#fff;font-size:var(--fs-xs);font-weight:700;text-transform:uppercase;letter-spacing:.08em;padding:6px 14px;border-radius:var(--r-pill)}
.emd-title{font-size:var(--fs-h3);color:var(--primary);margin-bottom:var(--s-3);line-height:1.25}
.emd-title span{color:var(--accent)}
.emd-desc{color:var(--text-2);margin-bottom:var(--s-4);font-size:var(--fs-md);line-height:1.55}
.emd-points{list-style:none;padding:0;margin:0 0 var(--s-5);display:flex;flex-wrap:wrap;gap:var(--s-3)}
.emd-points li{font-size:var(--fs-sm);color:var(--text-2);background:rgba(255,255,255,.7);padding:6px 12px;border-radius:var(--r-md);border:1px solid var(--border)}
.emd-cta{display:inline-block;background:var(--primary);color:#fff;padding:12px 24px;border-radius:var(--r-md);text-decoration:none;font-weight:600;transition:background .2s}
.emd-cta:hover{background:var(--primary-hover);color:#fff}
@media (max-width:600px){.emd-card{padding:var(--s-6)}.emd-points{gap:var(--s-2)}}`;

// Fragment header / footer commun (extrait du modèle existant)
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

// CSS inline (extrait minimum du site.css pour load-first)
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
@media (max-width:500px){.ftr-cols{grid-template-columns:1fr}}
${EMD_CSS}`;

// Mapping pour libellés "Catégories proches"
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
  'grossistes-valise':'Valises','grossistes-panneau-solaire':'Panneaux solaires','grossistes-eventail':'Éventails'
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
      { "@type": "FAQPage", "mainEntity": page.faq.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) },
      { "@type": "Service", "name": page.h1, "provider": { "@type": "Organization", "name": page.emd, "url": `https://www.${page.emd}/` }, "areaServed": "FR" }
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

${emdCardHTML(page.emd, page.productPlural)}

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

// ─── Patcher d'une page existante ──────────────────────────────
function patchExisting(page) {
  const filePath = path.join(ROOT, page.slug, 'index.html');
  let html = fs.readFileSync(filePath, 'utf8');
  if (html.includes('class="emd-card"')) {
    console.log(`  [SKIP] ${page.slug} — encart EMD déjà présent`);
    return false;
  }
  // Injecter le CSS dans le <style> (ajout en fin de bloc)
  if (!html.includes('.emd-card{')) {
    html = html.replace('</style>', EMD_CSS + '</style>');
  }
  // Injecter l'encart EMD juste avant la section contact
  // Recherche exacte du séparateur avant la section contact
  const marker = '<section class="section" id="contact">';
  if (!html.includes(marker)) throw new Error('marker not found in ' + filePath);
  const card = '\n' + emdCardHTML(page.emd, page.productPlural) + '\n</div>\n</section>\n\n';
  // Remplacer le </div></section> qui précède la contact section : ferme la section catégorie
  // Pattern attendu : `</div>\n</section>\n\n<section class="section" id="contact">`
  const oldClose = '</div>\n</section>\n\n<section class="section" id="contact">';
  if (html.includes(oldClose)) {
    const newClose = card + '<section class="section" id="contact">';
    html = html.replace(oldClose, newClose);
  } else {
    // fallback : utiliser regex avec espaces variables
    const re = /<\/div>\s*<\/section>\s*<section class="section" id="contact">/;
    if (re.test(html)) {
      html = html.replace(re, card + '<section class="section" id="contact">');
    } else {
      throw new Error('Cannot find injection point in ' + filePath);
    }
  }
  fs.writeFileSync(filePath, html, 'utf8');
  return true;
}

// ─── Main ──────────────────────────────────────────────────────
let createdNew = 0, patchedExist = 0, skipped = 0;
for (const p of PAGES) {
  const dir = path.join(ROOT, p.slug);
  if (p.status === 'NEW') {
    if (fs.existsSync(dir)) {
      console.log(`  [SKIP-NEW] ${p.slug} — dossier déjà existant (création annulée)`);
      skipped++;
      continue;
    }
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), buildNewPage(p), 'utf8');
    console.log(`  [NEW]  ${p.slug}`);
    createdNew++;
  } else if (p.status === 'EXISTS') {
    if (!fs.existsSync(path.join(dir, 'index.html'))) {
      console.log(`  [WARN] ${p.slug} — déclaré EXISTS mais introuvable !`);
      continue;
    }
    if (patchExisting(p)) {
      console.log(`  [PATCH] ${p.slug}`);
      patchedExist++;
    }
  }
}

console.log(`\nDone. NEW: ${createdNew} / PATCH: ${patchedExist} / SKIPPED: ${skipped}`);

# La Coquette, CLAUDE.md projet

Site **vitrine** (une page + galerie) pour Caroline « Caro » Deshayes, créatrice de bijoux fait main dans la Drôme. Next.js 16 (App Router), Tailwind, Sanity pour l'édition. **Aucune vente en ligne** : la vente se fait sur Instagram et les marchés.

Production : `lacoquette-bycaro.fr` (branche `main`, déploiement auto sur push). Studio d'édition : `/studio`.

## Charte typographique VALIDÉE (15/07/2026)

| Rôle | Police | Source |
|---|---|---|
| Titres (`--font-display`) | **Cabinet Grotesk** (400/500/700/800) | Fontshare, **auto-hébergée** dans `public/fonts` |
| Texte (`--font-body`) | **Schibsted Grotesk** | `next/font/google` (self-host au build, aucune requête navigateur vers Google) |

**Décision de Célestin : 100 % sans-serif.** Le serif éditorial (Instrument Serif) a été essayé puis écarté. Ne pas réintroduire de serif sans décision explicite.

**Interdites ici comme partout** (liste noire) : Inter, Jost, Poppins, Montserrat, Playfair Display, Cormorant, Lora, Roboto, Lato, Raleway, DM Sans, Manrope, Satoshi, Syne… Contrôle avant toute livraison :
```bash
grep -rniE "\b(Inter|Jost|Poppins|Montserrat|Playfair|Cormorant|Lora|Roboto)\b" src/app/layout.tsx src/app/globals.css
```

## Palette (inchangée, « luxe minimaliste monochrome »)

noir `#111111` · ivoire `#F4EEE5` · crème `#FBF8F3` · beige `#F0EBE2` · grège `#ECE7E1` · gris (filets) `#DCD7D1` · taupe `#6E655B` · stone `#9A9189`.
**Interdits : or, jaune, rose, couleur d'accent vive.**

## Règles de mise en page (refonte du 15/07/2026)

Le site avait été refait car il « ne faisait pas professionnel ». Causes identifiées et corrigées, **à ne pas réintroduire** :

- ❌ **Hero centré** (logo + phrase + deux boutons symétriques) → ✅ composition **asymétrique 5/7**, texte calé en bas, photo à fond perdu.
- ❌ **Dégradés** (voiles, légendes) → ✅ **zéro dégradé**, le texte est placé à côté de la photo, pas dessus.
- ❌ **Grilles de cartes identiques** → ✅ grilles décalées (colonne du milieu abaissée), première photo de chaque collection en double largeur.
- ❌ **Eyebrow en capitales espacées au-dessus de chaque section** → ✅ supprimés partout, les titres portent seuls.
- ❌ **Tout centré et arrondi uniformément** → ✅ alignement à gauche, angles nets, filets fins (`border-gris`).
- Header = bandeau éditorial (marque à gauche, nav à droite), pas de gros logo centré.

Contrôles greppables avant livraison : `bg-gradient` = 0, `italic|<em>|<i>` = 0, `—` = 0, `·` = 0, eyebrows = 0.

## Contenu éditable par Caro (Sanity)

3 schémas seulement : `vitrineContent` (textes), `collection` (nom/slug/ordre/description/photos), `siteSettings` (email/zone/Instagram/accroche footer). **Aucune notion de vente.** Le site lit le **publié uniquement** et **retombe automatiquement** sur le contenu figé de `src/components/vitrine/data.ts` si Sanity est indisponible : le build ne casse jamais.

Repeupler Sanity : `node scripts/seed-vitrine.mjs`. Régénérer les photos web : `node scripts/build-galerie.mjs`.

## Formulaire de contact

`/api/contact` → **Resend** (`RESEND_API_KEY` requise sur Vercel, **ne pas la supprimer**). Champ piège anti-robot, validation serveur, accusé de réception à l'écran. Expéditeur : `CONTACT_FROM` si le domaine est vérifié chez Resend, sinon `onboarding@resend.dev`.

## Rédaction

Vouvoiement systématique. Jamais d'italique, ni de tiret cadratin, ni de point médian décoratif. « fait main » invariable.

import type { StructureResolver } from 'sanity/structure';
import { HomeIcon, TagIcon, EnvelopeIcon, HelpCircleIcon, CogIcon } from '@sanity/icons';

// Organisation du Studio, dans l'ordre logique du site :
// Accueil → Boutique (produits) → Contact → FAQ, puis les réglages globaux.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title("Page d'accueil")
        .icon(HomeIcon)
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.documentTypeListItem('product').title('Produits').icon(TagIcon),
      S.listItem()
        .title('Page contact')
        .icon(EnvelopeIcon)
        .id('contactPage')
        .child(S.document().schemaType('contactPage').documentId('contactPage')),
      S.listItem()
        .title('FAQ')
        .icon(HelpCircleIcon)
        .id('faqPage')
        .child(S.document().schemaType('faqPage').documentId('faqPage')),
      S.divider(),
      S.listItem()
        .title('Réglages du site')
        .icon(CogIcon)
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ]);

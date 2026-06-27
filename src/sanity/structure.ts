import type { StructureResolver } from 'sanity/structure';

// Organisation du Studio : pages = documents uniques (singletons),
// produits = liste.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title("Page d'accueil")
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('FAQ')
        .id('faqPage')
        .child(S.document().schemaType('faqPage').documentId('faqPage')),
      S.listItem()
        .title('Page contact')
        .id('contactPage')
        .child(S.document().schemaType('contactPage').documentId('contactPage')),
      S.listItem()
        .title('Réglages du site')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('product').title('Produits'),
    ]);

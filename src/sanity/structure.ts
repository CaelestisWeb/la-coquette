import type { StructureResolver } from 'sanity/structure';

// Organisation du Studio : la page d'accueil est un document unique
// (singleton), les produits sont une liste.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title("Page d'accueil")
        .id('homePage')
        .child(
          S.document().schemaType('homePage').documentId('homePage'),
        ),
      S.divider(),
      S.documentTypeListItem('product').title('Produits'),
    ]);

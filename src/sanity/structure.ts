import type { StructureResolver } from 'sanity/structure';
import { DocumentIcon, FolderIcon, CogIcon } from '@sanity/icons';

// Organisation du Studio vitrine : le contenu de la page, les collections de
// photos, puis les réglages. Simple et sans notion de boutique.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('La Coquette')
    .items([
      S.listItem()
        .title('Contenu de la page')
        .icon(DocumentIcon)
        .id('vitrineContent')
        .child(S.document().schemaType('vitrineContent').documentId('vitrineContent')),
      S.documentTypeListItem('collection').title('Collections (photos)').icon(FolderIcon),
      S.divider(),
      S.listItem()
        .title('Réglages du site')
        .icon(CogIcon)
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
    ]);

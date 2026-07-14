// Configuration de connexion à Sanity.
// projectId et dataset ne sont PAS secrets (ils partent de toute façon dans le
// navigateur) : on les met en repli en dur pour que le Studio et le build
// fonctionnent partout, y compris en preview. Seuls les TOKENS restent en
// variables d'environnement.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'nuwh7dyu';

// Le CMS est-il configuré (projet renseigné) ?
export const sanityConfigured = projectId !== '';

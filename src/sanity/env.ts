// Configuration de connexion à Sanity.
// Les valeurs réelles viennent des variables d'environnement, renseignées
// une fois le projet Sanity créé. Valeurs de repli sûres pour ne pas casser
// le build avant la configuration.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

// Le CMS est-il configuré (projet renseigné) ?
export const sanityConfigured = projectId !== '';

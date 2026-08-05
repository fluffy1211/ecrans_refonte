/**
 * Canonical JSON-LD schema for Les écrans pas tout le temps
 * All pages reference this single entity by @id
 */

export const canonicalOrganizationId = 'https://www.lesecranspastoutletemps.fr/#organization';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'PerformingGroup',
  '@id': canonicalOrganizationId,
  name: 'Les écrans pas tout le temps',
  description: 'Compagnie de spectacle théâtral participatif sur la prévention numérique pour les enfants de 6 à 12 ans.',
  url: 'https://www.lesecranspastoutletemps.fr',
  image: 'https://www.lesecranspastoutletemps.fr/images/gallery-01.jpg',
  location: {
    '@type': 'Place',
    addressLocality: 'Marseille',
    addressCountry: 'FR',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Marseille',
    addressCountry: 'FR',
    addressRegion: 'PACA',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+33673158508',
    email: 'lesecranspastoutletemps@gmail.com',
    contactType: 'customer service',
  },
  member: [
    {
      '@type': 'Person',
      name: 'Béatrice Herrero',
      jobTitle: 'Autrice, direction artistique, comédienne',
      description:
        "Autrice et comédienne basée à Marseille, à l'origine du spectacle Les écrans pas tout le temps sur la sensibilisation aux écrans pour les enfants.",
    },
    {
      '@type': 'Person',
      name: 'Samy Adjouadi',
      jobTitle: 'Comédien',
    },
  ],
  areaServed: [
    {
      '@type': 'AdministrativeArea',
      name: 'Bouches-du-Rhône',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Var',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Vaucluse',
    },
    {
      '@type': 'AdministrativeArea',
      name: "Provence-Alpes-Côte d'Azur",
    },
  ],
  sameAs: [],
};

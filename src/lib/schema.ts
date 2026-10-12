/**
 * Canonical JSON-LD schema for Les écrans pas tout le temps
 * All pages reference this single entity by @id
 */

export const canonicalOrganizationId = 'https://www.lesecranspastoutletemps.fr/#organization';

type SpectacleMetadata = {
  name: string;
  description: string;
  path: string;
  minAge: number;
  maxAge: number;
  faq: { q: string; a: string }[];
};

export function spectacleMetadata({ name, description, path, minAge, maxAge, faq }: SpectacleMetadata) {
  const site = 'https://www.lesecranspastoutletemps.fr';
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: `Les écrans pas tout le temps - ${name}`,
      serviceType: 'Spectacle participatif de prévention numérique',
      description,
      image: `${site}/images/og-image.jpg`,
      provider: { '@id': canonicalOrganizationId },
      areaServed: { '@type': 'AdministrativeArea', name: "Provence-Alpes-Côte d'Azur" },
      audience: {
        '@type': 'Audience',
        audienceType: `Enfants de ${minAge} à ${maxAge} ans`,
        suggestedMinAge: minAge,
        suggestedMaxAge: maxAge,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]*>/g, '') },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${site}/` },
        { '@type': 'ListItem', position: 2, name, item: new URL(path, site).toString() },
      ],
    },
  ];
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'PerformingGroup',
  '@id': canonicalOrganizationId,
  name: 'Les écrans pas tout le temps',
  description: 'Compagnie de spectacle théâtral participatif sur la prévention numérique pour les enfants de 6 à 12 ans.',
  url: 'https://www.lesecranspastoutletemps.fr',
  image: 'https://www.lesecranspastoutletemps.fr/images/og-image.jpg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Marseille',
    addressCountry: 'FR',
    addressRegion: "Provence-Alpes-Côte d'Azur",
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
};

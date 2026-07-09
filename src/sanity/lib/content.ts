import { stegaClean } from 'next-sanity';
import { sanityFetch } from './fetch';
import { urlForImage } from './image';
import {
  HOME_DEFAULTS,
  SETTINGS_DEFAULTS,
  FAQ_DEFAULTS,
  CONTACT_DEFAULTS,
  BOUTIQUE_DEFAULTS,
  type HomeContent,
  type SiteSettings,
  type FaqContent,
  type ContactContent,
  type BoutiqueContent,
} from './contentDefaults';

export type {
  HomeContent,
  SiteSettings,
  ReassuranceItem,
  ValueItem,
  Testimonial,
  FaqContent,
  FaqItem,
  ContactContent,
  BoutiqueContent,
} from './contentDefaults';

const nonEmpty =<T,>(arr: T[] | undefined | null, fallback: T[]) =>
  Array.isArray(arr) && arr.length > 0 ? arr : fallback;

export async function getHomeContent(): Promise<HomeContent> {
  let d: Partial<HomeContent> | null = null;
  try {
    d = await sanityFetch(`*[_type == "homePage"][0]{ ..., "heroLqip": heroImage.asset->metadata.lqip }`);
  } catch {
    /* repli sur les valeurs par défaut */
  }
  let heroImageUrl = HOME_DEFAULTS.heroImageUrl;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const img = (d as any)?.heroImage;
    if (img?.asset) heroImageUrl = urlForImage(img).width(1600).height(2000).fit('crop').url();
  } catch {
    /* garde la photo par défaut */
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heroBlurDataURL = typeof (d as any)?.heroLqip === 'string' ? (d as any).heroLqip : undefined;

  return {
    heroTitle: d?.heroTitle || HOME_DEFAULTS.heroTitle,
    heroHighlight: d?.heroHighlight ?? HOME_DEFAULTS.heroHighlight,
    heroCtaPrimary: d?.heroCtaPrimary || HOME_DEFAULTS.heroCtaPrimary,
    heroCtaSecondary: d?.heroCtaSecondary || HOME_DEFAULTS.heroCtaSecondary,
    heroImageUrl,
    heroBlurDataURL,
    reassuranceItems: nonEmpty(d?.reassuranceItems, HOME_DEFAULTS.reassuranceItems),
    featuredLabel: d?.featuredLabel || HOME_DEFAULTS.featuredLabel,
    featuredHeading: d?.featuredHeading || HOME_DEFAULTS.featuredHeading,
    featuredIntro: d?.featuredIntro || HOME_DEFAULTS.featuredIntro,
    featuredCta: d?.featuredCta || HOME_DEFAULTS.featuredCta,
    valuesLabel: d?.valuesLabel || HOME_DEFAULTS.valuesLabel,
    valuesHeading: d?.valuesHeading || HOME_DEFAULTS.valuesHeading,
    valuesItems: nonEmpty(d?.valuesItems, HOME_DEFAULTS.valuesItems),
    testimonialsLabel: d?.testimonialsLabel || HOME_DEFAULTS.testimonialsLabel,
    testimonialsHeading: d?.testimonialsHeading || HOME_DEFAULTS.testimonialsHeading,
    testimonials: nonEmpty(d?.testimonials, HOME_DEFAULTS.testimonials),
    newsletterLabel: d?.newsletterLabel || HOME_DEFAULTS.newsletterLabel,
    newsletterHeading: d?.newsletterHeading || HOME_DEFAULTS.newsletterHeading,
    newsletterText: d?.newsletterText || HOME_DEFAULTS.newsletterText,
    newsletterCta: d?.newsletterCta || HOME_DEFAULTS.newsletterCta,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  let d: Partial<SiteSettings> | null = null;
  try {
    d = await sanityFetch(`*[_type == "siteSettings"][0]`);
  } catch {
    /* repli */
  }
  return {
    footerTagline: d?.footerTagline || SETTINGS_DEFAULTS.footerTagline,
    // L'email reste marqué (cliquable à l'affichage) ; il est nettoyé au cas par
    // cas là où il sert de lien mailto. L'URL Instagram ne sert que de lien.
    contactEmail: d?.contactEmail || SETTINGS_DEFAULTS.contactEmail,
    contactLocation: d?.contactLocation || SETTINGS_DEFAULTS.contactLocation,
    contactHours: d?.contactHours || SETTINGS_DEFAULTS.contactHours,
    instagramHandle: d?.instagramHandle || SETTINGS_DEFAULTS.instagramHandle,
    instagramUrl: stegaClean(d?.instagramUrl || SETTINGS_DEFAULTS.instagramUrl),
  };
}

export async function getFaqContent(): Promise<FaqContent> {
  let d: Partial<FaqContent> | null = null;
  try {
    d = await sanityFetch(`*[_type == "faqPage"][0]`);
  } catch {
    /* repli */
  }
  return {
    label: d?.label || FAQ_DEFAULTS.label,
    heading: d?.heading || FAQ_DEFAULTS.heading,
    intro: d?.intro || FAQ_DEFAULTS.intro,
    items: nonEmpty(d?.items, FAQ_DEFAULTS.items),
  };
}

export async function getContactContent(): Promise<ContactContent> {
  let d: Partial<ContactContent> | null = null;
  try {
    d = await sanityFetch(`*[_type == "contactPage"][0]`);
  } catch {
    /* repli */
  }
  return {
    label: d?.label || CONTACT_DEFAULTS.label,
    heading: d?.heading || CONTACT_DEFAULTS.heading,
    intro: d?.intro || CONTACT_DEFAULTS.intro,
  };
}

export async function getBoutiqueContent(): Promise<BoutiqueContent> {
  let d: Partial<BoutiqueContent> | null = null;
  try {
    d = await sanityFetch(`*[_type == "boutiquePage"][0]`);
  } catch {
    /* repli */
  }
  return {
    heading: d?.heading || BOUTIQUE_DEFAULTS.heading,
    intro: d?.intro || BOUTIQUE_DEFAULTS.intro,
  };
}

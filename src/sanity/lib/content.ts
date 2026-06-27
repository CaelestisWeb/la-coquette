import { client } from './client';
import { urlForImage } from './image';
import {
  HOME_DEFAULTS,
  SETTINGS_DEFAULTS,
  FAQ_DEFAULTS,
  CONTACT_DEFAULTS,
  type HomeContent,
  type SiteSettings,
  type FaqContent,
  type ContactContent,
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
} from './contentDefaults';

const OPTS = { next: { revalidate: 60 } } as const;

const nonEmpty = <T,>(arr: T[] | undefined | null, fallback: T[]) =>
  Array.isArray(arr) && arr.length > 0 ? arr : fallback;

export async function getHomeContent(): Promise<HomeContent> {
  let d: Partial<HomeContent> | null = null;
  try {
    d = await client.fetch(`*[_type == "homePage"][0]`, {}, OPTS);
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

  return {
    heroTitle: d?.heroTitle || HOME_DEFAULTS.heroTitle,
    heroHighlight: d?.heroHighlight ?? HOME_DEFAULTS.heroHighlight,
    heroCtaPrimary: d?.heroCtaPrimary || HOME_DEFAULTS.heroCtaPrimary,
    heroCtaSecondary: d?.heroCtaSecondary || HOME_DEFAULTS.heroCtaSecondary,
    heroImageUrl,
    reassuranceItems: nonEmpty(d?.reassuranceItems, HOME_DEFAULTS.reassuranceItems),
    featuredLabel: d?.featuredLabel || HOME_DEFAULTS.featuredLabel,
    featuredHeading: d?.featuredHeading || HOME_DEFAULTS.featuredHeading,
    featuredIntro: d?.featuredIntro || HOME_DEFAULTS.featuredIntro,
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
    d = await client.fetch(`*[_type == "siteSettings"][0]`, {}, OPTS);
  } catch {
    /* repli */
  }
  return {
    footerTagline: d?.footerTagline || SETTINGS_DEFAULTS.footerTagline,
    contactEmail: d?.contactEmail || SETTINGS_DEFAULTS.contactEmail,
    contactLocation: d?.contactLocation || SETTINGS_DEFAULTS.contactLocation,
    contactHours: d?.contactHours || SETTINGS_DEFAULTS.contactHours,
    instagramHandle: d?.instagramHandle || SETTINGS_DEFAULTS.instagramHandle,
    instagramUrl: d?.instagramUrl || SETTINGS_DEFAULTS.instagramUrl,
  };
}

export async function getFaqContent(): Promise<FaqContent> {
  let d: Partial<FaqContent> | null = null;
  try {
    d = await client.fetch(`*[_type == "faqPage"][0]`, {}, OPTS);
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
    d = await client.fetch(`*[_type == "contactPage"][0]`, {}, OPTS);
  } catch {
    /* repli */
  }
  return {
    label: d?.label || CONTACT_DEFAULTS.label,
    heading: d?.heading || CONTACT_DEFAULTS.heading,
    intro: d?.intro || CONTACT_DEFAULTS.intro,
  };
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
  // Anciennes URLs de la boutique -> équivalents de la vitrine (SEO + UX).
  async redirects() {
    return [
      { source: "/boutique", destination: "/galerie", permanent: true },
      { source: "/boutique/:path*", destination: "/galerie", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/faq", destination: "/", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Assets statiques de /public (logos, hero, og-image, placeholder) :
        // Vercel les sert en max-age=0 par défaut, donc re-téléchargés à
        // chaque visite. Cache 7 jours, sans immutable (noms non fingerprintés).
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            // CSP conservatrice : bloque les plugins/objets, l'injection de <base>
            // et le framing externe, sans restreindre scripts/styles/images
            // (donc aucun risque de casser le rendu Next/Sanity/SumUp).
            key: "Content-Security-Policy",
            value: "object-src 'none'; base-uri 'self'; frame-ancestors 'self'",
          },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            // payment=* autorise l'iframe SumUp (gateway.sumup.com) a utiliser
            // l'API Payment Request, indispensable pour afficher Apple Pay / Google Pay.
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=*",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

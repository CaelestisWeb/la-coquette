import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-32 md:pt-44 min-h-screen bg-ivoire flex items-center justify-center">
      <div className="text-center px-6 py-20 max-w-md">
        <p className="font-display text-7xl text-noir/25">404</p>
        <h1 className="font-display text-3xl text-noir mt-4">Page introuvable</h1>
        <p className="font-body text-sm text-taupe leading-relaxed mt-4">
          La page que vous cherchez n&apos;existe pas ou a été déplacée. Mais les créations, elles, sont toujours là.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link href="/"
            className="inline-block bg-noir text-blanc border border-noir font-body text-xs font-medium tracking-widest uppercase px-8 py-3.5 rounded hover:bg-or transition-colors duration-300">
            Retour à l&apos;accueil
          </Link>
          <Link href="/galerie"
            className="inline-block border border-noir text-noir font-body text-xs font-medium tracking-widest uppercase px-8 py-3.5 rounded hover:bg-noir hover:text-blanc transition-colors duration-300">
            Voir la galerie
          </Link>
        </div>
      </div>
    </div>
  );
}

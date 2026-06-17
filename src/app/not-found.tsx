import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-24 md:pt-36 min-h-screen bg-ivoire flex items-center justify-center">
      <div className="text-center px-6 py-20 max-w-md">
        <p className="font-display text-7xl text-or">404</p>
        <h1 className="font-display text-3xl text-noir mt-4">Page introuvable</h1>
        <p className="font-body text-sm text-taupe leading-relaxed mt-4">
          La page que vous cherchez n'existe pas ou a été déplacée. Mais nos plus belles créations, elles, sont toujours là.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link href="/"
            className="inline-block bg-noir text-blanc font-body text-xs font-medium tracking-widest uppercase px-8 py-3.5 hover:bg-or transition-colors duration-300">
            Retour à l'accueil
          </Link>
          <Link href="/boutique"
            className="inline-block border border-or text-or font-body text-xs font-medium tracking-widest uppercase px-8 py-3.5 hover:bg-or hover:text-blanc transition-colors duration-300">
            Voir la boutique
          </Link>
        </div>
      </div>
    </div>
  );
}

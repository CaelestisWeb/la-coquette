import { isAuthed } from '@/lib/gestion-auth';
import { getGestionProducts } from '@/lib/gestion-data';
import LoginForm from './LoginForm';
import ProductManager from './ProductManager';

export const dynamic = 'force-dynamic';

export default async function GestionPage() {
  const authed = await isAuthed();
  // Connectée : on charge les produits DANS la page (rendu serveur) et on les
  // passe au tableau. Caro les voit immédiatement, sans second aller-retour.
  const data = authed ? await getGestionProducts() : null;
  return (
    <div className="min-h-screen bg-ivoire">
      {authed && data ? (
        <ProductManager initialProducts={data.products} initialCollections={data.collections} />
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

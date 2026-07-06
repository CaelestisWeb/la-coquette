import { isAuthed } from '@/lib/gestion-auth';
import LoginForm from './LoginForm';
import ProductManager from './ProductManager';

export const dynamic = 'force-dynamic';

export default async function GestionPage() {
  const authed = await isAuthed();
  return (
    <div className="min-h-screen bg-ivoire">
      {authed ? <ProductManager /> : <LoginForm />}
    </div>
  );
}

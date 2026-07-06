'use client';

import { useEffect, useRef, useState } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  material: string;
  available: boolean;
  featured: boolean;
  order: number;
  slug: string;
  collectionId: string;
  thumb: string | null;
};

type Collection = { id: string; name: string };

async function jsonApi(method: string, body: unknown) {
  const res = await fetch('/api/gestion/products', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Erreur');
  return res.json();
}

async function uploadPhoto(file: File): Promise<string> {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/gestion/upload', { method: 'POST', body: fd });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Upload impossible');
  return (await res.json()).assetId as string;
}

function Toggle({ on, onClick, label, tone }: { on: boolean; onClick: () => void; label: string; tone: 'green' | 'gold' }) {
  const active = tone === 'green' ? 'bg-[#2f6b3f]' : 'bg-[#A8842E]';
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 font-body text-[11px] tracking-wide uppercase text-taupe"
      aria-pressed={on}
    >
      <span className={`relative inline-block w-9 h-5 rounded-full transition-colors ${on ? active : 'bg-gris'}`}>
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-4' : ''}`} />
      </span>
      {label}
    </button>
  );
}

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState<string | null>(null);
  const saved = useRef<Record<string, { name: string; price: number }>>({});

  // Formulaire d'ajout
  const [nName, setNName] = useState('');
  const [nPrice, setNPrice] = useState('');
  const [nDesc, setNDesc] = useState('');
  const [nColl, setNColl] = useState('');
  const [nFile, setNFile] = useState<File | null>(null);
  const [nPreview, setNPreview] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/gestion/products');
      if (!res.ok) throw new Error('Chargement impossible (reconnecte-toi ?)');
      const data = await res.json();
      const list: Product[] = data.products || [];
      setProducts(list);
      setCollections(data.collections || []);
      saved.current = {};
      for (const p of list) saved.current[p.id] = { name: p.name, price: p.price };
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  function update(id: string, patch: Partial<Product>) {
    setProducts((ps) => ps.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  async function persist(id: string, fields: Record<string, unknown>) {
    setSavingId(id);
    try {
      await jsonApi('PATCH', { id, ...fields });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Enregistrement impossible');
    } finally {
      setSavingId(null);
    }
  }

  function blurField(id: string, field: 'name' | 'price', value: string) {
    const ref = saved.current[id];
    const val = field === 'price' ? Number(value) || 0 : value;
    if (ref && String(ref[field]) === String(val)) return;
    if (ref) saved.current[id] = { ...ref, [field]: val };
    persist(id, { [field]: val });
  }

  function setCollection(id: string, collectionId: string) {
    update(id, { collectionId });
    persist(id, { collectionId });
  }

  async function toggle(id: string, field: 'available' | 'featured') {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    const next = !p[field];
    update(id, { [field]: next });
    persist(id, { [field]: next });
  }

  async function remove(id: string, name: string) {
    if (!confirm(`Supprimer « ${name} » ? Cette action est définitive.`)) return;
    setProducts((ps) => ps.filter((p) => p.id !== id));
    try {
      await jsonApi('DELETE', { id });
    } catch {
      load();
    }
  }

  async function duplicate(id: string) {
    setSavingId(id);
    try {
      await jsonApi('POST', { action: 'duplicate', id });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Duplication impossible');
    } finally {
      setSavingId(null);
    }
  }

  async function moveProduct(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= products.length) return;
    const next = [...products];
    [next[index], next[target]] = [next[target], next[index]];
    setProducts(next);
    try {
      await jsonApi('POST', { action: 'reorder', ids: next.map((p) => p.id) });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Réorganisation impossible');
      load();
    }
  }

  async function changePhoto(id: string, file: File) {
    setSavingId(id);
    try {
      const assetId = await uploadPhoto(file);
      await jsonApi('PATCH', { id, assetId });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Photo non enregistrée');
    } finally {
      setSavingId(null);
    }
  }

  async function addProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!nName.trim()) return;
    setAdding(true);
    setError('');
    try {
      let assetId: string | undefined;
      if (nFile) assetId = await uploadPhoto(nFile);
      await jsonApi('POST', { name: nName.trim(), price: Number(nPrice) || 0, description: nDesc, collectionId: nColl, assetId });
      setNName(''); setNPrice(''); setNDesc(''); setNColl(''); setNFile(null); setNPreview(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Ajout impossible");
    } finally {
      setAdding(false);
    }
  }

  const input = 'w-full border border-gris bg-blanc px-3 py-2 rounded font-body text-sm text-noir outline-none focus:border-noir transition-colors';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Barre du haut */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-noir">Ma boutique</h1>
          <p className="font-body text-xs text-taupe mt-1">{products.length} produit{products.length > 1 ? 's' : ''} · changements visibles en ligne aussitôt · flèches ↑↓ = ordre d&apos;affichage</p>
        </div>
        <div className="flex items-center gap-2 font-body text-[11px] tracking-wide uppercase">
          <a href="/boutique" target="_blank" className="px-3 py-2 rounded border border-noir text-noir hover:bg-noir hover:text-blanc transition-colors">Voir la boutique</a>
          <button onClick={() => fetch('/api/gestion/logout', { method: 'POST' }).then(() => location.reload())} className="px-3 py-2 rounded text-taupe hover:text-noir transition-colors">Se déconnecter</button>
        </div>
      </div>

      {error && <p className="font-body text-sm text-red-600 bg-red-50 border border-red-200 rounded px-4 py-3 mb-6">{error}</p>}

      {/* Ajouter un produit */}
      <form onSubmit={addProduct} className="bg-creme rounded-xl p-5 sm:p-6 mb-8">
        <h2 className="font-display text-2xl text-noir mb-4">Ajouter un produit</h2>
        <div className="grid sm:grid-cols-[140px_1fr] gap-4">
          <label className="cursor-pointer">
            <span className="sr-only">Photo</span>
            <div className="aspect-square rounded-lg border-2 border-dashed border-gris bg-blanc flex items-center justify-center overflow-hidden text-center">
              {nPreview
                ? <img src={nPreview} alt="" className="w-full h-full object-cover" />
                : <span className="font-body text-[11px] text-taupe px-2">Cliquer pour<br />ajouter une photo</span>}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
              const f = e.target.files?.[0] || null;
              setNFile(f);
              setNPreview(f ? URL.createObjectURL(f) : null);
            }} />
          </label>
          <div className="space-y-3">
            <input className={input} placeholder="Nom du bijou *" value={nName} onChange={(e) => setNName(e.target.value)} required />
            <input className={input} type="number" step="0.01" min="0" placeholder="Prix en € *" value={nPrice} onChange={(e) => setNPrice(e.target.value)} />
            <textarea className={`${input} resize-none`} rows={2} placeholder="Description (optionnel)" value={nDesc} onChange={(e) => setNDesc(e.target.value)} />
            {collections.length > 0 && (
              <select className={input} value={nColl} onChange={(e) => setNColl(e.target.value)}>
                <option value="">Collection (aucune)</option>
                {collections.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            )}
            <button type="submit" disabled={adding || !nName.trim()} className="bg-noir text-blanc font-body text-xs font-medium tracking-widest uppercase px-6 py-3 rounded hover:bg-or transition-colors disabled:opacity-50">
              {adding ? 'Ajout en cours…' : 'Ajouter le produit'}
            </button>
          </div>
        </div>
      </form>

      {/* Liste des produits */}
      {loading ? (
        <p className="font-body text-sm text-taupe text-center py-10">Chargement…</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {products.map((p, i) => (
            <div key={p.id} className={`bg-creme rounded-xl p-4 flex gap-4 ${savingId === p.id ? 'opacity-60' : ''}`}>
              <label className="relative shrink-0 cursor-pointer group">
                <div className="w-24 h-24 rounded-lg bg-blanc overflow-hidden border border-gris">
                  {p.thumb ? <img src={p.thumb} alt="" className="w-full h-full object-cover" /> : <span className="flex items-center justify-center w-full h-full font-body text-[10px] text-taupe">Pas de photo</span>}
                </div>
                <span className="absolute inset-0 flex items-center justify-center bg-noir/0 group-hover:bg-noir/40 text-blanc text-[10px] font-body uppercase tracking-wide opacity-0 group-hover:opacity-100 transition rounded-lg">Changer</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) changePhoto(p.id, f); }} />
              </label>

              <div className="flex-1 min-w-0">
                <input
                  className="w-full font-display text-lg text-noir bg-transparent outline-none border-b border-transparent focus:border-gris"
                  defaultValue={p.name}
                  onBlur={(e) => blurField(p.id, 'name', e.target.value)}
                />
                <div className="flex items-center gap-1 mt-1">
                  <input
                    className="w-20 font-body text-sm text-noir bg-blanc border border-gris rounded px-2 py-1 outline-none focus:border-noir"
                    type="number" step="0.01" min="0"
                    defaultValue={p.price}
                    onBlur={(e) => blurField(p.id, 'price', e.target.value)}
                  />
                  <span className="font-body text-sm text-taupe">€</span>
                </div>

                {collections.length > 0 && (
                  <select
                    className="mt-2 w-full max-w-[220px] font-body text-xs text-noir bg-blanc border border-gris rounded px-2 py-1.5 outline-none focus:border-noir"
                    value={p.collectionId}
                    onChange={(e) => setCollection(p.id, e.target.value)}
                  >
                    <option value="">Collection (aucune)</option>
                    {collections.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                )}

                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
                  <Toggle on={p.available} onClick={() => toggle(p.id, 'available')} label={p.available ? 'En vente' : 'Épuisé'} tone="green" />
                  <Toggle on={p.featured} onClick={() => toggle(p.id, 'featured')} label="En avant" tone="gold" />
                </div>

                <div className="flex items-center gap-3 mt-3 font-body text-[11px] tracking-wide uppercase">
                  <div className="flex items-center gap-1">
                    <button onClick={() => moveProduct(i, -1)} disabled={i === 0} title="Monter" aria-label="Monter" className="w-6 h-6 rounded border border-gris text-noir disabled:opacity-30 hover:bg-noir hover:text-blanc transition-colors leading-none">↑</button>
                    <button onClick={() => moveProduct(i, 1)} disabled={i === products.length - 1} title="Descendre" aria-label="Descendre" className="w-6 h-6 rounded border border-gris text-noir disabled:opacity-30 hover:bg-noir hover:text-blanc transition-colors leading-none">↓</button>
                  </div>
                  <button onClick={() => duplicate(p.id)} className="text-taupe hover:text-noir transition-colors">Dupliquer</button>
                  <button onClick={() => remove(p.id, p.name)} className="text-taupe hover:text-red-600 transition-colors">Supprimer</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

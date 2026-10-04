import { useCallback, useEffect, useState } from 'react'
import { SEED_ITEMS, SEED_OUTFITS } from '../content/closetSeed'

const STORAGE_KEY = 'linda-closet-v1'

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { items: SEED_ITEMS, outfits: SEED_OUTFITS }
    }
    const parsed = JSON.parse(raw)
    return {
      items: Array.isArray(parsed.items) ? parsed.items : SEED_ITEMS,
      outfits: Array.isArray(parsed.outfits) ? parsed.outfits : SEED_OUTFITS,
    }
  } catch {
    return { items: SEED_ITEMS, outfits: SEED_OUTFITS }
  }
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

export function useClosetStore() {
  const [items, setItems] = useState([])
  const [outfits, setOutfits] = useState([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const store = loadStore()
    setItems(store.items)
    setOutfits(store.outfits)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, outfits }))
  }, [items, outfits, ready])

  const addItem = useCallback((item) => {
    const next = {
      id: uid('item'),
      name: item.name.trim(),
      category: item.category,
      color: item.color,
      colorName: item.colorName?.trim() || '',
      season: item.season || 'All season',
      notes: item.notes?.trim() || '',
      image: item.image || '',
    }
    setItems((prev) => [next, ...prev])
    return next
  }, [])

  const updateItem = useCallback((id, patch) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    )
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    setOutfits((prev) =>
      prev
        .map((outfit) => ({
          ...outfit,
          itemIds: outfit.itemIds.filter((itemId) => itemId !== id),
        }))
        .filter((outfit) => outfit.itemIds.length > 0),
    )
  }, [])

  const saveOutfit = useCallback((outfit) => {
    const next = {
      id: uid('outfit'),
      name: outfit.name.trim() || 'Untitled outfit',
      occasion: outfit.occasion?.trim() || '',
      itemIds: [...outfit.itemIds],
      createdAt: new Date().toISOString(),
    }
    setOutfits((prev) => [next, ...prev])
    return next
  }, [])

  const removeOutfit = useCallback((id) => {
    setOutfits((prev) => prev.filter((outfit) => outfit.id !== id))
  }, [])

  const resetToSeed = useCallback(() => {
    setItems(SEED_ITEMS)
    setOutfits(SEED_OUTFITS)
  }, [])

  return {
    items,
    outfits,
    ready,
    addItem,
    updateItem,
    removeItem,
    saveOutfit,
    removeOutfit,
    resetToSeed,
  }
}

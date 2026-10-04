import { useMemo, useRef, useState } from 'react'
import { CATEGORIES, SEASONS } from '../content/closetSeed'
import GarmentVisual from '../components/closet/GarmentVisual'
import { useClosetStore } from '../hooks/useClosetStore'
import styles from './Closet.module.css'

const EMPTY_FORM = {
  name: '',
  category: 'tops',
  color: '#C4502A',
  colorName: '',
  season: 'All season',
  notes: '',
  image: '',
}

function ItemTile({ item, selected, onToggle, onRemove, mode }) {
  return (
    <article
      className={`${styles.tile} ${selected ? styles.tileSelected : ''} ${mode === 'pair' ? styles.tilePairable : ''}`}
      onClick={mode === 'pair' ? () => onToggle(item.id) : undefined}
      role={mode === 'pair' ? 'button' : undefined}
      tabIndex={mode === 'pair' ? 0 : undefined}
      onKeyDown={
        mode === 'pair'
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onToggle(item.id)
              }
            }
          : undefined
      }
      aria-pressed={mode === 'pair' ? selected : undefined}
    >
      <div className={styles.tileVisual} style={{ background: `linear-gradient(160deg, ${item.color}33, ${item.color}88)` }}>
        {item.image ? (
          <img src={item.image} alt="" className={styles.tileImage} />
        ) : (
          <GarmentVisual category={item.category} color={item.color} className={styles.tileSilhouette} />
        )}
        {selected && <span className={styles.selectedMark} aria-hidden="true">✓</span>}
      </div>
      <div className={styles.tileMeta}>
        <div className={styles.tileTopRow}>
          <h3 className={styles.tileName}>{item.name}</h3>
          <span className={styles.swatch} style={{ backgroundColor: item.color }} title={item.colorName || item.color} />
        </div>
        <p className={styles.tileSub}>
          {CATEGORIES.find((c) => c.id === item.category)?.label || item.category}
          {item.season && item.season !== 'All season' ? ` · ${item.season}` : ''}
        </p>
        {mode === 'browse' && (
          <button
            type="button"
            className={styles.ghostBtn}
            onClick={(e) => {
              e.stopPropagation()
              onRemove(item.id)
            }}
          >
            Remove
          </button>
        )}
      </div>
    </article>
  )
}

export default function Closet() {
  const {
    items,
    outfits,
    ready,
    addItem,
    removeItem,
    saveOutfit,
    removeOutfit,
    resetToSeed,
  } = useClosetStore()

  const [view, setView] = useState('closet') // closet | pair | outfits
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [form, setForm] = useState(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const [outfitName, setOutfitName] = useState('')
  const [outfitOccasion, setOutfitOccasion] = useState('')
  const [savedFlash, setSavedFlash] = useState(false)
  const fileRef = useRef(null)

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((item) => {
      const catOk = categoryFilter === 'all' || item.category === categoryFilter
      const qOk =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.colorName?.toLowerCase().includes(q) ||
        item.notes?.toLowerCase().includes(q)
      return catOk && qOk
    })
  }, [items, categoryFilter, query])

  const selectedItems = useMemo(
    () => selectedIds.map((id) => items.find((i) => i.id === id)).filter(Boolean),
    [selectedIds, items],
  )

  function toggleSelect(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  function handleImageFile(file) {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      setForm((f) => ({ ...f, image: String(reader.result) }))
    }
    reader.readAsDataURL(file)
  }

  function submitItem(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    addItem(form)
    setForm(EMPTY_FORM)
    setShowForm(false)
  }

  function handleSaveOutfit(e) {
    e.preventDefault()
    if (selectedIds.length < 2) return
    saveOutfit({
      name: outfitName,
      occasion: outfitOccasion,
      itemIds: selectedIds,
    })
    setOutfitName('')
    setOutfitOccasion('')
    setSelectedIds([])
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1800)
    setView('outfits')
  }

  if (!ready) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Opening the closet…</div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Personal tool</p>
          <h1 className={styles.title}>
            Closet
            <span className={styles.titleMark}> inventory</span>
          </h1>
          <p className={styles.lede}>
            See every piece at a glance, then pair them into outfits you can actually wear.
          </p>
        </div>
        <div className={styles.heroStats} aria-label="Closet summary">
          <div className={styles.stat}>
            <span className={styles.statNum}>{items.length}</span>
            <span className={styles.statLabel}>pieces</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{outfits.length}</span>
            <span className={styles.statLabel}>outfits</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{CATEGORIES.length}</span>
            <span className={styles.statLabel}>categories</span>
          </div>
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.tabs} role="tablist" aria-label="Closet views">
          <button
            type="button"
            role="tab"
            aria-selected={view === 'closet'}
            className={`${styles.tab} ${view === 'closet' ? styles.tabActive : ''}`}
            onClick={() => setView('closet')}
          >
            Closet
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'pair'}
            className={`${styles.tab} ${view === 'pair' ? styles.tabActive : ''}`}
            onClick={() => setView('pair')}
          >
            Pair outfits
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === 'outfits'}
            className={`${styles.tab} ${view === 'outfits' ? styles.tabActive : ''}`}
            onClick={() => setView('outfits')}
          >
            Saved looks
          </button>
        </div>

        <div className={styles.toolbarActions}>
          {view === 'closet' && (
            <button type="button" className={styles.primaryBtn} onClick={() => setShowForm((v) => !v)}>
              {showForm ? 'Cancel' : 'Add piece'}
            </button>
          )}
          <button
            type="button"
            className={styles.ghostBtn}
            onClick={() => {
              if (window.confirm('Reset closet to the starter wardrobe?')) resetToSeed()
            }}
          >
            Reset demo
          </button>
        </div>
      </div>

      {view === 'closet' && showForm && (
        <form className={styles.form} onSubmit={submitItem}>
          <div className={styles.formHead}>
            <h2>Add a piece</h2>
            <p>Photo optional — color + silhouette still make a clear inventory.</p>
          </div>
          <div className={styles.formGrid}>
            <label className={styles.field}>
              <span>Name</span>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Camel overcoat"
              />
            </label>
            <label className={styles.field}>
              <span>Category</span>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span>Color</span>
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))}
              />
            </label>
            <label className={styles.field}>
              <span>Color name</span>
              <input
                value={form.colorName}
                onChange={(e) => setForm((f) => ({ ...f, colorName: e.target.value }))}
                placeholder="e.g. Oxblood"
              />
            </label>
            <label className={styles.field}>
              <span>Season</span>
              <select
                value={form.season}
                onChange={(e) => setForm((f) => ({ ...f, season: e.target.value }))}
              >
                {SEASONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span>Photo URL</span>
              <input
                value={form.image.startsWith('data:') ? '' : form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                placeholder="https://…"
              />
            </label>
            <label className={`${styles.field} ${styles.fieldWide}`}>
              <span>Notes</span>
              <input
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Fit, fabric, when you reach for it"
              />
            </label>
            <div className={`${styles.field} ${styles.fieldWide}`}>
              <span>Or upload a photo</span>
              <div className={styles.uploadRow}>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFile(e.target.files?.[0])}
                />
                {form.image && (
                  <button
                    type="button"
                    className={styles.ghostBtn}
                    onClick={() => {
                      setForm((f) => ({ ...f, image: '' }))
                      if (fileRef.current) fileRef.current.value = ''
                    }}
                  >
                    Clear photo
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className={styles.formPreview}>
            <div
              className={styles.previewVisual}
              style={{ background: `linear-gradient(160deg, ${form.color}33, ${form.color}88)` }}
            >
              {form.image ? (
                <img src={form.image} alt="" />
              ) : (
                <GarmentVisual category={form.category} color={form.color} className={styles.tileSilhouette} />
              )}
            </div>
            <button type="submit" className={styles.primaryBtn}>Save to closet</button>
          </div>
        </form>
      )}

      {(view === 'closet' || view === 'pair') && (
        <section className={styles.inventorySection}>
          <div className={styles.filters}>
            <div className={styles.chips} role="group" aria-label="Filter by category">
              <button
                type="button"
                className={`${styles.chip} ${categoryFilter === 'all' ? styles.chipActive : ''}`}
                onClick={() => setCategoryFilter('all')}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`${styles.chip} ${categoryFilter === c.id ? styles.chipActive : ''}`}
                  onClick={() => setCategoryFilter(c.id)}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <label className={styles.search}>
              <span className={styles.srOnly}>Search closet</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, color, notes…"
              />
            </label>
          </div>

          {view === 'pair' && (
            <aside className={styles.pairPanel}>
              <div className={styles.pairHead}>
                <h2>Building look</h2>
                <p>
                  {selectedItems.length === 0
                    ? 'Tap pieces below to compose an outfit.'
                    : `${selectedItems.length} piece${selectedItems.length === 1 ? '' : 's'} selected`}
                </p>
              </div>
              <div className={styles.pairCanvas}>
                {selectedItems.length === 0 ? (
                  <p className={styles.pairEmpty}>Your outfit will assemble here.</p>
                ) : (
                  selectedItems.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      className={styles.pairChip}
                      style={{ animationDelay: `${i * 60}ms` }}
                      onClick={() => toggleSelect(item.id)}
                      title="Remove from outfit"
                    >
                      <span className={styles.pairChipSwatch} style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </button>
                  ))
                )}
              </div>
              <form className={styles.pairForm} onSubmit={handleSaveOutfit}>
                <label className={styles.field}>
                  <span>Outfit name</span>
                  <input
                    value={outfitName}
                    onChange={(e) => setOutfitName(e.target.value)}
                    placeholder="e.g. Boardroom calm"
                  />
                </label>
                <label className={styles.field}>
                  <span>Occasion</span>
                  <input
                    value={outfitOccasion}
                    onChange={(e) => setOutfitOccasion(e.target.value)}
                    placeholder="Work, weekend, travel…"
                  />
                </label>
                <button
                  type="submit"
                  className={styles.primaryBtn}
                  disabled={selectedIds.length < 2}
                >
                  Save outfit
                </button>
                {selectedIds.length > 0 && (
                  <button
                    type="button"
                    className={styles.ghostBtn}
                    onClick={() => setSelectedIds([])}
                  >
                    Clear selection
                  </button>
                )}
              </form>
              {savedFlash && <p className={styles.flash} role="status">Outfit saved.</p>}
            </aside>
          )}

          <div className={`${styles.grid} ${view === 'pair' ? styles.gridWithPair : ''}`}>
            {filteredItems.map((item, i) => (
              <div key={item.id} className={styles.tileWrap} style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }}>
                <ItemTile
                  item={item}
                  mode={view === 'pair' ? 'pair' : 'browse'}
                  selected={selectedIds.includes(item.id)}
                  onToggle={toggleSelect}
                  onRemove={removeItem}
                />
              </div>
            ))}
            {filteredItems.length === 0 && (
              <p className={styles.empty}>No pieces match that filter. Add one, or clear search.</p>
            )}
          </div>
        </section>
      )}

      {view === 'outfits' && (
        <section className={styles.outfitsSection}>
          {outfits.length === 0 ? (
            <p className={styles.empty}>
              No saved looks yet.{' '}
              <button type="button" className={styles.linkBtn} onClick={() => setView('pair')}>
                Pair an outfit
              </button>
            </p>
          ) : (
            <div className={styles.outfitList}>
              {outfits.map((outfit, i) => {
                const pieces = outfit.itemIds
                  .map((id) => items.find((item) => item.id === id))
                  .filter(Boolean)
                return (
                  <article
                    key={outfit.id}
                    className={styles.outfitRow}
                    style={{ animationDelay: `${i * 70}ms` }}
                  >
                    <div className={styles.outfitInfo}>
                      <h2 className={styles.outfitName}>{outfit.name}</h2>
                      <p className={styles.outfitMeta}>
                        {outfit.occasion ? `${outfit.occasion} · ` : ''}
                        {pieces.length} pieces
                      </p>
                      <button
                        type="button"
                        className={styles.ghostBtn}
                        onClick={() => removeOutfit(outfit.id)}
                      >
                        Delete look
                      </button>
                    </div>
                    <div className={styles.outfitPieces}>
                      {pieces.map((item) => (
                        <div key={item.id} className={styles.outfitPiece}>
                          <div
                            className={styles.outfitPieceVisual}
                            style={{ background: `linear-gradient(160deg, ${item.color}33, ${item.color}88)` }}
                          >
                            {item.image ? (
                              <img src={item.image} alt="" />
                            ) : (
                              <GarmentVisual category={item.category} color={item.color} className={styles.miniSilhouette} />
                            )}
                          </div>
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

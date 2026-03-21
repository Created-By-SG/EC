// components/InventoryPanel.js
// DESTINATION: games/001-mr-easter/components/
//
// Slide-out Kin Sack panel. Triggered by bag icon in game header.
// Two tabs: Items (inspect) and Merge (combine).
//
// ITEMS TAB:
//   Tap any item to read its full content (note, manifest, physical card etc.)
//   Items with combinedWith set show a hint pointing to the Merge tab
//
// MERGE TAB:
//   Slot A = tool only (UV torch, cipher wheel, magnifier)
//   Slot B = any item compatible with that tool (filtered by combinedWith + type rules)
//   Compatibility rules:
//     tool + tool = blocked
//     read + physical = blocked
//     tool + read = allowed (if combinedWith matches)
//     tool + physical = allowed (if combinedWith matches)
//   usedCombos (Set) tracks completed pairs so they don't appear again
//   Result screen shows mechanic-specific UI (UV reveal, cipher wheel, physical fit etc.)
//
// ALL READABLE ITEMS have combinedWith: 'uv-torch' and hiddenAnnotations: []
//   Fill hiddenAnnotations with { ref, note } entries when writing UV content
//   The UV reveal puzzle (torch scan mechanic) is built but not yet wired to this
//
// DEV_MODE: Shows all items regardless of stage progress
//
// IMPORTANT — DO NOT:
//   - Allow tool in slot B (breaks merge logic)
//   - Allow read+physical combinations (no mechanic exists for this)
//   - Remove usedCombos tracking (players would get duplicate results)

import { useState, useEffect, useRef } from 'react'
import styles from './InventoryPanel.module.css'
import { DEV_MODE } from '../../../lib/devConfig'

// ─── Item type renderers ─────────────────────────────────────────────────────

function NoteItem({ item }) {
  return (
    <div className={styles.noteCard}>
      <div className={styles.noteLines}>
        {item.content?.text?.split('\n').map((line, i) => (
          <p key={i} className={styles.noteLine}>{line || '\u00A0'}</p>
        ))}
      </div>
      {item.content?.signature && (
        <div className={styles.noteSignature}>— {item.content.signature}</div>
      )}
    </div>
  )
}

function ReceiptItem({ item }) {
  return (
    <div className={styles.receiptCard}>
      <div className={styles.receiptHeader}>{item.content?.vendor || item.name}</div>
      <div className={styles.receiptDivider}>- - - - - - - - - - - -</div>
      {item.content?.lines?.map((line, i) => (
        <div key={i} className={styles.receiptLine}>
          <span>{line.label}</span>
          <span>{line.value}</span>
        </div>
      ))}
      {item.content?.total && (
        <>
          <div className={styles.receiptDivider}>- - - - - - - - - - - -</div>
          <div className={`${styles.receiptLine} ${styles.receiptTotal}`}>
            <span>TOTAL</span>
            <span>{item.content.total}</span>
          </div>
        </>
      )}
      {item.content?.footer && (
        <div className={styles.receiptFooter}>{item.content.footer}</div>
      )}
    </div>
  )
}

function ManifestItem({ item }) {
  return (
    <div className={styles.manifestCard}>
      <div className={styles.manifestTitle}>{item.content?.title}</div>
      <div className={styles.manifestMeta}>
        <span>Date: {item.content?.date}</span>
        <span>Supervisor: {item.content?.supervisor}</span>
      </div>
      <table className={styles.manifestTable}>
        <thead>
          <tr>
            <th>Ref</th><th>Contents</th><th>Shelf</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {item.content?.rows?.map((row, i) => (
            <tr key={i}>
              <td>{row.ref}</td>
              <td>{row.contents}</td>
              <td>{row.shelf}</td>
              <td className={row.status === 'PACKED' ? styles.statusPacked : styles.statusMissing}>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {item.content?.signed && (
        <div className={styles.manifestSigned}>{item.content.signed}</div>
      )}
    </div>
  )
}

function MemoItem({ item }) {
  return (
    <div className={styles.memoCard}>
      <div className={styles.memoHeader}>
        <div className={styles.memoOrg}>ESCAPE CITY HQ</div>
        <div className={styles.memoTitle}>INTERNAL MEMO</div>
      </div>
      <div className={styles.memoFields}>
        {item.content?.to && <div><span className={styles.memoLabel}>TO:</span> {item.content.to}</div>}
        {item.content?.from && <div><span className={styles.memoLabel}>FROM:</span> {item.content.from}</div>}
        {item.content?.subject && <div><span className={styles.memoLabel}>RE:</span> {item.content.subject}</div>}
      </div>
      <div className={styles.memoDivider} />
      <div className={styles.memoBody}>{item.content?.body}</div>
    </div>
  )
}

function NapLogItem({ item }) {
  return (
    <div className={styles.noteCard}>
      <div className={styles.noteTitle}>{item.content?.title || item.name}</div>
      {item.content?.entries?.map((entry, i) => (
        <div key={i} className={styles.logEntry}>
          <span className={styles.logTime}>{entry.time}</span>
          <span className={styles.logText}>{entry.text}</span>
        </div>
      ))}
    </div>
  )
}

function KeyItem({ item }) {
  return (
    <div className={styles.physicalCard}>
      <div className={styles.keyIllustration}>
        <svg viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.keySvg}>
          <circle cx="16" cy="20" r="12" stroke="currentColor" strokeWidth="2.5"/>
          <circle cx="16" cy="20" r="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"/>
          <rect x="28" y="18" width="38" height="4" rx="2" fill="currentColor" opacity="0.7"/>
          <rect x="54" y="22" width="5" height="6" rx="1" fill="currentColor" opacity="0.7"/>
          <rect x="62" y="22" width="4" height="5" rx="1" fill="currentColor" opacity="0.7"/>
        </svg>
      </div>
      <div className={styles.physicalLabel}>{item.description}</div>
    </div>
  )
}

function RibbonItem({ item }) {
  return (
    <div className={styles.physicalCard}>
      <div className={styles.ribbonIllustration}>
        <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.ribbonSvg}>
          <path d="M0 10 Q25 2 50 10 Q75 18 100 10" stroke="#EAB308" strokeWidth="8" strokeLinecap="round" opacity="0.8"/>
          <path d="M0 20 Q25 12 50 20 Q75 28 100 20" stroke="#EAB308" strokeWidth="6" strokeLinecap="round" opacity="0.5"/>
        </svg>
      </div>
      <div className={styles.physicalLabel}>{item.description}</div>
    </div>
  )
}

function ToolCard({ item }) {
  const icons = {
    Tool_UVTorch_001: (
      <svg viewBox="0 0 40 40" fill="none" className={styles.toolIcon}>
        <rect x="8" y="16" width="24" height="10" rx="3" stroke="#a855f7" strokeWidth="2"/>
        <rect x="18" y="26" width="4" height="8" rx="1" fill="#a855f7" opacity="0.6"/>
        <circle cx="20" cy="12" r="5" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="2 2"/>
        <path d="M20 7V4M20 20v3M13 12H10M30 12H27" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    Tool_CipherWheel_001: (
      <svg viewBox="0 0 40 40" fill="none" className={styles.toolIcon}>
        <circle cx="20" cy="20" r="15" stroke="#60a5fa" strokeWidth="2"/>
        <circle cx="20" cy="20" r="9" stroke="#60a5fa" strokeWidth="1.5"/>
        <circle cx="20" cy="20" r="3" fill="#60a5fa" opacity="0.5"/>
        <text x="20" y="8" textAnchor="middle" fontSize="4" fill="#60a5fa" opacity="0.7">A</text>
        <text x="32" y="22" textAnchor="middle" fontSize="4" fill="#60a5fa" opacity="0.7">N</text>
        <text x="20" y="36" textAnchor="middle" fontSize="4" fill="#60a5fa" opacity="0.7">Z</text>
      </svg>
    ),
    Tool_Magnifier_001: (
      <svg viewBox="0 0 40 40" fill="none" className={styles.toolIcon}>
        <circle cx="17" cy="17" r="10" stroke="#34d399" strokeWidth="2"/>
        <line x1="24" y1="24" x2="34" y2="34" stroke="#34d399" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
  }
  return (
    <div className={styles.toolCard}>
      <div className={styles.toolIconWrap}>{icons[item.type] || null}</div>
      <div className={styles.toolName}>{item.name}</div>
      <div className={styles.toolDesc}>{item.description}</div>
    </div>
  )
}

function renderItemContent(item) {
  switch (item.type) {
    case 'Readable_Note_001':     return <NoteItem item={item} />
    case 'Readable_Receipt_001':  return <ReceiptItem item={item} />
    case 'Readable_Manifest_001': return <ManifestItem item={item} />
    case 'Readable_Memo_001':     return <MemoItem item={item} />
    case 'Readable_NapLog_001':   return <NapLogItem item={item} />
    case 'Physical_Key_001':      return <KeyItem item={item} />
    case 'Physical_Ribbon_001':   return <RibbonItem item={item} />
    case 'Tool_UVTorch_001':
    case 'Tool_CipherWheel_001':
    case 'Tool_Magnifier_001':    return <ToolCard item={item} />
    default:
      return <div className={styles.unknownItem}>{item.description}</div>
  }
}

// ─── Item category helper ─────────────────────────────────────────────────────

function getItemCategory(type = '') {
  if (type.startsWith('Readable_') || type.startsWith('Simple_')) return 'read'
  if (type.startsWith('Tool_'))     return 'tool'
  if (type.startsWith('Physical_')) return 'physical'
  return 'unknown'
}

// ─── Item thumbnail for the bag grid ─────────────────────────────────────────

function ItemThumb({ item, onSelect, isDragTarget, onDragStart, onDrop }) {
  const typeEmoji = {
    Readable_Note_001: '📝',
    Readable_Receipt_001: '🧾',
    Readable_Manifest_001: '📋',
    Readable_Memo_001: '📄',
    Readable_NapLog_001: '📓',
    Physical_Key_001: '🗝️',
    Physical_Ribbon_001: '🎀',
    Tool_UVTorch_001: '🔦',
    Tool_CipherWheel_001: '⚙️',
    Tool_Magnifier_001: '🔍',
  }
  const emoji = typeEmoji[item.type] || '📦'
  const category = getItemCategory(item.type)

  return (
    <button
      className={`${styles.itemThumb} ${styles[`itemThumb_${category}`] || ''} ${isDragTarget ? styles.itemThumbTarget : ''}`}
      onClick={() => onSelect(item)}
      draggable
      onDragStart={e => { e.dataTransfer.setData('itemId', item.id); onDragStart(item) }}
      onDragOver={e => e.preventDefault()}
      onDrop={e => { e.preventDefault(); onDrop(item) }}
    >
      <span className={styles.itemEmoji}>{emoji}</span>
      <span className={styles.itemThumbName}>{item.name}</span>
      <span className={`${styles.itemTypeBadge} ${styles[`itemTypeBadge_${category}`]}`}>{category}</span>
      {item.droppedBy && (
        <span className={styles.droppedBy}>from <strong>{item.droppedBy}</strong></span>
      )}
      {item.stage_given && (
        <span className={styles.itemThumbStage}>Stage {item.stage_given}</span>
      )}
    </button>
  )
}

// ─── Compatibility rules ─────────────────────────────────────────────────────
// tool + tool = no
// read + physical = no
// tool + read = yes (if combinedWith matches)
// tool + physical = yes (if combinedWith matches)
// read + read = yes (if combinedWith matches)
// physical + physical = yes (if combinedWith matches)

function comboKey(a, b) {
  return [a.id, b.id].sort().join('+')
}

function areTypesCompatible(a, b) {
  const catA = getItemCategory(a.type)
  const catB = getItemCategory(b.type)
  if (catA === 'tool' && catB === 'tool') return false
  if ((catA === 'read' && catB === 'physical') || (catA === 'physical' && catB === 'read')) return false
  return true
}

function canCombine(a, b) {
  if (!areTypesCompatible(a, b)) return false
  return a.combinedWith === b.id || b.combinedWith === a.id
}

// ─── Main panel ───────────────────────────────────────────────────────────────

export default function InventoryPanel({ sessionId, isOpen, onClose, allItemDefs }) {
  const [items, setItems]           = useState([])
  const [loading, setLoading]       = useState(false)
  const [selected, setSelected]     = useState(null)
  const [activeTab, setActiveTab]   = useState('items') // 'items' | 'merge'

  // Merge state
  const [slotA, setSlotA]           = useState(null)
  const [slotB, setSlotB]           = useState(null)
  const [pickingSlot, setPickingSlot] = useState(null) // 'A' | 'B' | null
  const [usedCombos, setUsedCombos] = useState(new Set())
  const [mergeResult, setMergeResult] = useState(null) // { item, partner, mechanic }

  useEffect(() => {
    if (!isOpen) return
    if (DEV_MODE) {
      setItems(allItemDefs.filter(d => d.id))
      return
    }
    if (!sessionId) return
    setLoading(true)
    fetch(`/api/session-items?sessionId=${sessionId}`)
      .then(r => r.json())
      .then(data => {
        const hydrated = (data || []).map(row => {
          const def = allItemDefs.find(d => d.id === row.item_id)
          return def ? { ...def, stage_given: row.stage_given } : null
        }).filter(Boolean)
        setItems(hydrated)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [isOpen, sessionId])

  // Reset merge state when switching tabs
  function switchTab(tab) {
    setActiveTab(tab)
    setSlotA(null)
    setSlotB(null)
    setPickingSlot(null)
    setMergeResult(null)
  }

  // Items valid for slot A — anything that has at least one possible partner
  function slotAItems() {
    // Slot A is always a tool
    return items.filter(item =>
      getItemCategory(item.type) === 'tool' &&
      items.some(other => other.id !== item.id && canCombine(item, other) && !usedCombos.has(comboKey(item, other)))
    )
  }

  // Items valid for slot B given slot A is chosen
  function slotBItems() {
    if (!slotA) return []
    return items.filter(item =>
      item.id !== slotA.id &&
      canCombine(slotA, item) &&
      !usedCombos.has(comboKey(slotA, item))
    )
  }

  function handleMerge() {
    if (!slotA || !slotB) return
    const key = comboKey(slotA, slotB)
    // Find which item carries the mechanic
    const active = slotA.combinedWith === slotB.id ? slotA : slotB
    const partner = active.id === slotA.id ? slotB : slotA
    setUsedCombos(prev => new Set([...prev, key]))
    setMergeResult({ item: active, partner, mechanic: active.combinationMechanic })
  }

  if (!isOpen) return null

  // ── Merge picker overlay ──
  if (pickingSlot) {
    const pickerItems = pickingSlot === 'A' ? slotAItems() : slotBItems()
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.panel} onClick={e => e.stopPropagation()}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>
              {pickingSlot === 'A' ? 'Choose a tool' : 'Choose an item'}
            </span>
            <button className={styles.closeBtn} onClick={() => setPickingSlot(null)}>✕</button>
          </div>
          {pickerItems.length === 0 ? (
            <div className={styles.emptyMsg}>
              <p>No compatible items available.</p>
            </div>
          ) : (
            <div className={styles.itemGrid}>
              {pickerItems.map(item => (
                <ItemThumb
                  key={item.id}
                  item={item}
                  onSelect={picked => {
                    if (pickingSlot === 'A') { setSlotA(picked); setSlotB(null) }
                    else setSlotB(picked)
                    setPickingSlot(null)
                  }}
                  isDragTarget={false}
                  onDragStart={() => {}}
                  onDrop={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── Merge result reveal ──
  if (mergeResult) {
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.panel} onClick={e => e.stopPropagation()}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>🎒 Kin Sack</span>
            <button className={styles.closeBtn} onClick={onClose}>✕</button>
          </div>
          <div className={styles.combineReveal}>
            <div className={styles.combineRevealTitle}>
              {mergeResult.mechanic === 'uv'             && '🔦 UV Reveal'}
              {mergeResult.mechanic === 'cipher_overlay' && '⚙️ Cipher Overlay'}
              {mergeResult.mechanic === 'physical_fit'   && '🔩 Combined'}
              {mergeResult.mechanic === 'combination_entry' && '🔐 Combination Lock'}
              {!mergeResult.mechanic                     && '✓ Combined'}
            </div>
            <div className={styles.combineRevealMeta}>
              {mergeResult.partner.name} + {mergeResult.item.name}
            </div>
            <div className={styles.combineRevealContent}>
              {mergeResult.mechanic === 'uv'             && <UVReveal item={mergeResult.item} />}
              {mergeResult.mechanic === 'cipher_overlay' && <CipherReveal item={mergeResult.item} />}
              {(mergeResult.mechanic === 'physical_fit' || mergeResult.mechanic === 'combination_entry' || !mergeResult.mechanic) && (
                <div className={styles.physicalCombineResult}>
                  {renderItemContent(mergeResult.item)}
                  <div className={styles.combineHint} style={{ marginTop: 12 }}>
                    {mergeResult.mechanic === 'physical_fit'      && 'The two pieces fit together.'}
                    {mergeResult.mechanic === 'combination_entry' && 'Use the sequence from this item on the lock.'}
                    {!mergeResult.mechanic                        && 'These items are connected.'}
                  </div>
                </div>
              )}
            </div>
            <button className={styles.backBtn} onClick={() => { setMergeResult(null); setSlotA(null); setSlotB(null) }}>
              ← Back to merge
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>

        {/* Panel header with tabs */}
        <div className={styles.panelHeader}>
          <div className={styles.headerLeft}>
            <span className={styles.panelTitle}>🎒 Kin Sack</span>
            <div className={styles.tabRow}>
              <button
                className={`${styles.tab} ${activeTab === 'items' ? styles.tabActive : ''}`}
                onClick={() => switchTab('items')}
              >
                Items
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'merge' ? styles.tabActive : ''}`}
                onClick={() => switchTab('merge')}
              >
                Merge
              </button>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* ── ITEMS TAB ── */}
        {activeTab === 'items' && (
          <>
            {loading && <div className={styles.loadingMsg}>Loading items…</div>}

            {!loading && items.length === 0 && (
              <div className={styles.emptyMsg}>
                <span className={styles.emptyIcon}>🎒</span>
                <p>Your Kin Sack is empty.</p>
                <p className={styles.emptyHint}>Items will appear as you explore and solve stages.</p>
              </div>
            )}

            {!loading && items.length > 0 && !selected && (
              <>
                <p className={styles.bagHint}>Tap an item to inspect it</p>
                <div className={styles.itemGrid}>
                  {items.map(item => (
                    <ItemThumb
                      key={item.id}
                      item={item}
                      onSelect={setSelected}
                      isDragTarget={false}
                      onDragStart={() => {}}
                      onDrop={() => {}}
                    />
                  ))}
                </div>
              </>
            )}

            {selected && (
              <div className={styles.itemDetail}>
                <div className={styles.detailHeader}>
                  <div className={styles.detailName}>{selected.name}</div>
                  <button className={styles.backBtn} onClick={() => setSelected(null)}>← Back</button>
                </div>
                <div className={styles.detailDesc}>{selected.description}</div>
                {(selected.droppedBy || selected.source) && (
                  <div className={styles.itemSource}>
                    <span className={styles.itemSourceIcon}>
                      {selected.source === 'character' ? '🧑' :
                       selected.source === 'location'  ? '📍' :
                       selected.source === 'puzzle'    ? '🧩' :
                       selected.source === 'scene'     ? '🎬' : '🎒'}
                    </span>
                    {selected.droppedBy
                      ? <span>Added by <strong>{selected.droppedBy}</strong></span>
                      : <span>{selected.sourceLabel}</span>}
                  </div>
                )}
                {renderItemContent(selected)}
                {selected.combinedWith && (
                  <div className={styles.combineHint}>
                    💡 This item can be combined. Try the Merge tab.
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* ── MERGE TAB ── */}
        {activeTab === 'merge' && (
          <div className={styles.mergeTab}>
            <p className={styles.mergeHint}>Choose a tool, then select an item to use it on.</p>

            <div className={styles.mergeSlots}>
              {/* Slot A */}
              <button
                className={`${styles.mergeSlot} ${slotA ? styles.mergeSlotFilled : ''}`}
                onClick={() => setPickingSlot('A')}
              >
                {slotA ? (
                  <>
                    <span className={styles.mergeSlotEmoji}>
                      {slotA.type === 'Physical_Key_001' ? '🗝️' :
                       slotA.type === 'Physical_Ribbon_001' ? '🎀' :
                       slotA.type?.startsWith('Readable_') ? '📄' :
                       slotA.type?.startsWith('Tool_') ? '🔧' : '📦'}
                    </span>
                    <span className={styles.mergeSlotName}>{slotA.name}</span>
                  </>
                ) : (
                  <span className={styles.mergeSlotEmpty}>+ Add item</span>
                )}
              </button>

              <span className={styles.mergePlus}>+</span>

              {/* Slot B */}
              <button
                className={`${styles.mergeSlot} ${slotB ? styles.mergeSlotFilled : ''} ${!slotA ? styles.mergeSlotDisabled : ''}`}
                onClick={() => slotA && setPickingSlot('B')}
                disabled={!slotA}
              >
                {slotB ? (
                  <>
                    <span className={styles.mergeSlotEmoji}>
                      {slotB.type === 'Physical_Key_001' ? '🗝️' :
                       slotB.type === 'Physical_Ribbon_001' ? '🎀' :
                       slotB.type?.startsWith('Readable_') ? '📄' :
                       slotB.type?.startsWith('Tool_') ? '🔧' : '📦'}
                    </span>
                    <span className={styles.mergeSlotName}>{slotB.name}</span>
                  </>
                ) : (
                  <span className={styles.mergeSlotEmpty}>
                    {slotA ? '+ Add item' : 'Choose first'}
                  </span>
                )}
              </button>
            </div>

            {/* Incompatible warning */}
            {slotA && slotB && !canCombine(slotA, slotB) && (
              <div className={styles.mergeIncompat}>These items don't interact.</div>
            )}

            <button
              className={styles.mergeBtn}
              disabled={!slotA || !slotB || !canCombine(slotA, slotB)}
              onClick={handleMerge}
            >
              Merge
            </button>

            {usedCombos.size > 0 && (
              <div className={styles.usedCombos}>
                <span className={styles.usedCombosLabel}>Already combined</span>
                {[...usedCombos].map(key => (
                  <span key={key} className={styles.usedComboTag}>{key.replace('+', ' + ')}</span>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}

// ─── UV Reveal mechanic ───────────────────────────────────────────────────────

function UVReveal({ item }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  function handleMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    setPos({ x: clientX - rect.left, y: clientY - rect.top })
  }

  const annotations = item.content?.hiddenAnnotations || []

  return (
    <div
      ref={ref}
      className={styles.uvContainer}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* Normal document */}
      <ManifestItem item={item} />
      {/* UV overlay — reveals hidden text where torch hovers */}
      <div
        className={styles.uvOverlay}
        style={{
          background: `radial-gradient(circle ${item.content?.beamRadius || 80}px at ${pos.x}px ${pos.y}px, rgba(168,85,247,0.18) 0%, transparent 70%)`,
        }}
      >
        {annotations.map((ann, i) => (
          <div key={i} className={styles.uvAnnotation}>
            <span className={styles.uvRef}>{ann.ref}</span>
            <span className={styles.uvNote}>{ann.note}</span>
          </div>
        ))}
      </div>
      <p className={styles.uvHint}>Move your finger / cursor to scan with UV light</p>
    </div>
  )
}

// ─── Cipher Wheel mechanic ────────────────────────────────────────────────────

function CipherReveal({ item }) {
  const [offset, setOffset] = useState(0)
  const hiddenText = item.content?.hiddenText || ''
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  function decode(text, shift) {
    return text.split('').map(c => {
      const i = alpha.indexOf(c.toUpperCase())
      if (i === -1) return c
      return alpha[(i + shift + 26) % 26]
    }).join('')
  }

  const decoded = decode(hiddenText, offset)

  return (
    <div className={styles.cipherContainer}>
      <div className={styles.cipherWheel}>
        <div className={styles.cipherOuter}>{alpha}</div>
        <div className={styles.cipherInner}>
          {alpha.split('').map((c, i) => alpha[(i + offset) % 26]).join('')}
        </div>
      </div>
      <div className={styles.cipherSlider}>
        <label>Rotation: {offset}</label>
        <input
          type="range" min={0} max={25} value={offset}
          onChange={e => setOffset(Number(e.target.value))}
          className={styles.slider}
        />
      </div>
      <div className={styles.cipherDecoded}>
        <span className={styles.cipherDecodedLabel}>Decoded:</span>
        <span className={styles.cipherDecodedText}>{decoded}</span>
      </div>
    </div>
  )
}

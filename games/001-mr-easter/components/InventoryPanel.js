// components/InventoryPanel.js
// Slide-out inventory bag panel. Triggered by bag icon in game header.
// Fetches session_items from Supabase via API on mount.
// Supports item detail view and combination mechanic (drag/tap one item onto another).

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

// ─── Main panel ───────────────────────────────────────────────────────────────

export default function InventoryPanel({ sessionId, isOpen, onClose, allItemDefs }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [dragging, setDragging] = useState(null)
  const [combinationResult, setCombinationResult] = useState(null)

  useEffect(() => {
    if (!isOpen) return

    // DEV MODE — show all items immediately without needing a solved stage
    if (DEV_MODE) {
      setItems(allItemDefs.filter(d => d.id))
      return
    }

    if (!sessionId) return
    setLoading(true)
    fetch(`/api/session-items?sessionId=${sessionId}`)
      .then(r => r.json())
      .then(data => {
        // data is array of { item_id, stage_given }
        // merge with full item definitions from allItemDefs
        const hydrated = (data || []).map(row => {
          const def = allItemDefs.find(d => d.id === row.item_id)
          return def ? { ...def, stage_given: row.stage_given } : null
        }).filter(Boolean)
        setItems(hydrated)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [isOpen, sessionId])

  function handleDrop(targetItem) {
    if (!dragging || dragging.id === targetItem.id) return
    tryCombine(dragging, targetItem)
  }

  function tryCombine(a, b) {
    // Check if either item combines with the other
    const combo = (a.combinedWith === b.id) ? a
                : (b.combinedWith === a.id) ? b
                : null
    if (!combo) {
      setCombinationResult({ type: 'fail', message: 'These items don\'t seem to interact.' })
      setTimeout(() => setCombinationResult(null), 2500)
      return
    }
    const partner = combo.id === a.id ? b : a
    setCombinationResult({ type: 'success', item: combo, partner, mechanic: combo.combinationMechanic })
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={e => e.stopPropagation()}>

        {/* Panel header */}
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>🎒 Kin Sack</span>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Combination result flash */}
        {combinationResult && (
          <div className={`${styles.comboResult} ${combinationResult.type === 'success' ? styles.comboSuccess : styles.comboFail}`}>
            {combinationResult.type === 'success'
              ? `✓ ${combinationResult.item.name} + ${combinationResult.partner.name} — combination triggered!`
              : combinationResult.message}
          </div>
        )}

        {loading && <div className={styles.loadingMsg}>Loading items…</div>}

        {!loading && items.length === 0 && (
          <div className={styles.emptyMsg}>
            <span className={styles.emptyIcon}>🎒</span>
            <p>Your Kin Sack is empty.</p>
            <p className={styles.emptyHint}>Items will appear as you explore and solve stages.</p>
          </div>
        )}

        {!loading && items.length > 0 && !selected && combinationResult?.type !== 'success' && (
          <>
            <p className={styles.bagHint}>Tap to inspect · Drag to combine · Items shared across your Kin</p>
            <div className={styles.itemGrid}>
              {items.map(item => (
                <ItemThumb
                  key={item.id}
                  item={item}
                  onSelect={setSelected}
                  isDragTarget={dragging && dragging.id !== item.id}
                  onDragStart={setDragging}
                  onDrop={handleDrop}
                />
              ))}
            </div>
          </>
        )}

        {/* Full combination reveal */}
        {combinationResult?.type === 'success' && (
          <div className={styles.combineReveal}>
            <div className={styles.combineRevealTitle}>
              {combinationResult.mechanic === 'uv' && '🔦 UV reveal'}
              {combinationResult.mechanic === 'cipher_overlay' && '⚙️ Cipher overlay'}
            </div>
            <div className={styles.combineRevealContent}>
              {combinationResult.mechanic === 'uv' && (
                <UVReveal item={combinationResult.item} />
              )}
              {combinationResult.mechanic === 'cipher_overlay' && (
                <CipherReveal item={combinationResult.item} />
              )}
            </div>
            <button className={styles.backBtn} onClick={() => { setCombinationResult(null); setDragging(null) }}>
              ← Back to bag
            </button>
          </div>
        )}

        {/* Item detail */}
        {selected && !combinationResult && (
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
                💡 Can be combined with another item in your bag
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

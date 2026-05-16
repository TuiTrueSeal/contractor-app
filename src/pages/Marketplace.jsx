import { useState, useEffect } from 'react'

// Supplier Marketplace — exclusive deals for TrueSeal contractors
// Suppliers advertise directly to verified NZ tradespeople
// Deals are time-limited, tier-gated, and linked to supplier purchase pages
// Agent: Hoko manages deal intake, supplier comms, and drop scheduling

const SUPPLIER_LOGOS = {
  sika: '🟡',
  viking: '🔵',
  ardex: '🟢',
  kingspan: '🟠',
  kattsafe: '🔴',
  'monkey-toe': '⚫',
  cohe: '🟣',
  equus: '🟤',
}

function CountdownTimer({ expiresAt }) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    function update() {
      const diff = new Date(expiresAt) - new Date()
      if (diff <= 0) { setTimeLeft('Expired'); return }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      setTimeLeft(h > 24 ? `${Math.floor(h/24)}d ${h%24}h` : `${h}h ${m}m`)
    }
    update()
    const t = setInterval(update, 60000)
    return () => clearInterval(t)
  }, [expiresAt])

  return <span className="countdown">⏱ {timeLeft} left</span>
}

function DealCard({ deal, contractorTier }) {
  const tierOrder = { Starter: 1, Journeyman: 2, Master: 3 }
  const locked = tierOrder[contractorTier] < tierOrder[deal.minTier]

  function handleClaim() {
    // Track click, then open supplier link
    fetch('/api/marketplace/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dealId: deal.id })
    })
    if (deal.whatsappNumber) {
      window.open(`https://wa.me/${deal.whatsappNumber}?text=${encodeURIComponent(deal.whatsappMessage)}`, '_blank')
    } else if (deal.link) {
      window.open(deal.link, '_blank')
    }
  }

  return (
    <div className={`deal-card ${deal.isDrop ? 'is-drop' : ''} ${locked ? 'locked' : ''}`}>
      {deal.isDrop && <div className="drop-badge">🔥 DROP</div>}
      {locked && <div className="locked-badge">🔒 {deal.minTier}+</div>}

      <div className="deal-header">
        <span className="supplier-logo">{SUPPLIER_LOGOS[deal.supplierId] || '🏷️'}</span>
        <div>
          <span className="supplier-name">{deal.supplierName}</span>
          {deal.expiresAt && <CountdownTimer expiresAt={deal.expiresAt} />}
        </div>
      </div>

      <div className="deal-body">
        <h3>{deal.title}</h3>
        <p>{deal.description}</p>

        <div className="deal-pricing">
          {deal.originalPrice && (
            <span className="original-price">${deal.originalPrice}</span>
          )}
          <span className="deal-price">${deal.price}</span>
          {deal.saving && (
            <span className="saving-badge">Save ${deal.saving}</span>
          )}
        </div>

        {deal.stock && (
          <p className="stock-info">📦 {deal.stock} left</p>
        )}
      </div>

      <button
        className={`btn-primary ${locked ? 'disabled' : ''}`}
        onClick={handleClaim}
        disabled={locked}
      >
        {locked
          ? `Unlock at ${deal.minTier}`
          : deal.whatsappNumber
            ? '💬 Order on WhatsApp'
            : '🛒 Get This Deal'
        }
      </button>
    </div>
  )
}

function SupplierStrip({ suppliers, activeId, onSelect }) {
  return (
    <div className="supplier-strip">
      <button
        className={activeId === 'all' ? 'active' : ''}
        onClick={() => onSelect('all')}
      >
        All
      </button>
      {suppliers.map(s => (
        <button
          key={s.id}
          className={activeId === s.id ? 'active' : ''}
          onClick={() => onSelect(s.id)}
        >
          {SUPPLIER_LOGOS[s.id] || '🏷️'} {s.name}
        </button>
      ))}
    </div>
  )
}

export default function Marketplace({ contractorId, contractorTier = 'Starter' }) {
  const [deals, setDeals] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [activeSupplier, setActiveSupplier] = useState('all')
  const [activeTab, setActiveTab] = useState('drops') // drops | all | saved
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDeals() {
      try {
        const res = await fetch(`/api/marketplace/deals?contractorId=${contractorId}`)
        const data = await res.json()
        setDeals(data.deals || [])
        setSuppliers(data.suppliers || [])
      } catch {
        const cached = localStorage.getItem('deals_cache')
        if (cached) setDeals(JSON.parse(cached))
      } finally {
        setLoading(false)
      }
    }
    fetchDeals()
  }, [contractorId])

  const filtered = deals
    .filter(d => activeSupplier === 'all' || d.supplierId === activeSupplier)
    .filter(d => {
      if (activeTab === 'drops') return d.isDrop
      if (activeTab === 'saved') return d.saved
      return true
    })

  const dropCount = deals.filter(d => d.isDrop).length

  if (loading) return <div className="page loading">Loading deals...</div>

  return (
    <div className="page marketplace">
      <header>
        <h2>🛒 Supplier Deals</h2>
        <p>Exclusive to TrueSeal contractors</p>
      </header>

      <div className="tab-bar">
        <button
          className={activeTab === 'drops' ? 'active' : ''}
          onClick={() => setActiveTab('drops')}
        >
          🔥 Drops {dropCount > 0 && <span className="badge">{dropCount}</span>}
        </button>
        <button
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => setActiveTab('all')}
        >
          All Deals
        </button>
        <button
          className={activeTab === 'saved' ? 'active' : ''}
          onClick={() => setActiveTab('saved')}
        >
          Saved
        </button>
      </div>

      <SupplierStrip
        suppliers={suppliers}
        activeId={activeSupplier}
        onSelect={setActiveSupplier}
      />

      <div className="deal-list">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>No {activeTab === 'drops' ? 'drops' : 'deals'} right now.</p>
            <p>Check back soon — new drops land weekly.</p>
          </div>
        ) : (
          filtered.map(deal => (
            <DealCard
              key={deal.id}
              deal={deal}
              contractorTier={contractorTier}
            />
          ))
        )}
      </div>

      <div className="marketplace-footer">
        <p>Deals are negotiated by TrueSeal directly with suppliers.</p>
        <p>Want to see a product here? <a href="mailto:stefan@trueseal.co.nz">Let us know.</a></p>
      </div>
    </div>
  )
}

import { useMemo, useState } from 'react'

const logoPath = '/Mukyslogo.jpeg'
const whatsappNumber = '254700000000'
const instagramUrl = 'https://www.instagram.com/muksbakeryandhotdeli/?__pwa=1#'
const tiktokUrl = 'https://www.tiktok.com/@mukysbakeryhotdeli?is_from_webapp=1&sender_device=pc'

const products = [
  { id: 1, name: 'Signature Chocolate Cake', category: 'Cakes', price: 1850, size: '6 inch', label: 'Muks pick', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85', occasions: ['Birthday', 'Anniversary'] },
  { id: 2, name: 'Salted Caramel Cupcakes', category: 'Cakes', price: 950, size: 'Box of 6', label: 'Customer favourite', image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=900&q=85', occasions: ['Birthday', 'Just Because'] },
  { id: 3, name: 'Butter Croissant Box', category: 'Pastries', price: 720, size: 'Box of 4', label: 'Fresh today', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85', occasions: ['Just Because', 'Graduation'] },
  { id: 4, name: 'Cinnamon Swirl Loaf', category: 'Bread', price: 480, size: '1 loaf', label: 'Baked daily', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85', occasions: ['Just Because', 'Anniversary'] },
  { id: 5, name: 'Red Velvet Celebration Cake', category: 'Cakes', price: 2400, size: '8 inch', label: 'For big moments', image: 'https://images.unsplash.com/photo-1614707267537-2b90c7c1f89a?auto=format&fit=crop&w=900&q=85', occasions: ['Wedding', 'Anniversary', 'Birthday'] },
  { id: 6, name: 'Choco Chip Cookie Jar', category: 'Cookies', price: 650, size: 'Jar of 12', label: 'Best seller', image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85', occasions: ['Just Because', 'Baby Shower'] },
  { id: 7, name: 'Mini Doughnut Party Box', category: 'Other', price: 880, size: 'Box of 12', label: 'Party ready', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85', occasions: ['Graduation', 'Baby Shower', 'Birthday'] },
  { id: 8, name: 'Vanilla Berry Dream Cake', category: 'Cakes', price: 2650, size: '8 inch', label: 'New', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85', occasions: ['Wedding', 'Baby Shower'] },
  { id: 9, name: 'Grand Vanilla Wedding Cake', category: 'Cakes', price: 7800, size: '2-tier · serves 40', label: 'Wedding showstopper', image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=85', occasions: ['Wedding'], feature: '2-tier' },
  { id: 10, name: 'Chocolate Mocha Anniversary Cake', category: 'Cakes', price: 6200, size: '2-tier · serves 30', label: 'Made for two', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85', occasions: ['Anniversary'], feature: '2-tier' },
  { id: 11, name: 'Red Velvet Birthday Tower', category: 'Cakes', price: 6900, size: '3-layer · serves 35', label: 'Birthday centrepiece', image: 'https://images.unsplash.com/photo-1614707267537-2b90c7c1f89a?auto=format&fit=crop&w=900&q=85', occasions: ['Birthday'], feature: '3-layer' },
]

const categories = ['All', 'Cakes', 'Pastries', 'Bread', 'Cookies', 'Other']
const occasions = [
  { name: 'Birthday', icon: '✦', note: 'Make their day sweeter', accent: 'orange' },
  { name: 'Graduation', icon: '✎', note: 'Big wins, fresh bakes', accent: 'brown' },
  { name: 'Wedding', icon: '♡', note: 'Made for forever', accent: 'cream' },
  { name: 'Baby Shower', icon: '✿', note: 'Tiny toes, big joy', accent: 'orange' },
  { name: 'Anniversary', icon: '∞', note: 'Celebrate your story', accent: 'brown' },
  { name: 'Just Because', icon: '☼', note: 'The best reason of all', accent: 'cream' },
]

const offers = [
  { tag: 'BIRTHDAY TREAT', title: 'Make the candles sweeter.', detail: 'Save 10% on any celebration cake or party box for a birthday order.', code: 'BIRTHDAY10', accent: 'orange', image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=900&q=85' },
  { tag: 'ANNIVERSARY DUO', title: 'Two hearts, one beautiful bake.', detail: 'Save KSh 500 when you pair a tiered cake with a celebration box.', code: 'LOVE500', accent: 'brown', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85' },
  { tag: 'WEDDING SEASON', title: 'Your big day deserves a big cake.', detail: 'Complimentary design consultation on 2-tier and 3-tier wedding cake enquiries.', code: 'SAYIDO', accent: 'cream', image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=85' },
]

const formatKES = (value) => `KSh ${value.toLocaleString('en-KE')}`

function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [activeOccasion, setActiveOccasion] = useState('')
  const [cart, setCart] = useState([])
  const [panel, setPanel] = useState(null)
  const [toast, setToast] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)

  const filteredProducts = useMemo(() => products.filter((product) => {
    const categoryMatch = activeCategory === 'All' || product.category === activeCategory
    const searchMatch = product.name.toLowerCase().includes(search.toLowerCase())
    const occasionMatch = !activeOccasion || product.occasions.includes(activeOccasion)
    return categoryMatch && searchMatch && occasionMatch
  }), [activeCategory, search, activeOccasion])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  const addToCart = (product) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id)
      if (found) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { ...product, quantity: 1 }]
    })
    showToast(`${product.name} added to your basket`)
  }

  const updateQuantity = (id, delta) => {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
  }

  const removeFromCart = (id) => setCart((current) => current.filter((item) => item.id !== id))

  const chooseOccasion = (occasion) => {
    setActiveOccasion(occasion)
    setActiveCategory('All')
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="site-shell">
      <div className="top-strip">
        <span>Fresh from our oven, made for your moment.</span>
        <span className="top-strip-detail">Pickup & delivery available · Nairobi</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Muks Bakery home">
          <img src={logoPath} alt="Muks Bakery logo" />
          <span className="brand-lockup"><strong>MUKS</strong><small>BAKERY & HOT DELIGHTS</small></span>
        </a>
        <nav className={`main-nav ${mobileMenu ? 'is-open' : ''}`}>
          <a href="#shop" onClick={() => setMobileMenu(false)}>Shop bakes</a>
          <a href="#occasions" onClick={() => setMobileMenu(false)}>Shop by occasion</a>
          <a href="#offers" onClick={() => setMobileMenu(false)}>Offers</a>
          <a href="#story" onClick={() => setMobileMenu(false)}>Our story</a>
          <a href="#visit" onClick={() => setMobileMenu(false)}>Visit us</a>
        </nav>
        <div className="header-actions">
          <div className="social-links"><a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Muks Bakery on Instagram">ig</a><a href={tiktokUrl} target="_blank" rel="noreferrer" aria-label="Muks Bakery on TikTok">tk</a></div><a className="header-whatsapp" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"><span>◌</span> WhatsApp</a>
          <button className="cart-button" onClick={() => setPanel('cart')} aria-label={`Open basket with ${cartCount} items`}><span className="cart-icon">▢</span><span>Basket</span><b>{cartCount}</b></button>
          <button className="menu-toggle" onClick={() => setMobileMenu((state) => !state)} aria-label="Toggle navigation">☰</button>
        </div>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> A little joy, freshly baked</p>
            <h1>Make today taste like a <em>celebration.</em></h1>
            <p className="hero-intro">From the first morning croissant to the cake that gets everyone talking — Muks Bakery brings warm, beautiful bakes to your table.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => scrollTo('shop')}>Browse the bakes <span>↗</span></button>
              <button className="text-button" onClick={() => setPanel('cake')}>Need a custom cake? <span>→</span></button>
            </div>
            <div className="hero-proof"><div className="proof-avatars"><span>JM</span><span>AK</span><span>+</span></div><p><strong>4.9/5</strong> from our sweet-toothed community</p></div>
          </div>
          <div className="hero-collage" aria-label="A selection of Muks Bakery bakes">
            <div className="hero-blob" />
            <div className="hero-image hero-image-main"><img src="https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=1000&q=85" alt="Layered celebration cake with berries" /><span className="image-tag">Baked with joy <i>✦</i></span></div>
            <div className="hero-image hero-image-small"><img src="https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=600&q=85" alt="Fresh pastries on a tray" /></div>
            <div className="hero-note"><span>Since</span><strong>2018</strong><span>made in<br />Nairobi</span></div>
            <div className="rolling-pin">〰</div>
          </div>
        </section>

        <section className="ticker" aria-label="Bakery promises"><div className="ticker-track"><span>FRESH DAILY</span><i>✦</i><span>LOCAL INGREDIENTS</span><i>✦</i><span>MADE WITH HEART</span><i>✦</i><span>FRESH DAILY</span><i>✦</i><span>LOCAL INGREDIENTS</span><i>✦</i><span>MADE WITH HEART</span><i>✦</i></div></section>

        <section className="occasion-section section-pad" id="occasions">
          <div className="section-heading split-heading"><div><p className="eyebrow">Start with the feeling</p><h2>What are you <em>celebrating?</em></h2></div><p className="section-description">Tell us the moment and we’ll point you to the bakes that belong in it.</p></div>
          <div className="occasion-row">{occasions.map((occasion) => <button key={occasion.name} className={`occasion-card ${occasion.accent}`} onClick={() => chooseOccasion(occasion.name)}><span className="occasion-icon">{occasion.icon}</span><strong>{occasion.name}</strong><small>{occasion.note}</small><span className="occasion-arrow">↗</span></button>)}</div>
        </section>

        <section className="offers-section section-pad" id="offers">
          <div className="section-heading split-heading"><div><p className="eyebrow">A little extra sweetness</p><h2>Promos, discounts<br /><em>& special offers.</em></h2></div><p className="section-description">Fresh reasons to order now — for the big days, the small wins and everything in between.</p></div>
          <div className="offers-grid">{offers.map((offer) => <article className={`offer-card ${offer.accent}`} key={offer.code}><div className="offer-card-image"><img src={offer.image} alt="" /><span>{offer.tag}</span></div><div className="offer-card-copy"><h3>{offer.title}</h3><p>{offer.detail}</p><div className="offer-code"><span>Use code</span><strong>{offer.code}</strong></div><button className="text-button" onClick={() => scrollTo('shop')}>Shop this offer <span>↗</span></button></div></article>)}</div>
          <p className="offers-note">Offers are subject to availability and advance booking. Mention the code when you message us on WhatsApp.</p>
        </section>

        <section className="shop-section section-pad" id="shop">
          <div className="shop-header"><div><p className="eyebrow">The Muks counter</p><h2>Good things, <em>ready when you are.</em></h2></div><button className="button button-outline" onClick={() => setPanel('box')}>Build a celebration box <span>+</span></button></div>
          <div className="shop-toolbar"><div className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search cakes, cookies, croissants..." aria-label="Search products" />{search && <button onClick={() => setSearch('')} aria-label="Clear search">×</button>}</div><div className="category-tabs" role="tablist">{categories.map((category) => <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}</div></div>
          {activeOccasion && <div className="active-filter"><span>Showing picks for <strong>{activeOccasion}</strong></span><button onClick={() => setActiveOccasion('')}>Clear occasion ×</button></div>}
          <div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} addToCart={addToCart} />)}</div>
          {filteredProducts.length === 0 && <div className="empty-state"><span>◌</span><h3>That bake is still in the oven.</h3><p>Try a different search or clear your occasion filter.</p><button className="button button-outline" onClick={() => { setSearch(''); setActiveOccasion(''); setActiveCategory('All') }}>Show all bakes</button></div>}
          <div className="shop-note"><span>Every order is baked fresh.</span><span>Need something extra special? <button onClick={() => setPanel('cake')}>Request a custom cake ↗</button></span></div>
        </section>

        <section className="feature-banner section-pad"><div className="feature-banner-inner"><div className="feature-banner-copy"><p className="eyebrow light">The easy way to share joy</p><h2>Build a box<br /><em>full of happy.</em></h2><p>Choose your size, pick the treats you love and let us pack the celebration.</p><button className="button button-light" onClick={() => setPanel('box')}>Build your box <span>↗</span></button></div><div className="box-visual"><div className="box-lid">MUKS</div><div className="box-fill"><span>🧁</span><span>🍪</span><span>🥐</span><span>🍩</span><span>🍰</span></div><span className="box-sparkle">✦</span></div></div></section>

        <section className="story-section section-pad" id="story"><div className="story-image"><img src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=900&q=85" alt="Baker preparing fresh dough" /><span className="story-stamp">Made nearby<br /><strong>with heart</strong></span></div><div className="story-copy"><p className="eyebrow">Our little corner of joy</p><h2>Good baking is<br /><em>good sharing.</em></h2><p>At Muks, we believe the best moments have something warm in the middle. We bake in small batches, use ingredients we’re proud of and make every order feel like it was made just for you.</p><p>Whether it’s a Tuesday treat or the cake for your biggest day, we’re here to make the moment a little more delicious.</p><a href="#visit" className="text-button">Meet us at the bakery <span>→</span></a><div className="story-signature">Muks Bakery <span>✦</span></div></div></section>

        <section className="gallery-section section-pad" id="gallery"><div className="section-heading"><p className="eyebrow">A peek inside the oven</p><h2>Made to be <em>shared.</em></h2></div><div className="gallery-grid"><div className="gallery-photo tall"><img src="https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&w=800&q=85" alt="Berry tart" /></div><div className="gallery-photo"><img src="https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=700&q=85" alt="Cupcakes decorated with frosting" /></div><div className="gallery-note"><span className="gallery-note-mark">✿</span><strong>Tag your<br />Muks moment</strong><small>@muksbakeryke</small></div><div className="gallery-photo"><img src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=700&q=85" alt="Freshly baked muffins" /></div><div className="gallery-photo wide"><img src="https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=85" alt="Pastries and coffee on a table" /></div></div></section>

        <section className="visit-section section-pad" id="visit"><div className="visit-card"><div><p className="eyebrow light">Come say hello</p><h2>Find your way<br /><em>to something good.</em></h2><div className="visit-details"><p><strong>Visit our bakery</strong><br />Kilimani, Nairobi<br />Mon–Sat · 7:00am–7:00pm</p><p><strong>Talk to a human</strong><br /><a href="tel:+254700000000">+254 700 000 000</a><br /><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">Chat on WhatsApp ↗</a></p></div></div><div className="map-card"><div className="map-pin">✦</div><span>MUKS<br /><small>BAKERY</small></span><div className="map-road one" /><div className="map-road two" /><div className="map-road three" /><a href="https://maps.google.com/?q=Kilimani+Nairobi" target="_blank" rel="noreferrer">Open in Maps ↗</a></div></div></section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><img src={logoPath} alt="Muks Bakery logo" /><div><strong>MUKS BAKERY</strong><span>Freshly baked joy, Nairobi.</span></div></div><div className="footer-links"><a href="#shop">Shop bakes</a><a href="#occasions">Occasions</a><a href="#offers">Offers</a><a href="#story">Our story</a><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a><a href={tiktokUrl} target="_blank" rel="noreferrer">TikTok</a><a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">WhatsApp</a></div><p>© 2026 Muks Bakery. Made with butter & heart.</p></footer>

      {panel === 'cart' && <CartDrawer cart={cart} total={cartTotal} updateQuantity={updateQuantity} removeFromCart={removeFromCart} onClose={() => setPanel(null)} onCheckout={() => setPanel('checkout')} onCake={() => setPanel('cake')} />}
      {panel === 'checkout' && <CheckoutModal cart={cart} total={cartTotal} onClose={() => setPanel(null)} onBack={() => setPanel('cart')} onComplete={() => { setCart([]); setPanel('success') }} />}
      {panel === 'success' && <SuccessModal onClose={() => setPanel(null)} />}
      {panel === 'cake' && <CakeModal onClose={() => setPanel(null)} onComplete={() => setPanel('success')} />}
      {panel === 'box' && <BoxModal products={products} onClose={() => setPanel(null)} onAdd={(boxItem) => { addToCart(boxItem); setPanel('cart') }} />}
      {toast && <div className="toast"><span>✓</span>{toast}</div>}
    </div>
  )
}

function ProductCard({ product, addToCart }) {
  return <article className="product-card"><div className="product-image"><img src={product.image} alt={product.name} /><span className="product-label">{product.label}</span><button className="quick-add" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to basket`}>+</button></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.category} · {product.size}</p></div><strong>{formatKES(product.price)}</strong></div></article>
}

function CartDrawer({ cart, total, updateQuantity, removeFromCart, onClose, onCheckout, onCake }) {
  return <div className="overlay"><aside className="side-drawer" aria-label="Your basket"><div className="panel-head"><div><p className="eyebrow">Your order</p><h2>The basket.</h2></div><button className="close-button" onClick={onClose}>×</button></div>{cart.length === 0 ? <div className="drawer-empty"><span>▢</span><h3>Your basket is waiting.</h3><p>Add a few fresh things and they’ll show up here.</p><button className="button button-primary" onClick={onClose}>Browse the bakes</button></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div className="cart-item-copy"><h3>{item.name}</h3><p>{formatKES(item.price)}</p><div className="quantity-control"><button onClick={() => updateQuantity(item.id, -1)}>−</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}>+</button></div></div><button className="remove-item" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}>×</button></div>)}</div><div className="drawer-summary"><div><span>Subtotal</span><strong>{formatKES(total)}</strong></div><small>Delivery fee, if applicable, is confirmed on WhatsApp.</small><button className="button button-primary full-width" onClick={onCheckout}>Continue to order <span>↗</span></button><button className="drawer-secondary" onClick={onCake}>Looking for a custom cake? <span>Request a quote →</span></button></div></>}</aside></div>
}

function CheckoutModal({ cart, total, onClose, onBack, onComplete }) {
  const [method, setMethod] = useState('pickup')
  const [submitted, setSubmitted] = useState(false)
  const [details, setDetails] = useState({ name: '', phone: '', address: '', notes: '' })
  const setField = (field, value) => setDetails((current) => ({ ...current, [field]: value }))
  const submit = (event) => { event.preventDefault(); setSubmitted(true) }
  const orderSummary = cart.map((item) => `${item.quantity} x ${item.name} (${formatKES(item.price * item.quantity)})`).join('\n')
  const whatsappMessage = `Hi Muks Bakery, I'm ${details.name || 'a customer'} and I'd like to confirm my order.\n\n${orderSummary}\n\nTotal: ${formatKES(total)}\nReceive by: ${method === 'pickup' ? 'Pickup from Kilimani' : `Delivery to ${details.address || 'my location'}`}\nPhone: ${details.phone || 'I will share my number here'}${details.notes ? `\nNote: ${details.notes}` : ''}`
  if (submitted) return <div className="overlay"><div className="modal success-modal"><button className="close-button" onClick={onClose}>×</button><div className="success-mark">✓</div><p className="eyebrow">Order received</p><h2>We’ll bake something <em>lovely.</em></h2><p className="success-copy">Thanks, {details.name || 'friend'}! Your order details are ready for the Muks team. We’ll confirm the timing and total with you on WhatsApp.</p><a className="button button-primary full-width" href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noreferrer">Continue on WhatsApp ↗</a><button className="text-button centered" onClick={onComplete}>Done</button></div></div>
  return <div className="overlay"><div className="modal checkout-modal"><div className="panel-head"><div><p className="eyebrow">Almost there</p><h2>Tell us where to send the joy.</h2></div><button className="close-button" onClick={onClose}>×</button></div><div className="checkout-layout"><form onSubmit={submit} className="order-form"><fieldset><legend>How would you like to receive it?</legend><div className="method-toggle"><button type="button" className={method === 'pickup' ? 'active' : ''} onClick={() => setMethod('pickup')}><span>⌂</span><strong>Pickup</strong><small>Collect from Kilimani</small></button><button type="button" className={method === 'delivery' ? 'active' : ''} onClick={() => setMethod('delivery')}><span>↗</span><strong>Delivery</strong><small>We’ll bring it to you</small></button></div></fieldset><div className="form-grid"><label>Full name<input required value={details.name} onChange={(event) => setField('name', event.target.value)} placeholder="Your name" /></label><label>Phone number<input required value={details.phone} onChange={(event) => setField('phone', event.target.value)} placeholder="07XX XXX XXX" /></label></div>{method === 'delivery' && <label>Delivery location<input required value={details.address} onChange={(event) => setField('address', event.target.value)} placeholder="Estate, building or landmark" /></label>}<label>Anything we should know? <span className="optional">optional</span><textarea value={details.notes} onChange={(event) => setField('notes', event.target.value)} placeholder="A note for the baker, preferred time, etc." rows="3" /></label><button className="button button-primary full-width" type="submit">Review & confirm <span>↗</span></button><button className="back-button" type="button" onClick={onBack}>← Back to basket</button></form><div className="order-review"><p className="eyebrow">Your basket</p>{cart.map((item) => <div className="review-line" key={item.id}><span>{item.quantity} × {item.name}</span><strong>{formatKES(item.price * item.quantity)}</strong></div>)}<div className="review-total"><span>Total</span><strong>{formatKES(total)}</strong></div><p className="review-note">No online payment needed. We’ll confirm your order and any delivery fee on WhatsApp.</p></div></div></div></div>
}

function SuccessModal({ onClose }) { return <div className="overlay"><div className="modal success-modal"><button className="close-button" onClick={onClose}>×</button><div className="success-mark">✦</div><p className="eyebrow">A little celebration</p><h2>Your request is with us.</h2><p className="success-copy">The Muks team will get back to you shortly with the next step. Thank you for choosing local, fresh and full of heart.</p><button className="button button-primary full-width" onClick={onClose}>Back to the bakery</button></div></div> }

function CakeModal({ onClose, onComplete }) {
  const [details, setDetails] = useState({ type: 'Chocolate', size: '1kg', occasion: 'Birthday', message: '' })
  const [fileName, setFileName] = useState('')
  const setField = (field, value) => setDetails((current) => ({ ...current, [field]: value }))
  const submitEnquiry = (event) => { event.preventDefault(); const message = `Hi Muks Bakery, I'd like a custom cake quote.\n\nCake: ${details.type}\nSize: ${details.size}\nOccasion: ${details.occasion}\nDesign notes: ${details.message || 'None yet'}\nInspiration file: ${fileName || 'None attached'}`; window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); onComplete() }
  return <div className="overlay"><div className="modal form-modal"><div className="panel-head"><div><p className="eyebrow">Make it yours</p><h2>Request a custom cake.</h2></div><button className="close-button" onClick={onClose}>×</button></div><p className="modal-intro">Tell us what you’re imagining and the Muks team will come back with a quote. Your selected inspiration file name is included in the WhatsApp handoff.</p><form className="order-form" onSubmit={submitEnquiry}><div className="form-grid"><label>Cake type<select value={details.type} onChange={(event) => setField('type', event.target.value)}><option>Chocolate</option><option>Vanilla</option><option>Red Velvet</option><option>Other</option></select></label><label>Size<select value={details.size} onChange={(event) => setField('size', event.target.value)}><option>0.5kg</option><option>1kg</option><option>1.5kg</option><option>2kg+</option></select></label></div><label>What are we celebrating?<select value={details.occasion} onChange={(event) => setField('occasion', event.target.value)}><option>Birthday</option><option>Wedding</option><option>Graduation</option><option>Anniversary</option><option>Baby Shower</option><option>Other</option></select></label><label>Tell us about the design<textarea rows="3" value={details.message} onChange={(event) => setField('message', event.target.value)} placeholder="Colours, flavours, name on the cake, anything you have in mind..." /></label><label className="file-drop"><input type="file" accept="image/*" onChange={(event) => setFileName(event.target.files?.[0]?.name || '')} /><span className="file-icon">↑</span><strong>{fileName || 'Upload inspiration'}</strong><small>{fileName ? 'Ready to share with the baker' : 'Optional · JPG or PNG'}</small></label><button className="button button-primary full-width" type="submit">Request a quote <span>↗</span></button></form></div></div>
}

function BoxModal({ products: allProducts, onClose, onAdd }) {
  const boxSizes = [{ name: 'The Little One', count: 4, price: 1400 }, { name: 'The Good One', count: 6, price: 2100 }, { name: 'The Big Celebration', count: 10, price: 3300 }]
  const [box, setBox] = useState(boxSizes[1])
  const [selected, setSelected] = useState([allProducts[1].id, allProducts[2].id])
  const boxProducts = allProducts.filter((product) => ['Cakes', 'Pastries', 'Cookies', 'Other'].includes(product.category)).slice(0, 6)
  const chooseBox = (size) => { setBox(size); setSelected((current) => current.slice(0, size.count)) }
  const toggle = (id) => setSelected((current) => { if (current.includes(id)) return current.filter((item) => item !== id); if (current.length >= box.count) return current; return [...current, id] })
  const estimated = box.price + Math.max(0, selected.length - 2) * 180
  const boxItem = { id: `box-${box.name}`, name: box.name, category: 'Celebration box', price: estimated, size: `${selected.length} treats`, label: 'Built for you', image: allProducts.find((product) => product.id === selected[0])?.image || boxProducts[0].image }
  return <div className="overlay"><div className="modal box-modal"><div className="panel-head"><div><p className="eyebrow">Your kind of celebration</p><h2>Build a celebration box.</h2></div><button className="close-button" onClick={onClose}>×</button></div><div className="box-size-row">{boxSizes.map((size) => <button key={size.name} className={box.name === size.name ? 'active' : ''} onClick={() => chooseBox(size)}><strong>{size.name}</strong><span>Up to {size.count} treats</span><b>{formatKES(size.price)}</b></button>)}</div><p className="box-helper">Pick up to {box.count} treats for your box. We’ll balance the final quantities with you on WhatsApp.</p><div className="box-picks">{boxProducts.map((product) => <button key={product.id} className={`box-pick ${selected.includes(product.id) ? 'selected' : ''}`} onClick={() => toggle(product.id)}><img src={product.image} alt="" /><span><strong>{product.name}</strong><small>{product.category}</small></span><i>{selected.includes(product.id) ? '✓' : '+'}</i></button>)}</div><div className="box-total"><div><span>Your box estimate</span><strong>{formatKES(estimated)}</strong></div><button className="button button-primary" onClick={() => onAdd(boxItem)}>Add box to basket <span>↗</span></button></div></div></div>
}

export default App

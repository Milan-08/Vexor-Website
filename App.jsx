import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [page, setPage] = useState('home');
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const productsRef = useRef(null);

  useEffect(() => {
    if (page === 'products' && productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [page]);

  return (
    <div className="min-h-screen bg-[#07060a] text-white relative overflow-hidden">
      <Navbar page={page} setPage={setPage} />
      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'products' && <Products ref={productsRef} setPage={setPage} setCheckoutProduct={setCheckoutProduct} />}
        {page === 'checkout' && checkoutProduct && <Checkout product={checkoutProduct} setPage={setPage} />}
        {page === 'team' && <Team />}
        {page === 'about' && <About />}
        {page === 'support' && <Support />}
      </main>
      <Footer />
    </div>
  );
}

function Navbar({ page, setPage }) {
  const btn = (id, label) => (
    <button onClick={() => setPage(id)} className={`px-3 py-2 text-sm rounded ${page === id ? 'bg-sky-600 text-black' : 'bg-white/5 hover:bg-white/10'}`}>{label}</button>
  );

  return (
    <header className="flex justify-between items-center px-8 py-4 border-b border-white/10 sticky top-0 bg-[#07060a]/80 backdrop-blur z-10">
      <div className="flex items-center gap-3">
        <img src="/vexorgg.png" alt="Vexor Logo" className="w-12 h-12" />
        <span className="text-2xl font-bold">Vexor <span className="text-sky-400">Softwares</span></span>
      </div>
      <nav className="flex gap-2">
        {btn('home','Home')}
        {btn('products','Products')}
        {btn('team','Our Team')}
        {btn('about','About Us')}
        {btn('support','Support')}
      </nav>
    </header>
  );
}

function Home({ setPage }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 className="text-5xl font-black tracking-wide">RULE THE GAME</h1>
        <p className="mt-4 text-white/70 text-lg leading-relaxed">
          High-quality digital products with secure access, dedicated support, and a creative team powering everything.
        </p>
        <div className="mt-6 flex gap-3">
          <button onClick={() => setPage('products')} className="px-6 py-3 bg-sky-600 text-black rounded-lg font-bold hover:scale-105 transition">
            View Products
          </button>
          <a href="https://discord.gg/vexorgg" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-white/10 rounded-lg hover:scale-105 transition">
            Join Discord
          </a>
        </div>
      </div>
    </section>
  );
}

function Products(props) {
  const products = [
    {
      name: 'Vexor Software Tool',
      image: '/product1.png',
      durations: [
        { label: '1 dag', price: 4.99 },
        { label: '1 week', price: 9.99 },
        { label: '1 maand', price: 14.99 },
        { label: 'Lifetime', price: 29.99 }
      ]
    },
    {
      name: 'Vexor Software Spoofer',
      image: '/product2.png',
      durations: [
        { label: '1 dag', price: 5.99 },
        { label: '1 week', price: 11.99 },
        { label: '1 maand', price: 19.99 },
        { label: 'Lifetime', price: 39.99 }
      ]
    }
  ];

  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(null);
  const selectedProduct = selectedProductIndex !== null ? products[selectedProductIndex] : null;
  const selectedDuration = selectedProduct && selectedDurationIndex !== null ? selectedProduct.durations[selectedDurationIndex] : null;

  return (
    <section ref={props.ref} className="space-y-8">
      <h2 className="text-4xl font-bold mb-6 tracking-wider">Our Products Bundle</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-3 md:w-1/4">
          {products.map((prod, idx) => (
            <button key={idx} onClick={() => { setSelectedProductIndex(idx); setSelectedDurationIndex(null); }} className={`p-4 rounded-lg border border-white/10 hover:bg-white/5 transition ${selectedProductIndex === idx ? 'bg-white/10' : ''}`}>
              {prod.name}
            </button>
          ))}
        </div>
        {selectedProduct && (
          <div className="flex-1 bg-[#0f0f1f]/80 backdrop-blur p-6 rounded-2xl border border-white/10 shadow-lg flex flex-col md:flex-row gap-6">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="rounded-lg border border-white/10 shadow-md w-full md:w-48" />
            <div className="flex-1 flex flex-col justify-between">
              <h3 className="text-2xl font-semibold mb-2">{selectedProduct.name}</h3>
              <div className="flex gap-2 mb-4">
                {selectedProduct.durations.map((dur, idx) => (
                  <button key={idx} onClick={() => setSelectedDurationIndex(idx)} className={`px-3 py-1 border rounded-lg ${selectedDurationIndex === idx ? 'bg-sky-600 text-black' : 'border-white/20 text-white'}`}>{dur.label} (€{dur.price})</button>
                ))}
              </div>
              <div className="text-white/70 mb-4">{selectedDuration ? `Check it: ${selectedDuration.label} (€${selectedDuration.price})` : 'Select a duration'}</div>
              <button
                onClick={() => { if(selectedDuration) { props.setCheckoutProduct({ name: selectedProduct.name, duration: selectedDuration.label, price: selectedDuration.price }); props.setPage('checkout'); }}}
                className="px-6 py-3 bg-sky-600 text-black rounded-lg font-bold hover:scale-105 transition"
              >Buy Now</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Checkout({ product, setPage }) {
  return (
    <section className="space-y-6">
      <h2 className="text-4xl font-bold mb-6 tracking-wider">Checkout</h2>
      <div className="bg-[#0f0f1f] p-8 rounded-2xl border border-white/10 shadow-lg">
        <h3 className="text-2xl font-semibold">{product.name}</h3>
        <p className="mt-2 text-white/70">Selected: {product.duration} (€{product.price})</p>
        <form className="mt-4 flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="p-3 rounded border border-white/20 bg-[#07060a] text-white" />
          <input type="email" placeholder="Your Email" className="p-3 rounded border border-white/20 bg-[#07060a] text-white" />
          <select className="p-3 rounded border border-white/20 bg-[#07060a] text-white">
            <option value="paypal">PayPal</option>
            <option value="litecoin">Litecoin</option>
          </select>
          <a href="https://paypal.me/vexorsoftwares" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-sky-600 text-black rounded-lg font-bold hover:scale-105 transition inline-block text-center">Pay with PayPal</a>
          <a href="https://paypal.me/vexorsoftwares" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-sky-600 text-black rounded-lg font-bold hover:scale-105 transition inline-block text-center">Pay with Litecoin (Placeholder)</a>
          <button type="button" onClick={() => setPage('products')} className="px-6 py-3 border border-white/10 rounded-lg hover:scale-105 transition">Cancel</button>
        </form>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="space-y-8">
      <h2 className="text-4xl font-bold mb-6 tracking-wider">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-[#0f0f1f] rounded-2xl border border-white/10 shadow-lg flex flex-col items-center text-center hover:scale-105 transition">
          <img src="/patron.png" alt="Patron" className="w-28 h-28 rounded-full border-2 border-sky-400 mb-4 shadow-md" />
          <h3 className="text-xl font-semibold">Patron</h3>
          <p className="text-white/70 mt-1">Owner</p>
          <ul className="mt-3 text-sm text-white/80 space-y-1">
            <li>• Spoofer creator</li>
            <li>• Designer</li>
            <li>• Website creator</li>
          </ul>
        </div>
        <div className="p-6 bg-[#0f0f1f] rounded-2xl border border-white/10 shadow-lg flex flex-col items-center text-center hover:scale-105 transition">
          <img src="/slome.png" alt="Slome" className="w-28 h-28 rounded-full border-2 border-sky-400 mb-4 shadow-md" />
          <h3 className="text-xl font-semibold">Slome</h3>
          <p className="text-white/70 mt-1">Owner</p>
          <ul className="mt-3 text-sm text-white/80 space-y-1">
            <li>• Cheat creator</li>
            <li>• Designer</li>
            <li>• Website creator</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="space-y-6">
      <h2 className="text-4xl font-bold mb-6 tracking-wider">About Us</h2>
      <div className="bg-[#07060a] p-8 rounded-2xl border border-white/10 shadow-lg text-white/80 hover:shadow-sky-500/30 transition">
        <p>At Vexor.gg, we believe everyone should have access to high-quality software without paying a fortune. We specialize in providing external software that is reliable, effective, and easy to use.</p>
        <p className="mt-3 leading-relaxed">Our mission is simple: deliver quality at a fair price. We carefully select our products to ensure our customers get only the best, with no hidden costs or hassle.</p>
        <p className="mt-4 leading-relaxed">At Vexor.gg, trust and customer satisfaction are at the heart of everything we do. Whether you’re a gamer, professional, or software enthusiast, we provide the tools that help you RULE THE GAME.</p>
        <p className="mt-5 leading-relaxed">Vexor.gg – quality software, smart choice.</p>
      </div>
    </section>
  );
}

function Support() {
  return (
    <section className="space-y-6">
      <h2 className="text-4xl font-bold mb-6 tracking-wider">Support</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#07060a] p-6 rounded-xl border border-white/10 shadow-md hover:shadow-sky-500/30 transition">
          <h3 className="font-semibold">Email Support</h3>
          <p className="mt-3 text-white/80">Send us a message:</p>
          <p className="mt-2"><a href="mailto:vexorsoftwares@gmail.com" className="text-sky-400">vexorsoftwares@gmail.com</a></p>
        </div>
        <div className="bg-[#07060a] p-6 rounded-xl border border-white/10 shadow-md hover:shadow-sky-500/30 transition">
          <h3 className="font-semibold">Discord</h3>
          <p className="mt-3">Join our Discord server for fast help:</p>
          <a href="https://discord.gg/vexorgg" className="inline-block mt-2 px-4 py-2 bg-sky-600 text-black rounded-lg hover:scale-105 transition">discord.gg/vexorgg</a>
        </div>
      </div>
    </section>
  );
}

function Footer() { return (<footer className="mt-12 py-6 text-center text-white/50 border-t border-white/10"><div>© {new Date().getFullYear()} Vexor Softwares</div></footer>); }
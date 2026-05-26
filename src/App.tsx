/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ShoppingBag, 
  MessageCircle, 
  Search, 
  ChevronRight, 
  Menu, 
  X,
  Sparkles,
  Library,
  Brain,
  Compass,
  Zap,
  Check,
  Plus,
  Trash2
} from 'lucide-react';

type Category = 'Psychology' | 'Spirituality' | 'Human Formation' | 'Natural Science';

interface Book {
  id: number;
  title: string;
  author: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  rating: number;
}

const BOOKS: Book[] = [
  // Psychology
  {
    id: 1,
    title: "The Architecture of Mind",
    author: "Dr. Julian Vance",
    category: 'Psychology',
    price: 15.99,
    description: "Deep dive into the modern cognitive structures and behavioral patterns that define us.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8
  },
  {
    id: 2,
    title: "Emotional Intelligence 2.0",
    author: "Sarah Jenkins",
    category: 'Psychology',
    price: 12.50,
    description: "Mastering the subtle art of empathy and self-awareness in a digital age.",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9
  },
  // Spirituality
  {
    id: 3,
    title: "Echoes of Silence",
    author: "Brother Isaiah",
    category: 'Spirituality',
    price: 18.00,
    description: "Finding tranquility and sacred purpose in a noisy world through ancient wisdom.",
    image: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7
  },
  {
    id: 4,
    title: "Pathways to the Divine",
    author: "Elena Vasquez",
    category: 'Spirituality',
    price: 14.99,
    description: "A comprehensive guide to meditative practices and cross-cultural spiritual growth.",
    image: "https://images.unsplash.com/photo-1532012197367-2d5970d20f1d?q=80&w=1000&auto=format&fit=crop",
    rating: 5.0
  },
  // Human Formation
  {
    id: 5,
    title: "Character & Competence",
    author: "Marcus Aurelius II",
    category: 'Human Formation',
    price: 22.00,
    description: "The definitive manual on building ethical foundations and leadership skills.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9
  },
  {
    id: 6,
    title: "The Disciplined Soul",
    author: "Grace Mbarga",
    category: 'Human Formation',
    price: 19.50,
    description: "Cultivating virtues that lead to a fulfilling life and impactful community presence.",
    image: "https://images.unsplash.com/photo-1524578271613-d550eeb6da00?q=80&w=1000&auto=format&fit=crop",
    rating: 4.6
  },
  // Natural Science
  {
    id: 7,
    title: "Quantum Landscapes",
    author: "Prof. Neil Degrasse",
    category: 'Natural Science',
    price: 25.00,
    description: "Breaking down the complex physics of our universe into beautiful poetic insights.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9
  },
  {
    id: 8,
    title: "The Green Frontier",
    author: "Dr. David Attenborough",
    category: 'Natural Science',
    price: 21.00,
    description: "Exploring biodiversity and the intricate systems that keep our planet breathing.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'All' | Category>('All');
  const [cart, setCart] = useState<Book[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (book: Book) => {
    if (!cart.find(item => item.id === book.id)) {
      setCart([...cart, book]);
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (bookId: number) => {
    setCart(cart.filter(item => item.id !== bookId));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const sendWhatsAppOrder = () => {
    const phone = "+237677672859";
    const bookList = cart.map(item => `- ${item.title} (${item.category})`).join('%0A');
    const message = `Hello Freedom from Ignorance! I would like to order the following books:%0A%0A${bookList}%0A%0ATotal: $${total.toFixed(2)}%0APlease let me know the next steps for payment and delivery.`;
    window.open(`https://wa.me/${phone.replace('+', '')}?text=${message}`, '_blank');
  };

  const filteredBooks = activeCategory === 'All' 
    ? BOOKS 
    : BOOKS.filter(b => b.category === activeCategory);

  const categories: ('All' | Category)[] = ['All', 'Psychology', 'Spirituality', 'Human Formation', 'Natural Science'];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center text-yellow-400 shadow-lg shadow-blue-200">
              <Library size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none text-blue-900 tracking-tight">Freedom from ignorance</h1>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-green-600">Premium Library</span>
            </div>
          </motion.div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-blue-900 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-yellow-400 text-blue-900 text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-blue-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-[120px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800/50 backdrop-blur-sm border border-blue-700 rounded-full text-yellow-400 text-sm font-medium mb-6"
            >
              <Sparkles size={16} />
              <span>Expanding Minds Across Cameroon & Beyond</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight"
            >
              Shatter the Chains <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-400">
                of Ignorance.
              </span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-blue-100/80 mb-10 leading-relaxed max-w-xl"
            >
              Curated literature in Psychology, Spirituality, and Science. Your bridge to profound human formation starts here.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h3 className="text-3xl font-bold text-blue-900 mb-2">Our Collection</h3>
              <p className="text-slate-500">Filter by category to find your next breakthrough read.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    activeCategory === cat 
                    ? 'bg-blue-700 text-white shadow-lg shadow-blue-200' 
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredBooks.map((book) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-blue-900 shadow-sm">
                      {book.category}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-1 text-yellow-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < Math.floor(book.rating) ? "currentColor" : "none"} />
                      ))}
                      <span className="text-xs font-bold text-slate-400 ml-1">{book.rating}</span>
                    </div>
                    <h4 className="text-lg font-bold text-blue-900 mb-1 group-hover:text-blue-700 transition-colors">{book.title}</h4>
                    <p className="text-sm text-slate-500 mb-4">{book.author}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-black text-blue-900">${book.price}</span>
                      <button 
                        onClick={() => addToCart(book)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          cart.find(c => c.id === book.id)
                          ? 'bg-green-600 text-white'
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white'
                        }`}
                      >
                        {cart.find(c => c.id === book.id) ? <Check size={20} /> : <Plus size={20} />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                  <ShoppingBag className="text-yellow-500" />
                  Your Order
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <X />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center pb-20">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                    <BookOpen size={40} />
                  </div>
                  <p className="text-slate-500 font-medium">Your selection is empty</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-blue-700 font-bold hover:underline"
                  >
                    Go choose some books
                  </button>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 bg-slate-50 rounded-2xl group">
                        <img src={item.image} className="w-20 h-24 object-cover rounded-lg shadow-sm" />
                        <div className="flex-grow">
                          <h5 className="font-bold text-blue-900 leading-tight">{item.title}</h5>
                          <p className="text-xs text-slate-500 mb-2 truncate max-w-[150px]">{item.category}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-blue-700 tracking-tight">${item.price}</span>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="p-1 px-2 text-rose-500 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-6 mt-8 mb-4">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-slate-500 font-medium">Total Balance Due</span>
                      <span className="text-3xl font-black text-blue-900 tracking-tighter">${total.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={sendWhatsAppOrder}
                      className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg shadow-green-100"
                    >
                      <MessageCircle size={20} />
                      Order via WhatsApp
                    </button>
                    <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">
                      Direct Delivery available in Cameroon
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-blue-900">
                  <Library size={20} />
                </div>
                <h5 className="text-xl font-bold">Freedom from ignorance</h5>
              </div>
              <p className="text-blue-200/60 leading-relaxed">
                Dedicated to providing high-quality literature that transforms minds and builds character across the nation and the globe.
              </p>
            </div>
            
            <div>
              <h6 className="font-bold mb-6 text-yellow-400 uppercase tracking-widest text-sm">Branches</h6>
              <ul className="space-y-4 text-blue-100/70">
                <li className="flex items-center gap-2 italic">Psycology & Behavioral Science</li>
                <li className="flex items-center gap-2 italic">Spirituality & Divinity</li>
                <li className="flex items-center gap-2 italic">Human Formation</li>
                <li className="flex items-center gap-2 italic">Natural Science Foundations</li>
              </ul>
            </div>

            <div>
              <h6 className="font-bold mb-6 text-yellow-400 uppercase tracking-widest text-sm">Reach Us</h6>
              <div className="space-y-4">
                <a href="tel:+237677672859" className="block text-blue-100 hover:text-white transition-colors">+237 677 672 859</a>
                <p className="text-blue-100/70">Cameroon & International</p>
                <div className="flex gap-4 pt-4">
                  <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center"><MessageCircle size={16} /></div>
                  <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center"><Sparkles size={16} /></div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-16 pt-8 text-center text-blue-400/50 text-sm">
            © {new Date().getFullYear()} Freedom from ignorance. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function Star({ size, fill, className }: { size: number; fill: string; className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={fill} 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = ({ addToCart }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setFeaturedProducts(data.slice(0, 4));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products', err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { name: 'Football', icon: '⚽', color: '#3b82f6', count: '120+ Products' },
    { name: 'Basketball', icon: '🏀', color: '#f59e0b', count: '85+ Products' },
    { name: 'Cricket', icon: '🏏', color: '#10b981', count: '64+ Products' },
    { name: 'Running', icon: '👟', color: '#ef4444', count: '210+ Products' },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">Gear up for greatness</span>
          <h1>Elevate Your Game With Premium Sports Gear</h1>
          <p>Discover top-tier equipment and apparel for athletes who never settle for less.</p>
          <div className="hero-btns">
            <Link to="/products" className="btn-primary">Shop All Products</Link>
            <Link to="/products?category=Shoes" className="btn-secondary">View Shoes</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200" alt="Athlete" />
        </div>
      </section>

      {/* Category Grid */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Shop by Sport</h2>
          <Link to="/products" className="view-all-link">View All</Link>
        </div>
        <div className="categories-grid">
          {categories.map((cat, i) => (
            <Link to={`/products?sport=${cat.name}`} key={i} className="category-box">
              <div className="cat-icon" style={{ backgroundColor: cat.color }}>{cat.icon}</div>
              <h3>{cat.name}</h3>
              <p>{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Gear</h2>
          <Link to="/products" className="view-all-link">View All</Link>
        </div>
        <div className="products-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            featuredProducts.map((p) => (
              <div key={p._id} className="product-card">
                <Link to={`/products/${p._id}`} className="p-img">
                  <img src={p.image || 'https://via.placeholder.com/400x300'} alt={p.name} />
                  <span className="p-badge">{p.brand}</span>
                </Link>
                <div className="p-info">
                  <h3>{p.name}</h3>
                  <div className="p-rating">
                    {'⭐'.repeat(Math.round(p.rating || 5))}
                    <span>({p.numReviews || 0})</span>
                  </div>
                  <div className="p-footer">
                    <span className="p-price">${p.price}</span>
                    <button className="add-btn" onClick={() => addToCart(p)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="promo-text">
          <h2>Summer Sale Is Live!</h2>
          <p>Get up to 50% off on all pro football gear and accessories.</p>
          <Link to="/products?category=Equipment" className="btn-white">Shop Sale Now</Link>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .home-container {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          padding-bottom: 4rem;
        }
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          background: #0f172a;
          border-radius: 2rem;
          padding: 4rem;
          color: white;
          overflow: hidden;
          align-items: center;
        }
        .hero-content h1 {
          font-size: 3.5rem;
          line-height: 1.1;
          margin: 1rem 0;
        }
        .hero-content p {
          font-size: 1.2rem;
          opacity: 0.8;
          margin-bottom: 2rem;
        }
        .hero-btns {
          display: flex;
          gap: 1rem;
        }
        .hero-image img {
          width: 100%;
          border-radius: 1.5rem;
          object-fit: cover;
          height: 400px;
        }
        .btn-primary {
          background: #3b82f6;
          color: white;
          padding: 1rem 2rem;
          border-radius: 999px;
          font-weight: 700;
          text-decoration: none;
        }
        .btn-secondary {
          background: rgba(255,255,255,0.1);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 1rem 2rem;
          border-radius: 999px;
          font-weight: 700;
          text-decoration: none;
        }
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .section-header h2 {
          font-size: 2rem;
          margin: 0;
        }
        .view-all-link {
          color: #3b82f6;
          font-weight: 700;
          text-decoration: none;
        }
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        .category-box {
          background: white;
          padding: 2rem;
          border-radius: 1.5rem;
          text-align: center;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          text-decoration: none;
          color: inherit;
        }
        .category-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          border-color: #3b82f6;
        }
        .cat-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin: 0 auto 1rem;
          color: white;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }
        .product-card {
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }
        .p-img {
          display: block;
          position: relative;
          height: 250px;
        }
        .p-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .p-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(255,255,255,0.9);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #1e293b;
        }
        .p-info {
          padding: 1.5rem;
        }
        .p-info h3 {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
        }
        .p-rating {
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 1rem;
        }
        .p-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .p-price {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
        }
        .add-btn {
          background: #0f172a;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 999px;
          font-weight: 600;
          cursor: pointer;
        }
        .promo-banner {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          border-radius: 2rem;
          padding: 4rem;
          color: white;
          text-align: center;
        }
        .btn-white {
          background: white;
          color: #1d4ed8;
          padding: 1rem 2.5rem;
          border-radius: 999px;
          font-weight: 800;
          display: inline-block;
          margin-top: 1.5rem;
          text-decoration: none;
        }
        @media (max-width: 768px) {
          .hero {
            grid-template-columns: 1fr;
            padding: 2rem;
          }
          .hero-content h1 {
            font-size: 2.5rem;
          }
        }
      `}} />
    </div>
  );
};

export default Home;
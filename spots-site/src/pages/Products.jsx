import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'

function Products({ addToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const location = useLocation()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const searchParams = new URLSearchParams(location.search)
        const sport = searchParams.get('sport')
        const category = searchParams.get('category')

        let url = 'http://localhost:5000/api/products'
        const params = new URLSearchParams()
        if (sport) params.append('sport', sport)
        if (category) params.append('category', category)

        const { data } = await axios.get(url, { params })
        setProducts(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching products', err)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [location.search])

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const queryTitle = new URLSearchParams(location.search).get('sport') ||
    new URLSearchParams(location.search).get('category') ||
    'All Sports Gear'

  return (
    <main className="layout">
      <Sidebar />
      <section className="content products-page">
        <div className="content-header">
          <div className="header-text">
            <h1>{queryTitle}</h1>
            <p className="results-count">{filteredProducts.length} items found</p>
          </div>
          <div className="header-actions">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Fetching the best gear for you...</p>
          </div>
        ) : (
          <div className="products-grid-full">
            {filteredProducts.length === 0 ? (
              <div className="no-results">
                <p>No products found matching your search.</p>
                <button onClick={() => setSearchTerm('')} className="btn-secondary">Clear Search</button>
              </div>
            ) : (
              filteredProducts.map((p) => (
                <div key={p._id} className="product-card-premium">
                  <Link to={`/products/${p._id}`} className="p-card-img">
                    <img src={p.image || 'https://via.placeholder.com/400x300'} alt={p.name} />
                    {p.countInStock < 5 && p.countInStock > 0 && <span className="stock-badge">Low Stock</span>}
                  </Link>
                  <div className="p-card-info">
                    <div className="p-card-top">
                      <span className="p-card-brand">{p.brand}</span>
                      <div className="p-card-rating">⭐ {p.rating || 5.0}</div>
                    </div>
                    <h3>{p.name}</h3>
                    <p className="p-card-desc">
                      {p.description && p.description.length > 50
                        ? p.description.substring(0, 50).trim() + '...'
                        : p.description}
                    </p>
                    <div className="p-card-bottom">
                      <div className="p-card-price-group">
                        <span className="p-card-price">${p.price}</span>
                      </div>
                      <button className="add-to-cart-btn" onClick={() => addToCart(p)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .products-page {
          background: #fff;
        }
        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #f1f5f9;
        }
        .results-count {
          color: #64748b;
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }
        .search-box {
          position: relative;
          width: 300px;
        }
        .search-box input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border-radius: 999px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          font-family: inherit;
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
        }
        .products-grid-full {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }
        .product-card-premium {
          background: #fff;
          border-radius: 1.25rem;
          border: 1px solid #eef2f6;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }
        .product-card-premium:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          border-color: #3b82f6;
        }
        .p-card-img {
          height: 220px;
          display: block;
          position: relative;
          overflow: hidden;
        }
        .p-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .product-card-premium:hover .p-card-img img {
          transform: scale(1.1);
        }
        .stock-badge {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: #ef4444;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.7rem;
          font-weight: 700;
        }
        .p-card-info {
          padding: 1.25rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .p-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        .p-card-brand {
          font-size: 0.75rem;
          font-weight: 800;
          color: #3b82f6;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .p-card-rating {
          font-size: 0.8rem;
          font-weight: 700;
          color: #f59e0b;
        }
        .p-card-info h3 {
          font-size: 1.1rem;
          margin: 0 0 0.5rem;
          color: #1e293b;
        }
        .p-card-desc {
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 1.25rem;
          line-height: 1.5;
        }
        .p-card-bottom {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .p-card-price {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
        }
        .add-to-cart-btn {
          background: #0f172a;
          color: white;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 0.75rem;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .add-to-cart-btn:hover {
          background: #3b82f6;
        }
        .loading-state {
          padding: 5rem;
          text-align: center;
          color: #64748b;
        }
        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 5rem;
          background: #f8fafc;
          border-radius: 1.5rem;
        }
        @media (max-width: 640px) {
          .content-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }
          .search-box {
            width: 100%;
          }
        }
      `}} />
    </main>
  )
}

export default Products

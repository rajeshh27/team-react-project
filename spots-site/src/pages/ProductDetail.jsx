import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function ProductDetail({ addToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
        setProduct(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching product', err)
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return <div className="loading">Loading product...</div>
  if (!product) return <div className="error">Product not found.</div>

  return (
    <main className="layout">
      <div className="product-detail-container">
        <Link to="/products" className="back-link">← Back to Products</Link>
        <div className="product-detail-grid">
          <div className="product-visual">
            <img src={product.image || 'https://via.placeholder.com/600x600'} alt={product.name} />
          </div>
          <div className="product-info-details">
            <span className="p-brand">{product.brand}</span>
            <h1>{product.name}</h1>
            <div className="p-rating">
              {'⭐'.repeat(Math.round(product.rating || 5))}
              <span>({product.numReviews} Reviews)</span>
            </div>
            <p className="p-price-large">${product.price}</p>
            <div className="p-meta">
              <p><strong>Sport:</strong> {product.sport}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Status:</strong> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
            </div>
            <div className="p-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            {product.countInStock > 0 && (
              <button className="add-btn-large" onClick={() => addToCart(product)}>Add to Your Cart</button>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .product-detail-container {
          background: white;
          padding: 2rem;
          border-radius: 2rem;
          border: 1px solid #e2e8f0;
        }
        .back-link {
          display: inline-block;
          margin-bottom: 2rem;
          color: #64748b;
          text-decoration: none;
          font-weight: 600;
        }
        .product-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }
        .product-visual img {
          width: 100%;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .p-brand {
          font-weight: 700;
          color: #3b82f6;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 0.5rem;
        }
        .product-info-details h1 {
          font-size: 2.5rem;
          margin: 0 0 1rem;
        }
        .p-price-large {
          font-size: 2rem;
          font-weight: 800;
          margin: 1.5rem 0;
          color: #0f172a;
        }
        .p-meta {
          margin-bottom: 2rem;
          display: grid;
          gap: 0.5rem;
          color: #64748b;
        }
        .p-description {
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .add-btn-large {
          width: 100%;
          background: #0f172a;
          color: white;
          padding: 1.25rem;
          border-radius: 999px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .add-btn-large:hover {
          transform: scale(1.02);
        }
        @media (max-width: 800px) {
          .product-detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </main>
  )
}

export default ProductDetail


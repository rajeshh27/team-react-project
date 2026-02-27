function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-card-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
        />
      </div>

      <div className="product-card-body">
        {product.category && (
          <span className="product-card-badge">{product.category}</span>
        )}

        <h3 className="product-card-name">{product.name}</h3>
        {product.description && (
          <p className="product-card-description">{product.description}</p>
        )}

        <div className="product-card-footer">
          <span className="product-card-price">${product.price}</span>
          <button className="product-card-btn">
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard


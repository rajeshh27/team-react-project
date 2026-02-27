import { Link } from 'react-router-dom'

function Cart({ cartItems, removeFromCart }) {
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0)

  return (
    <main className="layout">
      <section className="content cart-container">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/products" className="btn-primary">Browse Products</Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-sport">{item.sport}</p>
                    <p className="item-qty">Qty: {item.qty}</p>
                  </div>
                  <div className="item-price">
                    <span>${(item.price * item.qty).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item._id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Link to="/payment" className="checkout-btn">Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .cart-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        .empty-cart {
          text-align: center;
          padding: 4rem;
        }
        .cart-content {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 2rem;
          margin-top: 2rem;
        }
        .cart-item {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .item-img {
          width: 120px;
          height: 120px;
          border-radius: 1rem;
          overflow: hidden;
        }
        .item-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .item-details h3 {
          margin: 0 0 0.5rem;
        }
        .item-sport {
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }
        .item-qty {
          font-size: 0.9rem;
        }
        .item-price {
          margin-left: auto;
          text-align: right;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .item-price span {
          font-weight: 800;
          font-size: 1.2rem;
        }
        .item-price button {
          background: none;
          border: none;
          color: #ef4444;
          font-size: 0.85rem;
          cursor: pointer;
          font-weight: 700;
          box-shadow: none;
          padding: 0;
        }
        .cart-summary {
          background: #f8fafc;
          padding: 2rem;
          border-radius: 1.5rem;
          height: fit-content;
          border: 1px solid #e2e8f0;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          color: #64748b;
        }
        .summary-row.total {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e2e8f0;
          color: #0f172a;
          font-weight: 800;
          font-size: 1.25rem;
        }
        .checkout-btn {
          display: block;
          width: 100%;
          background: #3b82f6;
          color: white;
          text-align: center;
          padding: 1rem;
          border-radius: 999px;
          font-weight: 700;
          margin-top: 2rem;
          text-decoration: none;
        }
        @media (max-width: 800px) {
          .cart-content {
            grid-template-columns: 1fr;
          }
        }
      `}} />
    </main>
  )
}

export default Cart


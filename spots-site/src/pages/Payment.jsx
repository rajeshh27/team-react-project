import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Payment({ cartItems, clearCart }) {
  const [isPaid, setIsPaid] = useState(false)
  const navigate = useNavigate()
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0)

  const handlePay = (e) => {
    e.preventDefault()
    setIsPaid(true)
    setTimeout(() => {
      clearCart()
      navigate('/')
    }, 3000)
  }

  if (isPaid) {
    return (
      <main className="layout">
        <section className="content success-msg">
          <div className="success-icon">✅</div>
          <h1>Payment Successful!</h1>
          <p>Thank you for your purchase. We've received your order.</p>
          <p>Redirecting you to home page...</p>
        </section>
        <style dangerouslySetInnerHTML={{
          __html: `
          .success-msg {
            text-align: center;
            padding: 5rem;
          }
          .success-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
          }
        `}} />
      </main>
    )
  }

  return (
    <main className="layout">
      <section className="content payment-container">
        <h1>Payment</h1>
        <div className="payment-summary">
          <p>Total to pay: <strong>${totalPrice.toFixed(2)}</strong></p>
        </div>
        <form className="payment-form" onSubmit={handlePay}>
          <label>
            Cardholder Name
            <input type="text" placeholder="John Doe" required />
          </label>
          <label>
            Card number
            <input type="text" placeholder="1234 5678 9012 3456" required />
          </label>
          <div className="payment-form__row">
            <label>
              Expiry
              <input type="text" placeholder="MM/YY" required />
            </label>
            <label>
              CVV
              <input type="password" placeholder="123" required />
            </label>
          </div>
          <button type="submit" className="pay-btn">Complete Payment</button>
        </form>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .payment-container {
          max-width: 600px;
          margin: 0 auto;
        }
        .payment-summary {
          background: #f1f5f9;
          padding: 1rem;
          border-radius: 0.75rem;
          margin-bottom: 2rem;
          border-left: 4px solid #3b82f6;
        }
        .pay-btn {
          width: 100%;
          background: #3b82f6;
          color: white;
          padding: 1rem;
          border-radius: 999px;
          font-weight: 700;
          margin-top: 2rem;
        }
        .payment-form__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
      `}} />
    </main>
  )
}

export default Payment


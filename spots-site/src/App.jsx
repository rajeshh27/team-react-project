import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Payment from './pages/Payment.jsx'
import Profile from './pages/Profile.jsx'

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cartItems')) || [])
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((x) => x._id === product._id)
      if (exist) {
        return prev.map((x) => x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x)
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((x) => x._id !== id))
  }

  const clearCart = () => setCartItems([])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <div className="app-shell">
      <Nav user={user} onLogout={handleLogout} cartCount={cartItems.reduce((a, c) => a + c.qty, 0)} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/products" element={<Products addToCart={addToCart} />} />
        <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
        <Route path="/account/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/account/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/payment" element={<Payment cartItems={cartItems} clearCart={clearCart} />} />
        <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

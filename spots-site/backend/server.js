import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = 'mongodb+srv://Rajesh:rajesh27@cluster0.ky85dkd.mongodb.net/?appName=Cluster0'
const JWT_SECRET = 'your_jwt_secret_key_123'

app.use(cors())
app.use(express.json())

// --- Schemas ---

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sport: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  brand: { type: String },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  countInStock: { type: Number, default: 10 },
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

// --- Auth Middleware ---

const protect = async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }
  if (!token) res.status(401).json({ message: 'Not authorized, no token' })
}

// --- Routes ---

// Health Check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// Auth Routes
app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) return res.status(400).json({ message: 'User already exists' })

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({ name, email, password: hashedPassword })
  if (user) {
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' })
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token })
  } else {
    res.status(400).json({ message: 'Invalid user data' })
  }
})

app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' })
    res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, token })
  } else {
    res.status(401).json({ message: 'Invalid email or password' })
  }
})

// User Profile
app.get('/api/users/profile', protect, async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin })
  } else {
    res.status(404).json({ message: 'User not found' })
  }
})

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const { category, sport, search } = req.query
    let query = {}
    if (category) query.category = category
    if (sport) query.sport = sport
    if (search) query.name = { $regex: search, $options: 'i' }

    const products = await Product.find(query).lean()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products' })
  }
})

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean()
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product' })
  }
})

// --- Server Start ---

async function start() {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected to Atlas')
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()


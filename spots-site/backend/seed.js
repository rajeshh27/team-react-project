import mongoose from 'mongoose'

const MONGO_URI = 'mongodb+srv://Rajesh:rajesh27@cluster0.ky85dkd.mongodb.net/?appName=Cluster0'

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

const products = [
    {
        name: 'Nike Air Max 270',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        description: 'The Nike Air Max 270 is a lifestyle shoe from Nike that was first released in 2018.',
        brand: 'Nike',
        category: 'Shoes',
        sport: 'Running',
        price: 150.00,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Wilson NFL Football',
        image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80&w=800',
        description: 'Official NFL Game Football from Wilson. Extra grip and durability.',
        brand: 'Wilson',
        category: 'Equipment',
        sport: 'Football',
        price: 99.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
    },
    {
        name: 'Spalding NBA Basketball',
        image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=800',
        description: 'Official size and weight basketball. Excellent grip for indoor and outdoor play.',
        brand: 'Spalding',
        category: 'Equipment',
        sport: 'Basketball',
        price: 39.99,
        countInStock: 5,
        rating: 3,
        numReviews: 12,
    },
    {
        name: 'Adidas FIFA World Cup Ball',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800',
        description: 'Official match ball for the FIFA World Cup. Top-tier performance.',
        brand: 'Adidas',
        category: 'Equipment',
        sport: 'Soccer',
        price: 130.00,
        countInStock: 11,
        rating: 5,
        numReviews: 10,
    },
    {
        name: 'Gray-Nicolls Cricket Bat',
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800',
        description: 'Premium quality english willow cricket bat. Professional choice.',
        brand: 'Gray-Nicolls',
        category: 'Equipment',
        sport: 'Cricket',
        price: 299.99,
        countInStock: 7,
        rating: 4.5,
        numReviews: 12,
    },
    {
        name: 'Under Armour Tech Tee',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
        description: 'Soft, natural feel for unrivaled comfort. Moisture Transport System wicks sweat.',
        brand: 'Under Armour',
        category: 'Apparel',
        sport: 'Training',
        price: 24.99,
        countInStock: 20,
        rating: 4.0,
        numReviews: 15,
    },
    {
        name: 'Nike Vapor Edge Elite',
        image: 'https://images.unsplash.com/photo-1511746015097-c77adbc279bc?auto=format&fit=crop&q=80&w=800',
        description: 'Designed for the speediest players on the field. Lightweight and responsive.',
        brand: 'Nike',
        category: 'Shoes',
        sport: 'Football',
        price: 200.00,
        countInStock: 5,
        rating: 4.8,
        numReviews: 22,
    },
    {
        name: 'Yoga Mat Pro',
        image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&q=80&w=800',
        description: 'Ultra-thick non-slip yoga mat for maximum support and comfort.',
        brand: 'Lululemon',
        category: 'Accessories',
        sport: 'Yoga',
        price: 68.00,
        countInStock: 15,
        rating: 4.7,
        numReviews: 45,
    },
    {
        name: 'Kookaburra Cricket Ball',
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800',
        description: 'Professional grade cricket ball used in international matches.',
        brand: 'Kookaburra',
        category: 'Equipment',
        sport: 'Cricket',
        price: 45.00,
        countInStock: 30,
        rating: 4.6,
        numReviews: 18,
    },
    {
        name: 'Puma Training Shorts',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=800',
        description: 'Breathable training shorts with stay-dry technology.',
        brand: 'Puma',
        category: 'Apparel',
        sport: 'Training',
        price: 29.99,
        countInStock: 25,
        rating: 4.2,
        numReviews: 30,
    },
    {
        name: 'Speedo Swim Goggles',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
        description: 'Anti-fog performance goggles for competitive swimmers.',
        brand: 'Speedo',
        category: 'Accessories',
        sport: 'Swimming',
        price: 19.99,
        countInStock: 40,
        rating: 4.4,
        numReviews: 50,
    },
    {
        name: 'Babolat Pure Drive',
        image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&q=80&w=800',
        description: 'Power and versatility redefined. The legendary Babolat tennis racket.',
        brand: 'Babolat',
        category: 'Equipment',
        sport: 'Tennis',
        price: 229.00,
        countInStock: 8,
        rating: 4.9,
        numReviews: 35
    }
]

async function seed() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('Connected to MongoDB')

        await Product.deleteMany({})
        console.log('Cleared existing products')

        await Product.insertMany(products)
        console.log('Seeded products successfully')

        process.exit()
    } catch (error) {
        console.error('Error seeding data', error)
        process.exit(1)
    }
}

seed()

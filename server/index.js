import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// Create Stripe checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { priceId } = req.body

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: priceId.includes('lifetime') ? 'payment' : 'subscription',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      billing_address_collection: 'required',
    })

    res.json({ id: session.id, url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    res.status(500).json({ error: error.message })
  }
})

// Stripe webhook handler
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      console.log('Payment successful:', session.id)
      // TODO: Update user subscription in database
      break

    case 'customer.subscription.deleted':
      const subscription = event.data.object
      console.log('Subscription cancelled:', subscription.id)
      // TODO: Update user subscription status in database
      break

    case 'invoice.payment_failed':
      const invoice = event.data.object
      console.log('Payment failed:', invoice.id)
      // TODO: Handle failed payment
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  res.json({ received: true })
})

// Get customer portal
app.post('/api/create-portal-session', async (req, res) => {
  try {
    const { customerId } = req.body

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.CLIENT_URL}/profile`,
    })

    res.json({ url: session.url })
  } catch (error) {
    console.error('Error creating portal session:', error)
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📝 Stripe webhook endpoint: http://localhost:${PORT}/api/webhook`)
})
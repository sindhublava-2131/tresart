import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get Cart
router.get('/', auth, async (req, res) => {
  try {
    await req.user.populate('cart.productId');
    res.send(req.user.cart);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add to Cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = req.user.cart.find(item => item.productId.toString() === productId);

    if (cartItem) {
      cartItem.quantity += quantity || 1;
    } else {
      req.user.cart.push({ productId, quantity: quantity || 1 });
    }

    await req.user.save();
    await req.user.populate('cart.productId');
    res.send(req.user.cart);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update Quantity
router.put('/update', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartItem = req.user.cart.find(item => item.productId.toString() === productId);

    if (!cartItem) {
      return res.status(404).send({ error: 'Item not in cart' });
    }

    cartItem.quantity = quantity;
    if (cartItem.quantity <= 0) {
      req.user.cart = req.user.cart.filter(item => item.productId.toString() !== productId);
    }

    await req.user.save();
    await req.user.populate('cart.productId');
    res.send(req.user.cart);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Remove from Cart
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    req.user.cart = req.user.cart.filter(item => 
      (item.productId && item.productId.toString() !== req.params.productId) && 
      item._id.toString() !== req.params.productId
    );
    await req.user.save();
    await req.user.populate('cart.productId');
    res.send(req.user.cart);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Clear Cart (After Checkout)
router.post('/clear', auth, async (req, res) => {
  try {
    req.user.cart = [];
    await req.user.save();
    res.send({ message: 'Cart cleared' });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;

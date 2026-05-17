import express from 'express';
import Product from '../models/Product.js';
import CustomImage from '../models/CustomImage.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Upload customizer reference image
router.post('/custom/upload', async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).send({ error: 'No image data provided' });
    }
    const newImage = new CustomImage({ image });
    await newImage.save();
    res.status(201).send({ id: newImage._id });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Retrieve customizer reference image
router.get('/custom/image/:id', async (req, res) => {
  try {
    const item = await CustomImage.findById(req.params.id);
    if (!item) {
      return res.status(404).send('Not Found');
    }
    
    const matches = item.image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).send('Invalid image data format');
    }
    
    const contentType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
    
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': buffer.length,
      'Cache-Control': 'public, max-age=31536000'
    });
    res.end(buffer);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;

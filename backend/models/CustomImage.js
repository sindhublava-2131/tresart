import mongoose from 'mongoose';

const customImageSchema = new mongoose.Schema({
  image: {
    type: String, // Base64 data string (e.g. data:image/png;base64,...)
    required: true
  }
}, { timestamps: true });

const CustomImage = mongoose.model('CustomImage', customImageSchema);
export default CustomImage;

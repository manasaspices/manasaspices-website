import mongoose from 'mongoose';

const assetsSchema = new mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      home_slides:{ type: [String], required: true},
});

export default mongoose.models.assets || mongoose.model('assets',assetsSchema);
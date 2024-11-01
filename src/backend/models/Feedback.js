import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  orchidId: { type: mongoose.Schema.Types.ObjectId, ref: 'Orchid', required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback; 
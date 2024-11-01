import Orchid from '../models/Orchid';
import Feedback from '../models/Feedback';

// Get all orchids
export const getAllOrchids = async (req, res) => {
  try {
    const orchids = await Orchid.find();
    res.json(orchids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orchid by ID
export const getOrchidById = async (req, res) => {
  try {
    const orchid = await Orchid.findById(req.params.id);
    if (!orchid) return res.status(404).json({ message: 'Orchid not found' });
    res.json(orchid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search orchids by name
export const searchOrchids = async (req, res) => {
  const { name } = req.query;
  try {
    const orchids = await Orchid.find({ name: { $regex: name, $options: 'i' } });
    res.json(orchids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Filter orchids by category
export const filterOrchidsByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    const orchids = await Orchid.find({ category });
    res.json(orchids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Post feedback for an orchid
export const postFeedback = async (req, res) => {
  const { rating, comment } = req.body;
  const orchidId = req.params.id;
  const author = req.user.email; // Lấy email người dùng từ thông tin đăng nhập

  try {
    // Tìm loài lan
    const orchid = await Orchid.findById(orchidId);
    if (!orchid) {
      return res.status(404).json({ message: 'Không tìm thấy loài lan' });
    }

    // Kiểm tra xem người dùng đã phản hồi chưa
    const existingFeedback = orchid.feedback.find(f => f.author === author);
    if (existingFeedback) {
      return res.status(400).json({ message: 'Bạn đã phản hồi cho loài lan này rồi' });
    }

    // Thêm phản hồi mới
    orchid.feedback.push({
      rating,
      comment,
      author,
      date: new Date()
    });

    // Cập nhật điểm đánh giá trung bình
    const totalRating = orchid.feedback.reduce((sum, fb) => sum + fb.rating, 0);
    orchid.rating = totalRating / orchid.feedback.length;

    await orchid.save();
    res.status(201).json(orchid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get feedback for an orchid
export const getFeedbackByOrchidId = async (req, res) => {
  try {
    const orchid = await Orchid.findById(req.params.id);
    if (!orchid) {
      return res.status(404).json({ message: 'Không tìm thấy loài lan' });
    }
    res.status(200).json(orchid.feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
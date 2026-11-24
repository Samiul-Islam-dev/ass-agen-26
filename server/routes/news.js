import express from 'express';
import News from '../models/News.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// GET /api/news?category=&q=&limit=
router.get('/', async (req, res) => {
  try {
    const { category, q, limit } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (q) filter.title = { $regex: q, $options: 'i' };
    let query = News.find(filter).populate('author', 'name avatar').sort({ createdAt: -1 });
    if (limit) query = query.limit(Number(limit));
    res.json(await query);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/news/mine  (logged-in user's own news)
router.get('/mine', protect, async (req, res) => {
  try {
    res.json(await News.find({ author: req.user._id }).sort({ createdAt: -1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/news/:id
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true })
      .populate('author', 'name avatar bio');
    if (!news) return res.status(404).json({ message: 'News not found' });
    res.json(news);
  } catch {
    res.status(404).json({ message: 'News not found' });
  }
});

// POST /api/news
router.post('/', protect, async (req, res) => {
  try {
    const { title, content, category, image } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Title and content are required' });
    const news = await News.create({ title, content, category: category || 'General', image, author: req.user._id });
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/news/:id  (only owner)
router.put('/:id', protect, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    if (news.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'You can only edit your own news' });
    const { title, content, category, image } = req.body;
    if (title) news.title = title;
    if (content) news.content = content;
    if (category) news.category = category;
    if (image !== undefined) news.image = image;
    await news.save();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/news/:id  (only owner)
router.delete('/:id', protect, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: 'News not found' });
    if (news.author.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'You can only delete your own news' });
    await news.deleteOne();
    res.json({ message: 'News deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

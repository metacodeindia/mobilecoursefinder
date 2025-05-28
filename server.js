const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mobile-course-finder', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const instituteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fees: { type: Number, required: true },
  duration: { type: String, required: true },
  location: { type: String, required: true },
  courseDetails: { type: String },
  rating: { type: Number, default: 0 }
});

const Institute = mongoose.model('Institute', instituteSchema);

// Get all institutes
app.get('/api/institutes', async (req, res) => {
  try {
    const institutes = await Institute.find();
    res.json(institutes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new institute
app.post('/api/institutes', async (req, res) => {
  const institute = new Institute(req.body);
  try {
    const saved = await institute.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Schema, model } = mongoose; // Import Schema and model from Mongoose

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string with specified database
const uri = 'mongodb+srv://mern-notes-store:42Lgr7mcEJ3QnH5Z@cluster0.4bstz.mongodb.net/notesInventory?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB using Mongoose
mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Define Mongoose Schemas and Models
const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const noteSchema = new Schema({
  notesTitle: { type: String, required: true },
  creator: { type: String, required: true },
  imageURL: { type: String, required: true },
  category: { type: String, required: true },
  notesDescription: { type: String, required: true },
  notesPDFURL: { type: String, required: true },
  price: { type: Number, required: true },
});

const Category = model('Category', categorySchema);
const Note = model('Note', noteSchema);

// Routes

// Home Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Fetch all categories
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send('Error fetching categories');
  }
});

// Add a new category
// Add a new category
app.post('/add-category', async (req, res) => {
  const { newCategory } = req.body; // Make sure this is correctly extracted
  if (!newCategory) {
    return res.status(400).send({ message: 'Category name is required.' });
  }

  try {
    const existingCategory = await Category.findOne({ name: newCategory });
    if (!existingCategory) {
      await Category.create({ name: newCategory });
      res.status(201).send({ message: 'Category added successfully' });
    } else {
      res.status(400).send({ message: 'Category already exists' });
    }
  } catch (error) {
    console.error('Error adding category:', error); // Log the error
    res.status(500).send({ message: 'Error adding category' });
  }
});

// Insert a note
app.post('/upload-notes', async (req, res) => {
  try {
    const { notesTitle, creator, imageURL, category, notesDescription, notesPDFURL, price } = req.body;

    // Ensure the category is not null or undefined
    if (!category) {
      return res.status(400).send({ error: "Category is required." });
    }

    const newNote = new Note({
      notesTitle,
      creator,
      imageURL,
      category, // Ensure this is being stored correctly
      notesDescription,
      notesPDFURL,
      price,
    });

    const savedNote = await newNote.save();
    res.status(201).send(savedNote);
    console.log(req.body);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ error: "An error occurred while uploading the note." });
  }
});

// Get all notes, optionally by category
app.get('/all-notes', async (req, res) => {
  try {
    let query = {};
    if (req.query?.category) {
      query = { category: req.query.category };
    }
    const result = await Note.find(query);
    res.send(result);
  } catch (error) {
    res.status(500).send('Error fetching notes');
  }
});

// Update note
app.patch('/notes/:id', async (req, res) => {
  const id = req.params.id;
  const updateNotesData = req.body;
  try {
    const result = await Note.findByIdAndUpdate(id, updateNotesData, { new: true });
    res.send(result);
  } catch (error) {
    res.status(500).send('Error updating note');
  }
});

// Delete a note
app.delete('/notes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Note.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    res.status(500).send('Error deleting note');
  }
});

// Get a single note by ID
app.get('/notes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Note.findById(id);
    res.send(result);
  } catch (error) {
    res.status(500).send('Error fetching note');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

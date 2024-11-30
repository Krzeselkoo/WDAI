const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

// Create a Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.db'
});

// Define the Book model
const Book = sequelize.define('Book', {
  bookId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Sync the models with the database
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route to get all books
app.get('/books/', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Define a route to get a book by id
app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// Define a route to create a new book
app.post('/books', async (req, res) => {
  try {
    const { name, author, year } = req.body;
    const newBook = await Book.create({ name, author, year });
    res.status(201).json({bookId: newBook.bookId});
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// Define a route to delete a book by bookId
app.delete('/books/:id', async (req, res) => {
  try {
    const deleted = await Book.destroy({ where: { 
      bookId: req.params.id
     } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});



// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.db'
});

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


sequelize.sync()

app.use(express.json());


function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  console.log('Token:', token);
  if (!token) {
    res.status(401).json({ error: 'Unauthorized: Token not found' });
  }
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.PRIVATE_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

app.get('/books/', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});


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

app.get('/bookexists/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (book) {
      res.json({exists: true});
    } else {
      res.json({exists: false});
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});


app.post('/books', verifyToken, async (req, res) => {
  try {
    const { name, author, year } = req.body;
    const newBook = await Book.create({ name, author, year });
    res.status(201).json({bookId: newBook.bookId});
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
});

app.delete('/books/:id', verifyToken, async (req, res) => {
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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
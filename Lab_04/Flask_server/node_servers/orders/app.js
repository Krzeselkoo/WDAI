require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const axios = require('axios');

const app = express();
const bookPort = 3000;
const port = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.db'
});

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
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

app.get('/orders/:id', verifyToken, async (req, res) => {
    try {
      const orders = await Order.findAll({where: {userId: req.params.id}});
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });

app.post('/orders/', verifyToken, async (req, res) => {
    try {
      const response = await axios.get(`http://localhost:${bookPort}/bookexists/${req.body.bookId}`);
      if (response.data.exists) {
        const order = await Order.create(req.body);
        res.json(order);
      }
      else{
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to create an order' });
    }
});

app.delete('/orders/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Order.destroy({ where: { 
      orderId: req.params.id
     } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

app.patch('/orders/:id', verifyToken, async (req, res) => {
  try {
    const updated = await Order.update(req.body, { where: { 
      orderId: req.params.id
     } });
    if (updated) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
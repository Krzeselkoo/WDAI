require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.db'
});

// Define the User model
const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

sequelize.sync()

app.post('/users/register', async (req, res) => {
    try {
      const { email, password } = req.body;
      const newUser = await User.create({ email, password });
      res.status(201).json(newUser.userId);  
    } catch (error) {
      res.status(500).json({ error: 'Failed to create User' });
    }
});

app.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Email:', req.body.email);
        console.log('Password:', password);

        const user = await User.findOne({ where: { email: email, password: password } });

        if (user) {
          const token = jwt.sign({ userId: user.userId }, process.env.PRIVATE_KEY);
          res.status(200).json({token});
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
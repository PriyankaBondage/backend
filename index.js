import express from 'express'
import bodyParser from 'body-parser'
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

// Initialize Express
const app = express();
app.use(bodyParser.json());
app.use(cors());
// In-memory data store
let users = [];

// CREATE a new user
app.post('/users', (req, res) => {
  const newUser = {
    id: uuidv4(), // Generate a unique ID
    name: req.body.name,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).send(newUser);
});

// READ all users
// app.get('/users', (req, res) => {
//   res.status(200).send(users);
// });

app.get('/', (req, res) => {
    res.status(200).send({
        message:"Hello World"
    });
  });

// READ a specific user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  res.status(200).send(user);
});

// UPDATE a user by ID
app.patch('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  user.name = req.body.name || user.name;
  user.address = req.body.address || user.address;
  user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
  user.email = req.body.email || user.email;

  res.status(200).send(user);
});

// DELETE a user by ID
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).send({ message: 'User not found' });
  }

  const deletedUser = users.splice(userIndex, 1);
  res.status(200).send(deletedUser);
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


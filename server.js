const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/bankDB');

const userSchema = new mongoose.Schema({
  name: String,
  balance: Number
});

const User = mongoose.model('User', userSchema);

app.post('/create-users', async (req, res) => {
  const users = await User.insertMany(req.body);
  res.status(201).json({ message: 'Users created', users });
});

app.post('/transfer', async (req, res) => {
  const { fromUserId, toUserId, amount } = req.body;
  const sender = await User.findById(fromUserId);
  const receiver = await User.findById(toUserId);

  if (!sender || !receiver) {
    return res.status(404).json({ message: 'One or both users not found' });
  }

  if (sender.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  sender.balance -= amount;
  receiver.balance += amount;

  await sender.save();
  await receiver.save();

  res.status(200).json({
    message: `Transferred $${amount} from ${sender.name} to ${receiver.name}.`,
    senderBalance: sender.balance,
    receiverBalance: receiver.balance
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

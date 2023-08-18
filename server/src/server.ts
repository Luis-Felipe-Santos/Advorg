import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors'; 
import { sequelize } from '../instances/mysql'; // Adjust path as needed
import { User } from '../models/User'; // Adjust path as needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await User.create({ name, email, password });
    
    res.status(201).json({ message: 'Usuário Registrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
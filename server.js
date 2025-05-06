import express from 'express';
import mongoose from 'mongoose';
import Task from './models/Task.js'; // Importe o modelo Task

const app = express();
const port = 3000;

// Conecte ao MongoDB (substitua pela sua URI)
mongoose.connect('mongodb+srv://raissareuter:<sua_senha>@todoofc.ewynvub.mongodb.net/seu_banco_de_dados?retryWrites=true&w=majority&appName=TodoOfc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Middleware para processar dados JSON no corpo das requisições
app.use(express.json());

// Rota para listar todas as tarefas
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks); // Envia as tarefas como JSON
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

// Rota para adicionar uma nova tarefa
app.post('/tasks', async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'O campo "task" é obrigatório' });
  }
  const newTask = new Task({ task });
  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask); // Envia a nova tarefa criada
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
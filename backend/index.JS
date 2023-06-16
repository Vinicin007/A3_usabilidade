import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Conectar-se ao banco de dados MongoDB
 mongoose.connect('mongodb+srv://vinicius:48JWzfA3W5pAJhGu@cluster0.ub511he.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

 

// Definir um esquema para as avaliações
const reviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  }
});

// Definir um modelo baseado no esquema
const Review = mongoose.model('Review', reviewSchema);

// Criar uma instância do aplicativo Express  
const app = express();
app.use(express.json());
app.use(cors('http://127.0.0.1:5173'));
app.use(express.static('public'));

// Rota para obter todas as avaliações
app.get('/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'error' });
  }
});

// Rota para obter uma avaliação específica pelo ID
app.get('/reviews/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findById(id);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ error: 'Review não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'error' });
  }
});

// Rota para criar uma nova avaliaçãoS
app.post('/reviews', async (req, res) => {
  try {
    const { author, review } = req.body;
    const newReview = await Review.create({ author, review });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Rota para excluir uma avaliação existente
app.delete('/reviews/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedReview = await Review.findByIdAndDelete(id);
    if (deletedReview) {
      res.json(deletedReview);
    } else {
      res.status(404).json({ error: 'Review não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'error' });
  }
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
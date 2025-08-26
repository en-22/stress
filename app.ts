import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

async function fetchWords() {
  const count = await prisma.word.count();

  const offsets = new Set<number>();
  while (offsets.size < 4) {
    offsets.add(Math.floor(Math.random() * count));
  }

  const words = await Promise.all(
    Array.from(offsets).map(offset => prisma.word.findFirst({ skip: offset }))
  );

  return words;
}

async function getRandomQuestion() {
  const count = await prisma.question.count();
  const skip = Math.floor(Math.random() * count);
  return prisma.question.findFirst({ skip });
}

// get 1 random word
app.get('/getRandomWord', async (req: Request, res: Response) => {
  try {
    const word = await  getRandomQuestion();
    res.json(word);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// get 4 random words
app.get('/getRandomWords', async (req: Request, res: Response) => {
  try {
    const list = await fetchWords();
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// get a user answers
app.get('/userQuestions/:id', async (req: Request, res: Response) => {
  try {
    const userQuestions = await prisma.question.findMany({
      where: { user_id: parseInt(req.params.id) },
      include: { word: true }
    });
    
    res.json(userQuestions);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/answer/:id', async (req: Request, res: Response) => {
  try {
    const questions = req.body; //one question
    
    /* const answeredQuestion = await prisma.question.update({
      where: { id: questions.id },
      data: { answer, user_id: userId },
      //get user id and answer
    });*/
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('🚀 Server ready at http://localhost:3000');
});

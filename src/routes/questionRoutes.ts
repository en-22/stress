import express from 'express';
import{
    createQuestion,
    answerQuestion,
    getQuestion,
    getWord,
    checkAnswer,
} from '../controllers/questionController'

const router = express.Router();

router.post('/createQuestion', createQuestion);
router.put('/answerQuestion/:id', answerQuestion);
router.get('/getQuestion', getQuestion);
router.get('/getWord', getWord);
router.get('/checkAnswer', checkAnswer);

export default router;
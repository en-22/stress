import express, { Request, Response } from 'express';
import { answer_type, stress_silable_type } from '@prisma/client';
import prisma from '../services/prismaClient';
import * as yup from 'yup';

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
        const createQuestionSchema = yup
        .object()
        .shape({
            id: yup.number().min(0),
            answer: yup.mixed<answer_type>().oneOf(Object.values(answer_type)),
            user_id: yup.number().min(0).required(),
            word_id: yup.number().min(0).required(),
        })
        .noUnknown();

        const question = await createQuestionSchema.validate(req.body, {stripUnknown: false});

        const createdQuestion = await prisma.$transaction(async(prisma) => {
            const createdQuestion = await prisma.question.create({
                data: {
                    answer: null,
                    user_id: question.user_id,
                    word_id: question.word_id,
                },
            });
            
            return await prisma.question.findUnique({where: {id: createdQuestion.id}});
        });

        const word = await prisma.word.findUnique({where: {id: createdQuestion.word_id}});
        res.locals.message = 'Question created.';
        res.status(201).json({
            message: res.locals.message, 
            data: {
                id: createdQuestion.id,
                wordLetters: word.letters,
                wordAudioNS: '/audio/' + word.audio_no_stress,
                wordAudioWS: '/audio/' + word.audio_with_stress,
            }
        });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const answerQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
        const questionId: number = parseInt(req.params.id);

        const updateQuestionSchema = yup
        .object()
        .shape({
            id: yup.number().min(0),
            answer: yup.mixed<answer_type>().oneOf(Object.values(answer_type)).required(),
            user_id: yup.number().min(0).required(),
            word_id: yup.number().min(0).required(),
        })
        .noUnknown();

        const question = await updateQuestionSchema.validate(req.body, {stripUnknown: false});

        const updatedQuestion = await prisma.$transaction(async(prisma) => {
            const updatedQuestion = await prisma.question.update({
                where: {id: questionId},
                data: {
                    answer: question.answer,
                },
            });
            
            return await prisma.question.findUnique({where: {id: updatedQuestion.id}});
        });

        res.locals.message = 'Question updated.';
        res.status(201).json({message: res.locals.message, data: updatedQuestion});

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const getQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
        const questionId: number = parseInt(req.params.id);
        const question = await prisma.question.findFirst({where: {id: questionId}});

        res.json(question);

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const getWord = async (req: Request, res: Response): Promise<void> => {
    try {
        const wordId: number = parseInt(req.params.id);
        const word = await prisma.word.findFirst({where: {id: wordId}});

        res.json(word);

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export const checkAnswer = async (req: Request, res: Response): Promise<void> => {
    try {
        const questionId: number = parseInt(req.params.id);
        const questionAnswer: stress_silable_type = req.body.stress_silable;

        const question = await prisma.question.findUnique({where: {id: questionId}});
        const word = await prisma.word.findUnique({where: {id: question.word_id}});

        if(word.stress_silable === questionAnswer)
            res.json({
                method: "POST",
                correct: "true",
            })
        else
            res.json({
                method: "POST",
                correct: "false",
            })

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}
import { NextApiRequest, NextApiResponse } from 'next';
import questionsData from '../../data/questions.json';

interface Question {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  inputFormat: string;
  outputFormat: string;
  inputExample: string;
  outputExample: string;
  constraints: string;
  createdAt: string;
  updatedAt: string;
  usedBy: string[];
}
  

export default function handler(_: NextApiRequest, res: NextApiResponse<Question[]>) {
    res.status(200).json(questionsData);
}
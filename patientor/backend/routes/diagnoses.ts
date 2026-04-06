import express from 'express';
import type { Response } from 'express';
import { getAllDiagnoses } from '../services/diagnoses.ts';
import type { Diagnosis } from '../types/diagnoses.ts';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res: Response<Diagnosis[]>) => {
    return res.status(200).json(getAllDiagnoses());
});

export default diagnosesRouter;
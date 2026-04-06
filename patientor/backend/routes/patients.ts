import express from 'express';
import type { Response } from 'express';
import { getAllPatients, addPatient } from '../services/patients.ts';
import type { PublicPatient } from '../types/patients.ts';
import { PatientNewSchema } from '../types/patients.ts';
import z from 'zod';


const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res: Response<PublicPatient[]>) => {
    return res.status(200).json(getAllPatients());
});

patientsRouter.post('/', (req, res) => {
    try {
        const newPatient = PatientNewSchema.parse(req.body);
        const addedPatient = addPatient(newPatient);
        res.status(201).json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof z.ZodError) {  
            errorMessage += 'Error: ' +  error.issues.map(issue => issue.message).join(', ');
        }
        res.status(400).send(errorMessage);   
    }
});



export default patientsRouter;
import express from 'express';
import type { Response } from 'express';
import { getAllPatients, addPatient, getPatientById } from '../services/patients.ts';
import type { Patient, NonSensitivePatient } from '../types/patients.ts';
import { updatePatientEntry } from '../services/patients.ts';
import { PatientNewSchema } from '../models/patients.ts';
import { EntrySchemaNoId } from '../models/entries.ts';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    return res.status(200).json(getAllPatients());
});

patientsRouter.post('/', (req, res: Response<Patient>) => {
    const newPatient = PatientNewSchema.parse(req.body);
    const addedPatient = addPatient(newPatient);
    res.status(200).json(addedPatient);
});

patientsRouter.post('/:id/entries', (req, res: Response<Patient>) => {
    const patientId = req.params.id;
    const newEntry = EntrySchemaNoId.parse(req.body);
    const updatedPatient = updatePatientEntry(newEntry, patientId);
    res.status(200).json(updatedPatient);
});

patientsRouter.get('/:id', (req, res: Response<Patient>) => {
    const patientId = req.params.id;
    return res.status(200).json(getPatientById(patientId));
});



export default patientsRouter;
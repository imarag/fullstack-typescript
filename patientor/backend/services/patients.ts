import data from "../data/patients.ts";
import type { Patient, PublicPatient } from "../types/patients.ts";
import type { NewPatient } from "../types/patients.ts";
import { v1 as uuid } from 'uuid';

const patients = data;

const getAllPatients = (): PublicPatient[] => {
    return patients.map(p => (
        {id: p.id, name: p.name, dateOfBirth: p.dateOfBirth, gender: p.gender, occupation: p.occupation})
    );
};

const addPatient = (patient: NewPatient): Patient => {
    const id = String((uuid as () => string)());
    const newPatient = {...patient, id};
    patients.push(newPatient);
    return newPatient;
};

export { getAllPatients, addPatient };
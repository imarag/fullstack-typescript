import data from "../data/patients.ts";
import type { Patient, NonSensitivePatient } from "../types/patients.ts";
import type { NewPatient } from "../types/patients.ts";
import { v1 as uuid } from 'uuid';
import type { Entry, EntryWithoutId } from "../types/entries.ts";

let patients = data;

const getAllPatients = (): NonSensitivePatient[] => {
    return patients.map(p => (
        {id: p.id, name: p.name, dateOfBirth: p.dateOfBirth, gender: p.gender, occupation: p.occupation})
    );
};

const getPatientById = (id: string): Patient => {
    const existingPatient = patients.find(p => p.id === id);
    if (!existingPatient) {
        throw new Error(`Patient with id ${id} does not exist.`);
    }
    return existingPatient;
};

const addPatient = (patient: NewPatient): Patient => {
    const id = String(uuid());
    const newPatient: Patient = {...patient, id, entries: []};
    patients.push(newPatient);
    return newPatient;
};

const updatePatientEntry = (entry: EntryWithoutId, id: string): Patient => {
    const existingPatient = patients.find(p => p.id === id);
    if (!existingPatient) {
        throw new Error(`Patient with id ${id} does not exist.`);
    }
    const newEntry: Entry = {...entry, id: String(uuid())};
    const newPatient = {...existingPatient, entries: [...existingPatient.entries, newEntry]};
    patients = patients.map(p => p.id === id ? newPatient : p);
    return newPatient;
};



export { getAllPatients, addPatient, getPatientById, updatePatientEntry };
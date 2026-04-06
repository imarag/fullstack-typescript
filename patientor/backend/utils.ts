import type { NewPatient } from "./types/patients.ts";
import { Gender } from "./types/patients.ts";

// used ZOD, this file is not needed, left it for consistency

const isString = (text: unknown): text is string => {
    return typeof text === 'string';
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (text: string): text is Gender => {
    return (Object.values(Gender) as string[]).includes(text);
};

const isSSN = (text: string): boolean => {
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    return ssnRegex.test(text);
};

const parseName = (name: unknown) => {
    if (!isString(name)) {
        throw new Error('Invalid parameter "name"');
    }
    return name;
};

const parseBirth = (birth: unknown): string => {
    if (!isString(birth) || !isDate(birth)) {
        throw new Error('Invalid parameter "birth"');
    }
    return birth;
};

const parseSSN = (ssn: unknown) => {
    if (!isString(ssn) || !isSSN(ssn)) {
        throw new Error('Invalid parameter "ssn"');
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Invalid parameter "gender"');
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('Invalid parameter "occupation"');
    }
    return occupation;
};

const parseNewEntry = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Invalid object.');
    }

    if (!('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)) {
        throw new Error('Invalid params passed.');
    }

    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseBirth(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };

    return newPatient;
};



export default parseNewEntry;


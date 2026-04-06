import data from "../data/diagnoses.ts";
import type { Diagnosis } from "../types/diagnoses.ts";



const getAllDiagnoses = (): Diagnosis[] => {
    return data;
};

export { getAllDiagnoses };
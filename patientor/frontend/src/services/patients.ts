import axios from 'axios';
import type { Patient, PatientFormValues, NonSensitivePatient } from '../types/patients';
import type { EntryWithoutId } from '../types/entries';
import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<NonSensitivePatient[]>(
    `${apiBaseUrl}/patients`
  );
  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );
  return data;
};

const addEntry = async (entry: EntryWithoutId, id: string) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
  );

  return data;
};

export default {
  getAll, create, getOne, addEntry
};


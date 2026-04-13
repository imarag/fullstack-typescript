import { z } from 'zod';
import { Gender } from '../types/patients.ts';

export const PatientNewSchema = z.object({
  name: z.string(),
  ssn: z.string().regex(/^\d{6}-\d{4}$/),
  occupation: z.string(),
  gender: z.enum(Gender),
  dateOfBirth: z.iso.date(),
});
import { z } from "zod";

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other"
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

const PatientBaseSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  gender: z.enum(Gender),
  occupation: z.string()
});

export const PatientNewSchema = PatientBaseSchema.extend({
  ssn: z.string().regex(/^\d{6}-\d{4}$/)
});

type BasePatient = z.infer<typeof PatientBaseSchema>;
export type Patient = BasePatient & {
    id: string,
    ssn: string
};
export type PublicPatient = Omit<Patient, 'ssn'>;
export type NewPatient = z.infer<typeof PatientNewSchema>;
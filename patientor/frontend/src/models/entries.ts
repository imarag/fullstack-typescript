import { z } from 'zod';

const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HospitalEntryNoIdSchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

export const HospitalEntrySchema = HospitalEntryNoIdSchema.extend({
  id: z.string(),
});

const OccupationalEntryNoIdSchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

export const OccupationalEntrySchema = OccupationalEntryNoIdSchema.extend({
  id: z.string(),
});

const HealthCheckEntryNoIdSchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
  ]),
});

export const HealthCheckEntrySchema = HealthCheckEntryNoIdSchema.extend({
  id: z.string(),
});

export const EntrySchema = z.discriminatedUnion('type', [
  HospitalEntrySchema,
  OccupationalEntrySchema,
  HealthCheckEntrySchema,
]);

export const EntrySchemaNoId = z.discriminatedUnion('type', [
  HospitalEntryNoIdSchema,
  OccupationalEntryNoIdSchema,
  HealthCheckEntryNoIdSchema,
]);
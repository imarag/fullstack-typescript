import { z } from "zod";

const BaseEntrySchema = z.object({
  description: z
    .string()
    .min(1, { message: "Description is required" }),

  date: z
    .string()
    .min(1, { message: "Date is required" }),

  specialist: z
    .string()
    .min(1, { message: "Specialist is required" }),

  diagnosisCodes: z
    .array(
      z.string().min(1, { message: "Diagnosis code cannot be empty" })
    )
    .optional(),
});

const HospitalEntryNoIdSchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z
      .string()
      .min(1, { message: "Discharge date is required" }),

    criteria: z
      .string()
      .min(1, { message: "Discharge criteria is required" }),
  }),
});

export const HospitalEntrySchema = HospitalEntryNoIdSchema.extend({
  id: z.string(),
});

const OccupationalEntryNoIdSchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),

  employerName: z
    .string()
    .min(1, { message: "Employer name is required" }),

  sickLeave: z
    .object({
      startDate: z
        .string()
        .min(1, { message: "Sick leave start date is required" }),

      endDate: z
        .string()
        .min(1, { message: "Sick leave end date is required" }),
    })
    .optional(),
});

export const OccupationalEntrySchema = OccupationalEntryNoIdSchema.extend({
  id: z.string(),
});

const HealthCheckEntryNoIdSchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),

  healthCheckRating: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
  ], {
    errorMap: () => ({
      message: "Health check rating must be between 0 and 3",
    }),
  }),
});

export const HealthCheckEntrySchema = HealthCheckEntryNoIdSchema.extend({
  id: z.string(),
});

export const EntrySchema = z.discriminatedUnion("type", [
  HospitalEntrySchema,
  OccupationalEntrySchema,
  HealthCheckEntrySchema,
]);

export const EntrySchemaNoId = z.discriminatedUnion("type", [
  HospitalEntryNoIdSchema,
  OccupationalEntryNoIdSchema,
  HealthCheckEntryNoIdSchema,
]);
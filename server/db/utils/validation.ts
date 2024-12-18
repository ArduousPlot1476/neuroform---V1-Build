import { z } from 'zod';

export const databaseSchemas = {
  focus: {
    create: z.object({
      userId: z.string().uuid(),
      startTime: z.date(),
      duration: z.number().min(1).max(240),
    }),
    complete: z.object({
      id: z.string().uuid(),
      userId: z.string().uuid(),
    }),
  },
  journal: {
    create: z.object({
      userId: z.string().uuid(),
      type: z.enum(['morning', 'evening', 'ftd']),
      content: z.string().min(1),
    }),
    update: z.object({
      id: z.string().uuid(),
      userId: z.string().uuid(),
      content: z.string().min(1),
    }),
  },
  mentor: {
    schedule: z.object({
      userId: z.string().uuid(),
      mentorId: z.string().uuid(),
      startTime: z.date(),
      duration: z.number().min(15).max(120),
      notes: z.string().optional(),
    }),
    update: z.object({
      id: z.string().uuid(),
      userId: z.string().uuid(),
      startTime: z.date().optional(),
      duration: z.number().min(15).max(120).optional(),
      notes: z.string().optional(),
      completed: z.boolean().optional(),
    }),
  },
};

export const validateDatabaseInput = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T => {
  return schema.parse(data);
};
import { z } from 'zod';

export const schemas = {
  journal: {
    create: z.object({
      body: z.object({
        type: z.enum(['morning', 'evening', 'ftd']),
        content: z.string().min(1).max(10000),
      }),
    }),
    update: z.object({
      params: z.object({
        id: z.string().uuid(),
      }),
      body: z.object({
        content: z.string().min(1).max(10000),
      }),
    }),
  },

  focus: {
    create: z.object({
      body: z.object({
        duration: z.number().int().min(1).max(240),
      }),
    }),
    complete: z.object({
      params: z.object({
        id: z.string().uuid(),
      }),
    }),
  },

  mentor: {
    schedule: z.object({
      body: z.object({
        mentorId: z.string().uuid(),
        startTime: z.string().datetime(),
        duration: z.number().int().min(15).max(120),
        notes: z.string().max(500).optional(),
      }),
    }),
    update: z.object({
      params: z.object({
        id: z.string().uuid(),
      }),
      body: z.object({
        startTime: z.string().datetime().optional(),
        duration: z.number().int().min(15).max(120).optional(),
        notes: z.string().max(500).optional(),
      }),
    }),
    cancel: z.object({
      params: z.object({
        id: z.string().uuid(),
      }),
    }),
    checkAvailability: z.object({
      query: z.object({
        mentorId: z.string().uuid(),
        startTime: z.string().datetime(),
        duration: z.number().int().min(15).max(120),
      }),
    }),
  },
};
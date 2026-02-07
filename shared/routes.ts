import { z } from 'zod';
import { insertMachineSchema, insertBookingSchema, insertUserProfileSchema, machines, bookings, leaderboard, userProfiles } from './schema';

// Shared Error Schemas
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  machines: {
    list: {
      method: 'GET' as const,
      path: '/api/machines' as const,
      responses: {
        200: z.array(z.custom<typeof machines.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/machines/:id' as const,
      responses: {
        200: z.custom<typeof machines.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  bookings: {
    list: {
      method: 'GET' as const,
      path: '/api/bookings' as const,
      responses: {
        200: z.array(z.custom<typeof bookings.$inferSelect & { machine: typeof machines.$inferSelect }>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/bookings' as const,
      input: insertBookingSchema,
      responses: {
        201: z.custom<typeof bookings.$inferSelect>(),
        400: errorSchemas.validation,
        401: errorSchemas.internal, // Unauthorized
      },
    },
    complete: {
      method: 'POST' as const,
      path: '/api/bookings/:id/complete' as const,
      responses: {
        200: z.custom<typeof bookings.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  leaderboard: {
    list: {
      method: 'GET' as const,
      path: '/api/leaderboard' as const,
      responses: {
        200: z.array(z.object({
          userId: z.string(),
          username: z.string().nullable(),
          points: z.number(),
          rank: z.number()
        })),
      },
    },
  },
  profile: {
    get: {
      method: 'GET' as const,
      path: '/api/profile' as const,
      responses: {
        200: z.custom<typeof userProfiles.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/profile' as const,
      input: insertUserProfileSchema,
      responses: {
        200: z.custom<typeof userProfiles.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

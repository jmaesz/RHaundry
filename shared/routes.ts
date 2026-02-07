import { z } from "zod";
import {
  selectMachineSchema,
  selectBookingSchema,
  insertBookingSchema,
  selectUserProfileSchema,
  insertUserProfileSchema,
  selectMessageSchema,
  insertMessageSchema,
} from "./schema";

// Helper function to build URLs with parameters
export function buildUrl(path: string, params: Record<string, string | number>): string {
  let url = path;
  for (const [key, value] of Object.entries(params)) {
    url = url.replace(`:${key}`, String(value));
  }
  return url;
}

// API routes definition with type-safe responses
export const api = {
  machines: {
    list: {
      path: "/api/machines",
      responses: {
        200: z.array(selectMachineSchema),
      },
    },
    get: {
      path: "/api/machines/:id",
      responses: {
        200: selectMachineSchema,
      },
    },
  },
  bookings: {
    list: {
      path: "/api/bookings",
      responses: {
        200: z.array(selectBookingSchema),
      },
    },
    create: {
      path: "/api/bookings",
      responses: {
        201: selectBookingSchema,
        400: z.object({ message: z.string() }),
      },
    },
    complete: {
      path: "/api/bookings/:id/complete",
      responses: {
        200: selectBookingSchema,
      },
    },
  },
  profile: {
    get: {
      path: "/api/profile",
      responses: {
        200: selectUserProfileSchema,
      },
    },
    update: {
      path: "/api/profile",
      responses: {
        200: selectUserProfileSchema,
      },
    },
  },
  leaderboard: {
    get: {
      path: "/api/leaderboard",
      responses: {
        200: z.array(
          z.object({
            userId: z.number(),
            displayName: z.string().nullable(),
            username: z.string(),
            email: z.string().nullable(),
            telegramHandle: z.string().nullable(),
            points: z.number(),
            rank: z.number(),
            isCurrentUser: z.boolean().optional(),
          })
        ),
      },
    },
  },
  messages: {
    list: {
      path: "/api/messages",
      responses: {
        200: z.array(selectMessageSchema),
      },
    },
    send: {
      path: "/api/messages",
      responses: {
        201: selectMessageSchema,
      },
    },
    conversation: {
      path: "/api/messages/conversation/:userId",
      responses: {
        200: z.array(selectMessageSchema),
      },
    },
  },
};

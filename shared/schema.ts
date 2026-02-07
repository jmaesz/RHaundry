import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./models/auth"; // Import auth users

// Re-export auth models so they are available
export * from "./models/auth";
export * from "./models/chat";

// === MACHINE SCHEMA ===
export const machines = pgTable("machines", {
  id: serial("id").primaryKey(),
  block: text("block").notNull(), // e.g., "Block 4"
  type: text("type").notNull(), // "washer" or "dryer"
  machineNumber: integer("machine_number").notNull(),
  status: text("status").default("available").notNull(), // "available", "in_use"
});

export const insertMachineSchema = createInsertSchema(machines).omit({ id: true });
export type Machine = typeof machines.$inferSelect;
export type InsertMachine = z.infer<typeof insertMachineSchema>;

// === BOOKING SCHEMA ===
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  machineId: integer("machine_id").notNull().references(() => machines.id),
  userId: text("user_id").notNull().references(() => users.id), // Link to auth users
  startTime: timestamp("start_time").defaultNow().notNull(),
  durationMinutes: integer("duration_minutes").notNull(), // 30 or 60
  notes: text("notes"),
  completed: boolean("completed").default(false).notNull(),
  telegramHandle: text("telegram_handle"), // Optional contact info for this booking
});

export const insertBookingSchema = createInsertSchema(bookings).omit({ 
  id: true, 
  userId: true, 
  startTime: true, 
  completed: true 
}).extend({
  durationMinutes: z.number().min(30).max(120),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

// === LEADERBOARD SCHEMA ===
// We can just query bookings to calculate points dynamically, or keep a running tally.
// For simplicity and speed, let's keep a running tally table.
export const leaderboard = pgTable("leaderboard", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique().references(() => users.id),
  points: integer("points").default(0).notNull(),
});

export const insertLeaderboardSchema = createInsertSchema(leaderboard).omit({ id: true });
export type LeaderboardEntry = typeof leaderboard.$inferSelect;

// === USER PROFILE EXTRAS ===
// Stores additional user info not in the main auth table
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique().references(() => users.id),
  telegramHandle: text("telegram_handle"),
  phoneNumber: text("phone_number"),
  block: text("block"), // Resident's block
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({ id: true, userId: true });
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;

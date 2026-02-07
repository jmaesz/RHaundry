import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User profiles table
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  displayName: text("display_name"),
  email: text("email"),
  phoneNumber: text("phone_number"),
  telegramHandle: text("telegram_handle"),
  punctualityPoints: integer("punctuality_points").default(0),
  block: text("block"), // User's residential block
  preferences: text("preferences"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Machines table
export const machines = pgTable("machines", {
  id: serial("id").primaryKey(),
  machineNumber: text("machine_number").unique().notNull(),
  type: text("type").notNull(), // "washer" or "dryer"
  status: text("status").notNull(), // "available", "in_use", "maintenance"
  block: text("block").notNull(), // "Block 1", "Block 2", etc.
  location: text("location"), // Specific location within block (e.g., "Level 2")
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  machineId: integer("machine_id").references(() => machines.id).notNull(),
  startTime: timestamp("start_time").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  status: text("status").notNull(), // "active", "completed", "cancelled"
  notes: text("notes"), // User's optional note about booking
  telegramHandle: text("telegram_handle"), // Denormalized for quick access
  notificationSent: boolean("notification_sent").default(false),
  pickupTime: timestamp("pickup_time"), // When user actually picked up laundry
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Messages table for user-to-user chat
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  fromUserId: integer("from_user_id").references(() => users.id).notNull(),
  toUserId: integer("to_user_id").references(() => users.id).notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Create Zod schemas
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertUserProfileSchema = createInsertSchema(userProfiles);
export const selectUserProfileSchema = createSelectSchema(userProfiles);

export const insertMachineSchema = createInsertSchema(machines);
export const selectMachineSchema = createSelectSchema(machines);

export const insertBookingSchema = createInsertSchema(bookings);
export const selectBookingSchema = createSelectSchema(bookings);

export const insertMessageSchema = createInsertSchema(messages);
export const selectMessageSchema = createSelectSchema(messages);

// Type exports
export type User = z.infer<typeof selectUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type UserProfile = z.infer<typeof selectUserProfileSchema>;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;

export type Machine = z.infer<typeof selectMachineSchema>;
export type InsertMachine = z.infer<typeof insertMachineSchema>;

export type Booking = z.infer<typeof selectBookingSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Message = z.infer<typeof selectMessageSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

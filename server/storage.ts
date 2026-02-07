import { db } from "./db";
import { 
  machines, bookings, leaderboard, userProfiles, users,
  type Machine, type InsertMachine, 
  type Booking, type InsertBooking,
  type LeaderboardEntry,
  type UserProfile, type InsertUserProfile,
  type User
} from "@shared/schema";
import { eq, and, desc, sql } from "drizzle-orm";

export interface IStorage {
  // Machines
  getMachines(): Promise<Machine[]>;
  getMachine(id: number): Promise<Machine | undefined>;
  createMachine(machine: InsertMachine): Promise<Machine>;
  updateMachineStatus(id: number, status: string): Promise<Machine>;

  // Bookings
  getBookings(): Promise<(Booking & { machine: Machine })[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  completeBooking(id: number): Promise<Booking>;
  getActiveBookingForMachine(machineId: number): Promise<Booking | undefined>;

  // Leaderboard
  getLeaderboard(): Promise<(LeaderboardEntry & { username: string | null })[]>;
  updatePoints(userId: string, pointsDelta: number): Promise<LeaderboardEntry>;

  // User Profiles
  getUserProfile(userId: string): Promise<UserProfile | undefined>;
  upsertUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  
  // Auth Users (helper)
  getUser(id: string): Promise<User | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getMachines(): Promise<Machine[]> {
    return await db.select().from(machines).orderBy(machines.block, machines.machineNumber);
  }

  async getMachine(id: number): Promise<Machine | undefined> {
    const [machine] = await db.select().from(machines).where(eq(machines.id, id));
    return machine;
  }

  async createMachine(machine: InsertMachine): Promise<Machine> {
    const [newMachine] = await db.insert(machines).values(machine).returning();
    return newMachine;
  }

  async updateMachineStatus(id: number, status: string): Promise<Machine> {
    const [updated] = await db.update(machines)
      .set({ status })
      .where(eq(machines.id, id))
      .returning();
    return updated;
  }

  async getBookings(): Promise<(Booking & { machine: Machine })[]> {
    const rows = await db.select()
      .from(bookings)
      .innerJoin(machines, eq(bookings.machineId, machines.id))
      .where(eq(bookings.completed, false));
    
    return rows.map(r => ({ ...r.bookings, machine: r.machines }));
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    
    // Update machine status
    await this.updateMachineStatus(booking.machineId, "in_use");
    
    return newBooking;
  }

  async getActiveBookingForMachine(machineId: number): Promise<Booking | undefined> {
    const [booking] = await db.select()
      .from(bookings)
      .where(and(
        eq(bookings.machineId, machineId),
        eq(bookings.completed, false)
      ));
    return booking;
  }

  async completeBooking(id: number): Promise<Booking> {
    const [completedBooking] = await db.update(bookings)
      .set({ completed: true })
      .where(eq(bookings.id, id))
      .returning();

    if (completedBooking) {
      await this.updateMachineStatus(completedBooking.machineId, "available");
    }

    return completedBooking;
  }

  async getLeaderboard(): Promise<(LeaderboardEntry & { username: string | null })[]> {
    const results = await db.select({
      id: leaderboard.id,
      userId: leaderboard.userId,
      points: leaderboard.points,
      username: users.firstName // or some display name from users
    })
    .from(leaderboard)
    .leftJoin(users, eq(leaderboard.userId, users.id))
    .orderBy(desc(leaderboard.points));
    
    return results;
  }

  async updatePoints(userId: string, pointsDelta: number): Promise<LeaderboardEntry> {
    // Upsert leaderboard entry
    const [entry] = await db.insert(leaderboard)
      .values({ userId, points: pointsDelta })
      .onConflictDoUpdate({
        target: leaderboard.userId,
        set: { points: sql`${leaderboard.points} + ${pointsDelta}` }
      })
      .returning();
    return entry;
  }

  async getUserProfile(userId: string): Promise<UserProfile | undefined> {
    const [profile] = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId));
    return profile;
  }

  async upsertUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const [updated] = await db.insert(userProfiles)
      .values(profile)
      .onConflictDoUpdate({
        target: userProfiles.userId,
        set: profile
      })
      .returning();
    return updated;
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
}

export const storage = new DatabaseStorage();
